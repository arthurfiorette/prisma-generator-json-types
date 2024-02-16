import { expectNotType, expectType } from 'tsd';
import { Text } from '../target/sqlite/index';

declare global {
  export namespace PSqliteJson {
    type WithType = 'C' | 'D';
  }
}

expectType<Text>({
  id: 0,
  untyped: '' as string,
  typed: 'C' as PSqliteJson.WithType,
  literal: 'A' as 'A' | 'B'
});

expectNotType<Text>({
  id: 0,
  untyped: 'Arthur' as string,
  typed: 'D' as string,
  literal: 'D' as string
});

expectType<Text>({
  id: 0,
  untyped: '' as string,
  typed: {
    in: ['C'] as PSqliteJson.WithType[]
  },
  literal: 'A' as 'A' | 'B'
});
