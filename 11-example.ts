import { AstNode, Binop, Call, NodeTag, Num, Var } from "./00-ast";
import { AstNodeF } from "./07-indirection";
import { Algebra, reduce } from "./10-generalizing-ast";

function num(value: number): Num {
  return { tag: NodeTag.NUM, value };
}

function variable(name: string): Var {
  return { tag: NodeTag.VAR, name };
}

function binop(op: string, left: AstNode, right: AstNode): Binop {
  return { tag: NodeTag.BINOP, op, left, right };
}

function call(name: string, args: AstNode[]): Call {
  return { tag: NodeTag.CALL, name, args };
}

// Algebra<string>
export function prettyPrinter(step: AstNodeF<string>): string {
  switch (step.tag) {
    case NodeTag.NUM: return `${step.value}`;
    case NodeTag.VAR: return `${step.name}`;
    case NodeTag.BINOP: return `${step.left} ${step.op} ${step.right}`;
    case NodeTag.CALL: return `${step.name}(${step.args.join(", ")})`;
  }
}

type Scope = { [name: string]: number };

function scopedEvaluator(scope: Scope): Algebra<number> {
  return (step) => {
    switch (step.tag) {
      case NodeTag.NUM:
        return step.value;
      case NodeTag.VAR:
        if (scope[step.name] === undefined) {
          throw new Error(`unknown variable ${step.name}`);
        }
        return scope[step.name];
      case NodeTag.BINOP:
        switch (step.op) {
          case "*":
            return step.left * step.right;
          default:
            throw new Error(`unknown binary operation ${step.op}`);
        }
      case NodeTag.CALL:
        switch (step.name) {
          case "sqrt":
            if (step.args.length !== 1) {
              throw new Error(`wrong number of arguments to sqrt (got ${step.args.length}, expected 1)`);
            }
            return Math.sqrt(step.args[0]);
          default:
            throw new Error(`unknown function ${step.name}`);
        }
    }
  };
}

const example = call("sqrt", [binop("*", num(3), variable("x"))]);
export const evaluator = scopedEvaluator({ x: 12 });
console.log(`${reduce(example, prettyPrinter)} = ${reduce(example, evaluator)}`);