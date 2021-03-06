import { Type, mixed } from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

export type ValidateEntry = [Type<any>, mixed];

export function validateArgs(args: { [idx: string]: ValidateEntry }) {
  Object.keys(args).forEach((argName) => {
    const [type, input] = args[argName];
    const value = type.decode(input);
    try {
      ThrowReporter.report(value);
    } catch (e) {
      throw new Error(`bad input for argument ${argName}:\n${e}`);
    }
  });
}

// just a stupid utility function for prettier indentation
export function gql(strings: TemplateStringsArray) {
  return strings[0];
}
