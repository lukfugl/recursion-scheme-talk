import { List, ListTag } from "./02-list";

function reduce<T, V>(
  list: List<T>,
  fn: (acc: V, el: T) => V,
  init: V,
): V {
  switch (list.tag) {
    case ListTag.EMPTY: return init;
    case ListTag.CONS: return fn(reduce(list.tail, fn, init), list.head);
  }
}
