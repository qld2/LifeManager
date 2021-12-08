import eslint, { Rule } from 'eslint';
import {
  filterReports,
  mapReports,
  Predicate,
  Problem,
  FixType,
} from 'eslint-rule-composer';

const rules = new eslint.Linter().getRules();

/**
 * Map eslint base rule to new one.
 * 
 * @param id Id of the base rule.
 * @param map Mapping function.
 * @param fixType Fix type.
 * @returns Rule
 */
function mapBaseRule(
  id: string,
  map: Predicate<Problem>,
  fixType: FixType = 'code'
): Rule.RuleModule {
  const rule = mapReports(rules.get(id) as Rule.RuleModule, map);
  if (rule.meta) {
    rule.meta.fixable = fixType;
  }
  return rule;
}

/**
 * Filter from eslint base rules
 * 
 * @param id ID of the base rule.
 * @param filter Filtering function.
 * @param fixType Fix type.
 * @returns Rule
 */
function filterBaseRule(
  id: string,
  filter: Predicate<boolean>,
  fixType: FixType = 'code'
): Rule.RuleModule {
  const rule = filterReports(rules.get(id) as Rule.RuleModule, filter);
  if (rule.meta) {
    rule.meta.fixable = fixType;
  }
  return rule;
}

/**
 * Filtering & Mapping eslint base rules.
 * 
 * @param id ID of the base rule.
 * @param filter Filtering function.
 * @param map Mapping function.
 * @param fixType Fix type
 * @returns Rule
 */
function filterMapBaseRule(
  id: string,
  filter: Predicate<boolean>,
  map: Predicate<Problem>,
  fixType: FixType = 'code'
): Rule.RuleModule {
  const rule = mapReports(
    filterReports(rules.get(id) as Rule.RuleModule, filter),
    map,
  );
  if (rule.meta) {
    rule.meta.fixable = fixType;
  }
  return rule;
}

/**
 * Extends the problem.
 * 
 * @param problem The origin problem.
 * @param properties The new properties.
 * @returns Extended problem from.
 */
function extendsProblem(
  problem: Problem,
  {
    message = 'I can fix it',
    messageId = null,
    fix,
  }: Partial<Problem>
): Problem {
  return {
    ...problem,
    message, messageId, fix,
  }
}

export default {
  mapBaseRule,
  filterBaseRule,
  extendsProblem,
  filterMapBaseRule
}
