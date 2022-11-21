// eslint-disable-next-line import/prefer-default-export
export class Calc {
  values: number[];

  mappers: ((value: number) => number)[];

  constructor(values: number[], mappers: ((value: number) => number)[] = []) {
    this.values = values;
    this.mappers = mappers;
  }

  inc() {
    return new Calc(this.values, [...this.mappers, (x) => x + 1]);
  }

  double() {
    return new Calc(this.values, [...this.mappers, (x) => x * 2]);
  }

  pow(exp: number) {
    return new Calc(this.values, [...this.mappers, (x) => x ** exp]);
  }

  add(value: number) {
    return new Calc(this.values, [...this.mappers, (x) => x + value]);
  }

  [Symbol.iterator](): Iterator<number> {
    const iterator = this.values[Symbol.iterator]();
    const { mappers } = this;

    return <IterableIterator<number>>{
      next() {
        const { done, value } = iterator.next();
        if (done) {
          return { done: true, value: undefined };
        }

        const mapped = mappers.reduce((result, currentMapper) => currentMapper(result), value);
        return { done: false, value: mapped };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}
