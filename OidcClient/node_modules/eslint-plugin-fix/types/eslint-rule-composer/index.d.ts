declare module 'eslint-rule-composer' {
  import {Node} from 'ast';
  import * as eslint from 'eslint';
  
  interface Problem {
    node: Node;
    message: string;
    messageId: string | null;
    data: object | null;
    loc: eslint.AST.SourceLocation;
    fix?(fixer: eslint.Rule.RuleFixer): null | eslint.Rule.Fix | eslint.Rule.Fix[];
  }
  
  interface Metadata {
    sourceCode: eslint.SourceCode;
    settings?: object;
    options: any[];
    filename: string;
  }
  
  interface Predicate<T> {
    (problem: Problem, metadata: Metadata): T;
  }

  type FixType = 'code' | 'whitespace';

  export function mapReports(
    rule: eslint.Rule.RuleModule,
    iteratee: Predicate<Problem>
  ): eslint.Rule.RuleModule;
  
  export function filterReports(
    rule: eslint.Rule.RuleModule,
    predicate: Predicate<boolean>
  ): eslint.Rule.RuleModule;
  
  export function joinReports(
    rules: eslint.Rule.RuleModule[]
  ): eslint.Rule.RuleModule;
}