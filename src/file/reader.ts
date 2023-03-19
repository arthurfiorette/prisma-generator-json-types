import fs from 'fs/promises';
import { createNamespace } from '../helpers/namespace';
import { getSourcePath } from './source-path';

export type Declaration = {
  /** Path to the original file */
  sourcePath: string;
  /** The modified or not content of the file */
  content: string;
  /**
   * Replaces the coordinates with the provided text, adjusting the coords to previous
   * changes.
   */
  replacer: (start: number, end: number, text: string) => void;
  /** A list of changes made in the original file to adjust any future coordinates of texts */
  changeset: Array<{ start: number; diff: number }>;
  /** Updates the original file of sourcePath with the content's contents */
  update: () => Promise<void>;
};

export async function readPrismaDeclarations(
  nsName: string,
  clientOutput: string,
  overrideTarget?: string,
  schemaTarget?: string
): Promise<Declaration> {
  const declaration = {} as Declaration;

  declaration.sourcePath = getSourcePath(clientOutput, overrideTarget, schemaTarget);

  // reads the file content
  declaration.content = await fs.readFile(declaration.sourcePath, 'utf-8');

  // creates a empty list of changes
  declaration.changeset = [];

  //  a 1   1 a
  //  s 2   2 s
  //  d 3   3 s <- (start: 1, end: 3, text: `s`) changed `s` to `ss` (start: 1, wide: 2)
  //    4   4 d
  //    5   5
  //  a 6   6
  //  s 7   7 a
  //  d 8   8 s
  //    9   9 d
  declaration.replacer = (start, end, text) => {
    // Adds a trailing space
    if (text[0] !== ' ') {
      text = ' ' + text;
    }

    for (const change of declaration.changeset) {
      if (start > change.start) {
        start += change.diff;
        end += change.diff;
      }
    }

    // replaces the file content at the correct position
    declaration.content =
      declaration.content.slice(0, start) + text + declaration.content.slice(end);

    // adds the change to the list
    declaration.changeset.push({
      start,
      diff: start - end + text.length
    });
  };

  declaration.update = async () => {
    await fs.writeFile(
      declaration.sourcePath,
      createNamespace(nsName) + declaration.content
    );
  };

  return declaration;
}
