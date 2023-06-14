import { AstNode } from "./00-ast";
import { List } from "./02-list";
import * as listF from "./09-generalizing-list";
import * as astF from "./10-generalizing-ast";

export function reduceList<T, V>(
  list: List<T>,
  alg: listF.Algebra<T, V>,
): V {
  const mapped = listF.fmap(list, (l) => reduceList(l, alg));
  return alg(mapped);
}

export function reduceAst<A>(
  node: AstNode,
  alg: astF.Algebra<A>,
): A {
  const mapped = astF.fmap(node, (n) => reduceAst(n, alg));
  return alg(mapped);
}

/* in general:

function cata<A>(
  data: RecursiveData,
  alg: Algebra<A>,
): A {
  const mapped = fmap(data, (subpart) => reduce(subpart, alg));
  return alg(mapped);
}

*/