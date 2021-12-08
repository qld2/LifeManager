import utils from '../utils';
import { Problem } from 'eslint-rule-composer';
import { isExpressionStatement } from '../ast-utils';

/**
 * Map the non-fixable problem to fixable problem.
 * 
 * @param   problem A problem reported from eslint base rule.
 * @returns A Fixable problem
 */
function mapReport(problem: Problem): Problem {
  return utils.extendsProblem(problem, {
    fix(fixer) {
      const { node } = problem;
      const target = node.parent?.parent;
      return isExpressionStatement(target) ? fixer.remove(target) : null;
    }
  })
}

export default utils.filterMapBaseRule(
  'no-console',
  ({node}) => isExpressionStatement(node.parent?.parent),
  mapReport,
  'code',
);