import { AstNode, Binop, Call, NodeTag, Num, Var } from "./00-ast";

function reduce<A>(
  node: AstNode,
  fns: {
    num: (n: Num) => A,
    var: (n: Var) => A,
    binop: (n: Binop) => A,
    call: (n: Call) => A,
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
