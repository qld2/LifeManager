/**
 * @file fix
 * @author YeonJuAn
 */
import noConsole from './rules/no-console';
import noDebugger from './rules/no-debugger';
import noAlert from './rules/no-alert';
import camelCase from './rules/camelcase';

export const rules =  {
  'no-console': noConsole,
  'no-debugger':  noDebugger,
  'no-alert': noAlert,
  'camelcase': camelCase
}
