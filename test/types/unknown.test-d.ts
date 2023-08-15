import { expectNotType, expectType } from 'tsd';
import { Model } from '../target/unknown/index';

expectType<Model>({
  id: 0,
  field: {} as unknown,
  str: '' as string,
  int: 0 as number
});

expectNotType<Model>({
  id: 0,
  field: {} as any,
  str: {} as unknown,
  int: 0 as unknown
});

expectNotType<Model>({
  id: 0,
  field: {} as any,
  str: {} as any,
  int: 0 as any
});
