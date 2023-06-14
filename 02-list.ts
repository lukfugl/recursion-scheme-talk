export enum ListTag { CONS, EMPTY };

export type List<T> = Empty | Cons<T>;
export type Empty = { tag: ListTag.EMPTY };
export type Cons<T> = { tag: ListTag.CONS, head: T, tail: List<T> };
