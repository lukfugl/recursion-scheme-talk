import { AstNode, NodeTag, Num, Var } from "./00-ast";

export type AstNodeF<T> = Num | Var | BinopF<T> | CallF<T>;
export type BinopF<T> = { tag: NodeTag.BINOP, op: string, left: T, right: T };
export type CallF<T> = { tag: NodeTag.CALL, name: string, args: T[] };

export type Algebra<T> = (n: AstNodeF<T>) => T;

export function fmap<A, B>(node: AstNodeF<A>, fn: (a: A) => B): AstNodeF<B> {
  switch (node.tag) {
    case NodeTag.NUM: return node;
    case NodeTag.VAR: return node;
    case NodeTag.BINOP: return {
      tag: NodeTag.BINOP,
      op: node.op,
      left: fn(node.left),
      right: fn(node.right),
    };
    case NodeTag.CALL: return {
      tag: NodeTag.CALL,
      name: node.name,
      args: node.args.map(arg => fn(arg)),
    };
  }
}

export function reduce<A>(
  node: AstNode,
  alg: Algebra<A>,
): A {
  const mapped = fmap(node, (n) => reduce(n, alg));
  return alg(mapped);
}
