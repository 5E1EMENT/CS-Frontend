export class Calc {
  static #mathRegexp: RegExp = /-?[\d(][\d+\-*\\() ]+[\d)]/g;

  static #mathReplaceFunction(match: string): string {
    // console.log(match);
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      return new Function('', `{ console.log(${match}); return ${match}; }`)();
    } catch (error) {
      return match;
    }
  }

  static calculate(string: string): string {
    return string.replace(Calc.#mathRegexp, Calc.#mathReplaceFunction);
  }
}

console.log(
  Calc.calculate(`
  Какой-то текст (10 + 15 - 24) ** 2
  Еще какой то текст 2 * 10
  `)
);
