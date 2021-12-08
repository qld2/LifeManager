import utils from '../utils';
import { Problem } from 'eslint-rule-composer';
import { isExpressionStatement } from '../ast-utils';

/**
 * Map the non-fixable problem to fixable problem.
 *
 * @param   problem The non-fixable problem from base rule.
 * @returns Fixable Problem
 */
function mapReport(problem: Problem): Problem {
  return utils.extendsProblem(problem, {
    fix(fixer) {
      const { node } = problem;
      return isExpressionStatement(node.parent) ? fixer.remove(node.parent): null;
    },
  });
}

export default utils.filterMapBaseRule(
  'no-alert',
  ({node}) => isExpressionStatement(node?.parent),
  mapReport,
  'code',
);