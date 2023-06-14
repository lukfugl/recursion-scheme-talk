import { AstNode, NodeTag } from "./00-ast";

function reduce<A>(
  node: AstNode,
  fn: (acc: A, el: ???) => A,
  init: A,
): A {
  switch (node.tag) {
    // base cases; but should node properties actually be ignored?
    case NodeTag.NUM: return init;
    case NodeTag.VAR: return init;
    // recursive case; but how do the node properties and the init
    // combine into the arguments to fn?
    case NodeTag.BINOP: return fn(/*???, ???*/);
    case NodeTag.CALL: return fn(/*???, ???*/);
  }
}
