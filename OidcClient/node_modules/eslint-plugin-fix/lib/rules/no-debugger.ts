import utils from '../utils';
import { Problem } from 'eslint-rule-composer';

/**
 * Map the non-fixable problem to fixable problem.
 *
 * @param problem The non-fixable problem from base rule.
 * @returns Fixable Problem
 */
function mapReport(problem: Problem): Problem {
  return utils.extendsProblem(problem, {
    fix(fixer) {
      const { node } = problem;
      return fixer.remove(node);
    },
  });
}

export default utils.mapBaseRule(
  'no-debugger',
  mapReport,
  'code',
);
