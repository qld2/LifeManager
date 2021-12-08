import utils from '../utils';
import { Problem } from 'eslint-rule-composer';
import { Node, Identifier } from 'ast';
import { isIdentifier } from '../ast-utils';

/**
 * Change snake_case to camelCase
 * 
 * @param snake snake_case
 * @returns camelCase
 */
function snakeToCamel (snake: string): string {
  return snake.replace(/(\_[a-z])/g, captured => captured.replace('_', '').toUpperCase());
}

/**
 * Map the non-fixable problem to fixable problem.
 *
 * @param   problem The non-fixable problem from base rule.
 * @returns Fixable Problem
 */
function mapReport(problem: Problem): Problem {
  return utils.extendsProblem(problem, {
    fix(fixer) {
      const {node} = problem;
      if (isIdentifier(node)) {
        fixer.replaceText(
          node,
          snakeToCamel(node.name)
        );
      }
      return fixer.replaceText(
        node as Node,
        snakeToCamel(((node as Node) as Identifier).name)
      );
    },
  });
}

export default utils.mapBaseRule(
  'camelcase',
  mapReport,
  'code',
);
