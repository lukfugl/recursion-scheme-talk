import { AstNode, NodeTag } from "./00-ast";
import { AstNodeF, fmap, reduce } from "./10-generalizing-ast";
import { evaluator, prettyPrinter } from "./11-example";

type Coalgebra<A> = (seed: A) => AstNodeF<A>;

function ana<A>(seed: A, gen: Coalgebra<A>): AstNode {
  const step = gen(seed);
  return fmap(step, (subseed) => ana(subseed, gen));
}

function makeExpr(target: number): AstNodeF<number> {
  if (target == 12) {
    return { tag: NodeTag.VAR, name: "x" };
  }
  const rng = Math.random();
  if (rng < 0.1) { // 10% chance
    return { tag: NodeTag.CALL, name: "sqrt", args: [target * target] };
  } else if (rng < 0.50) { // 40% chance
    if (target % 2 == 0 && target > 2) {
      return { tag: NodeTag.BINOP, op: "*", left: 2, right: target / 2 };
    } else if (target % 3 == 0 && target > 3) {
      return { tag: NodeTag.BINOP, op: "*", left: 3, right: target / 3 };
    } else if (target % 6 == 0 && target > 6) {
      return { tag: NodeTag.BINOP, op: "*", left: 6, right: target / 6 };
    } else {
      return { tag: NodeTag.NUM, value: target };
    }
  } else { // 50% chance
    return { tag: NodeTag.NUM, value: target };
  }
}

for (let i = 0; i < 10; i++) {
  const expr = ana(18, makeExpr);
  console.log(`${reduce(expr, prettyPrinter)} = ${reduce(expr, evaluator)}`);
}
