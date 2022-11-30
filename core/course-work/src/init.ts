// eslint-disable-next-line max-classes-per-file
import { Dictionary, UserInterface } from './types';

export default class AbstractReq<T> {
  private static reqOptions: Dictionary<string | string[]> = {};

  and(option: string): IterableIterator<T | T[]> {
    let iteratorData: Iterator<any>;
    return {
      [Symbol.iterator]() {
        return this;
      },
      // @ts-ignore
      next: (data: IterableIterator<T>): IteratorResult<T | T[]> => {
        if (!iteratorData) {
          iteratorData = data[Symbol.iterator]();
        }
        const { value, done } = iteratorData.next();
        if (value) {
          if (option in value) {
            return { value: value[option], done };
          }
        }

        return { value: undefined, done: true };
      },
    };
  }

  startsWith(option: string): IterableIterator<T | T[]> {
    let iteratorData: Iterator<any>;
    const regExpStartsWith = new RegExp(`^${option}`, 'i');
    return {
      [Symbol.iterator]() {
        return this;
      },
      // @ts-ignore
      next: (data: IterableIterator<T>): IteratorResult<T | T[]> => {
        if (!iteratorData) {
          iteratorData = data[Symbol.iterator]();
        }
        const { value, done } = iteratorData.next();
        if (value) {
          const result = regExpStartsWith.test(value);
          return { value: result ? value : undefined, done };
        }
        return { value, done };
      },
    };
  }

  includes(settings: string): IterableIterator<T | T[]> {
    let iteratorSettings = AbstractReq.getIteratorSettings(settings);
    let iteratorData: Iterator<any>;
    let resultObj = {} as any;
    AbstractReq.reqOptions.includes = settings;
    return {
      [Symbol.iterator]() {
        return this;
      },
      // @ts-ignore
      next: (data: IterableIterator<T>): IteratorResult<T | T[] | undefined> => {
        if (!iteratorData) {
          iteratorData = data[Symbol.iterator]();
        }
        const { value, done } = iteratorData.next();
        const settingsIter = iteratorSettings.next();
        if (!done) {
          const includes = value.where.indexOf(settingsIter.value) !== -1;
          if (includes) {
            resultObj = { ...value };
            delete resultObj.where;
            iteratorSettings = AbstractReq.getIteratorSettings(settings);
            return { value: resultObj, done: false };
          }
          iteratorSettings = AbstractReq.getIteratorSettings(settings);
        }
        return {
          done,
          value: undefined,
        };
      },
    };
  }

  where(key: string): IterableIterator<T | T[]> {
    let iteratorData: Iterator<T>;
    AbstractReq.reqOptions.where = key;
    return {
      [Symbol.iterator]() {
        return this;
      },
      // @ts-ignore
      next: (data: IterableIterator<T>): IteratorResult<Record<string, string>> => {
        if (!iteratorData) {
          iteratorData = data[Symbol.iterator]();
        }
        const { value, done } = iteratorData.next();
        if (value) {
          if (value[key]) {
            const objData = { ...value, where: value[key] } as Record<string, string>;
            return {
              done,
              value: objData,
            };
          }
          return {
            done,
            value,
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }

  select(settings: string | string[]): IterableIterator<T | T[]> {
    let iteratorSettings = AbstractReq.getIteratorSettings(settings);
    const resultObj = {} as T;
    let iteratorData: Iterator<T>;
    AbstractReq.reqOptions.select = settings;
    return {
      [Symbol.iterator]() {
        return this;
      },
      // @ts-ignore
      next: (data: IterableIterator<T>): IteratorResult<T | T[]> => {
        if (!iteratorData) {
          iteratorData = data[Symbol.iterator]();
        }

        const { value, done } = iteratorData.next();
        if (!done) {
          let iter = iteratorSettings.next();
          while (!iter.done) {
            resultObj[iter.value as keyof T] = value[iter.value as keyof T];
            iter = iteratorSettings.next();
          }

          iteratorSettings = AbstractReq.getIteratorSettings(settings);
          return {
            done: false,
            value: { ...resultObj },
          };
        }
        return {
          done: true,
          value: this,
        };
      },
    };
  }

  query(data: T[], ...fns: IterableIterator<T | T[]>[]) {
    const reduceData = fns.reduce(
      (acc, iterator) => ({
        // @ts-ignore
        [Symbol.iterator]() {
          return this;
        },
        next: (): IteratorResult<T | T[]> => {
          // @ts-ignore
          const { done, value } = iterator.next(acc);
          return {
            done,
            value,
          };
        },
      }),
      data,
    );
    const filterResult = AbstractReq.filterResult(reduceData);
    return filterResult;
  }

  private static filterResult(pipeResult: IterableIterator<any>): IterableIterator<any> {
    const values: IterableIterator<any>[] = [];
    let valuesIterator: IterableIterator<IterableIterator<any>>;
    return {
      [Symbol.iterator]() {
        return this;
      },
      // @ts-ignore
      next() {
        let iter = pipeResult.next();
        while (!iter.done) {
          if (iter.value !== undefined) {
            values.push(iter.value as unknown as IterableIterator<any>);
          }

          iter = pipeResult.next();
        }

        if (!valuesIterator) {
          valuesIterator = values[Symbol.iterator]();
        }

        const { done, value } = valuesIterator.next();

        if (!done) {
          return {
            done,
            value,
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }

  private static getIteratorSettings(settings: string | string[]): IterableIterator<string> {
    if (typeof settings === 'string') {
      return [settings][Symbol.iterator]();
    }
    return settings[Symbol.iterator]();
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

const userSearch = new AbstractReq();
const { includes, where, select, and, startsWith } = userSearch;
console.info([
  ...userSearch.query(
    data,
    select(['user', 'skills']),
    where('skills'),
    includes('alchemy'),
    and('user'),
    startsWith('Ger'),
  ),
]);
