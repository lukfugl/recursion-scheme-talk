import { List, ListTag } from "./02-list";

function reduce<T, V>(
  list: List<T>,
  fns: {
    cons: (head: T, tailAcc: V) => V,
    empty: () => V,
  },
): V {
  switch (list.tag) {
    case ListTag.EMPTY: return fns.empty();
    case ListTag.CONS: return fns.cons(list.head, reduce(list.tail, fns));
  }
}
