export enum NodeTag { NUM, VAR, BINOP, CALL };

export type AstNode = Num | Var | Binop | Call;
export type Num = { tag: NodeTag.NUM, value: number }; // base case
export type Var = { tag: NodeTag.VAR, name: string }; // base case
export type Binop = { tag: NodeTag.BINOP, op: string, left: AstNode, right: AstNode }; // recursive case
export type Call = { tag: NodeTag.CALL, name: string, args: AstNode[] }; // recursive case
