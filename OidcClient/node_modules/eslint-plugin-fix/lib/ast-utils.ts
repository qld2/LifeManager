import {Node, Identifier, ExpressionStatement} from 'ast';

/**
 * Check whether a node is an Identifier or not
 * 
 * @param node node to check
 * @returns True if the node is an Identifier node
 */
export function isIdentifier(
  node: Node | null | undefined
  ): node is Identifier {
  return node?.type === "Identifier";
}

/**
 * Check wheter a node is an Expression or not
 * 
 * @param node node to check
 * @returns True if the node is an Expression node
 */
export function isExpressionStatement(
  node: Node | null | undefined
  ): node is ExpressionStatement {
  return node?.type === "ExpressionStatement";
}
