import { Empty, List, ListTag } from "./02-list";

export type ListF<T, V> = Empty | ConsF<T, V>;
export type ConsF<T, V> = { tag: ListTag.CONS, head: T, tail: V };

export type Algebra<T, V> = (l: ListF<T, V>) => V;

export function fmap<T, A, B>(list: ListF<T, A>, fn: (a: A) => B): ListF<T, B> {
  switch (list.tag) {
    case ListTag.EMPTY: return list;
    case ListTag.CONS: return {
      tag: ListTag.CONS,
      head: list.head,
      tail: fn(list.tail),
    };
  }
}

export function reduce<T, V>(
  list: List<T>,
  alg: Algebra<T, V>,
): V {
  const mapped = fmap(list, (l) => reduce(l, alg));
  return alg(mapped);
}
