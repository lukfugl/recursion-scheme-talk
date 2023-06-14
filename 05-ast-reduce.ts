import { AstNode, NodeTag } from "./00-ast";

function reduce<A>(
  node: AstNode,
  fns: {
    num: (value: number) => A,
    var: (name: string) => A,
    binop: (op: string, leftAcc: A, rightAcc: A) => A,
    call: (name: string, argAccs: A[]) => A,
  },
): A {
  switch (node.tag) {
    case NodeTag.NUM: return fns.num(node.value);
    case NodeTag.VAR: return fns.var(node.name);
    case NodeTag.BINOP: return fns.binop(
      node.op,
      reduce(node.left, fns),
      reduce(node.right, fns),
    );
    case NodeTag.CALL: return fns.call(
      node.name,
      node.args.map(arg => reduce(arg, fns)),
    );
  }
}
