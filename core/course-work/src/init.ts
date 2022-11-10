import { UserInterface } from './types';

export default class AbstractReq<T> {
  data: T[];

  iteratorData: IterableIterator<T>;

  constructor(data: T[]) {
    this.data = data;
    this.iteratorData = this.data[Symbol.iterator]();
  }

  where(key: string): IterableIterator<T | T[]> {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: (): IteratorResult<T | T[]> => {
        const { value, done } = this.iteratorData.next();
        conosle.log(value, done);

        return {
          done,
          value,
        };
      },
    };
  }

  select(settings: string | string[]): IterableIterator<T | T[]> {
    let iteratorSettings = settings[Symbol.iterator]();
    const resultObj = {} as T;
    this.data = [];
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: (): IteratorResult<T | T[]> => {
        const { value, done } = this.iteratorData.next();
        if (!done) {
          let iter = iteratorSettings.next();
          while (!iter.done) {
            resultObj[iter.value as keyof T] = value[iter.value as keyof T];
            iter = iteratorSettings.next();
          }

          iteratorSettings = settings[Symbol.iterator]();
          this.data.push({ ...resultObj });

          return {
            done: false,
            value: { ...resultObj },
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }
}

const data: UserInterface[] = [
  {
    user: 'Geralt',
    skills: ['fighting', 'witchcraft', 'alchemy'],
    pet: 'Plotva',
  },
  {
    user: 'Vesemir',
    skills: ['fighting', 'alchemy'],
    pet: 'Bur',
  },
  {
    user: 'Ciri',
    skills: ['fighting'],
    pet: 'Zirael',
  },
];

const userSearch = new AbstractReq(data);
console.info([...userSearch.select(['user', 'pet'])]);
