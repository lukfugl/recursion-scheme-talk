import { AstNode, NodeTag, Num, Var } from "./00-ast";

export type AstNodeF<T> = Num | Var | BinopF<T> | CallF<T>;
export type BinopF<T> = { tag: NodeTag.BINOP, op: string, left: T, right: T };
export type CallF<T> = { tag: NodeTag.CALL, name: string, args: T[] };

// AstNode = AstNodeF<AstNode>

function reduce<A>(
  node: AstNode,
  fns: {
    num: (n: Num) => A,
    var: (n: Var) => A,
    binop: (n: BinopF<A>) => A,
    call: (n: CallF<A>) => A,
  },
): A {
  switch (node.tag) {
    case NodeTag.NUM: return fns.num(node);
    case NodeTag.VAR: return fns.var(node);
    case NodeTag.BINOP: return fns.binop({
      tag: NodeTag.BINOP,
      op: node.op,
      left: reduce(node.left, fns),
      right: reduce(node.right, fns),
    });
    case NodeTag.CALL: return fns.call({
      tag: NodeTag.CALL,
      name: node.name,
      args: node.args.map(arg => reduce(arg, fns)),
    });
  }
}
