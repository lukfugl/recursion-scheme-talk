import { Empty, List, ListTag } from "./02-list";

export type ListF<A, B> = Empty | ConsF<A, B>;
export type ConsF<A, B> = { tag: ListTag.CONS, head: A, tail: B };

function reduce<T, V>(
  list: List<T>,
  fns: {
    empty: (l: Empty) => V,
    cons: (l: ConsF<T, V>) => V,
  },
): V {
  switch (list.tag) {
    case ListTag.EMPTY: return fns.empty(list);
    case ListTag.CONS: return fns.cons({
      tag: ListTag.CONS,
      head: list.head,
      tail: reduce(list.tail, fns),
    });
  }
}
