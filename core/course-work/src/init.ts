// eslint-disable-next-line max-classes-per-file
import { Dictionary, UserInterface } from './types';

export default class AbstractReq<T> {
  data: T[];

  reqOptions: Dictionary<string | string[]> = {};

  iteratorData: IterableIterator<T>;

  constructor(data: T[]) {
    this.data = data;
    this.iteratorData = this.data[Symbol.iterator]();
  }

  includes(settings: string | string[]): IterableIterator<T | T[]> {
    this.reqOptions.includes = settings;
    const resultObj = Object.create(this);
    const iterator: IterableIterator<T | T[]> = {
      [Symbol.iterator]() {
        return this;
      },
      next: (): IteratorResult<T | T[]> => {
        const { value, done } = this.iteratorData.next();
        // console.log(value);
        return {
          done,
          value,
        };
      },
    };
    return Object.assign(resultObj, iterator);
  }

  where(key: string): IterableIterator<T | T[]> {
    const resultObj = Object.create(this);
    this.reqOptions.where = key;
    const iterator: IterableIterator<T | T[]> = {
      [Symbol.iterator]() {
        return this;
      },
      next: (): IteratorResult<T | T[]> => {
        const { value, done } = this.iteratorData.next();
        console.log(value);
        if (value) {
          if (value[key]) {
            return {
              done,
              value: value[key],
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
    return Object.assign(resultObj, iterator);
  }

  select(settings: string | string[]): IterableIterator<T | T[]> {
    let iteratorSettings = this.getIteratorSettings(settings);
    const resultObj = Object.create(this);

    this.reqOptions.select = settings;
    this.data = [];
    const iterator: IterableIterator<T | T[]> = {
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

          iteratorSettings = this.getIteratorSettings(settings);
          this.data.push({ ...resultObj });
          return {
            done: false,
            value: { ...resultObj },
          };
        }
        this.iteratorData = this.data[Symbol.iterator]();
        return {
          done: true,
          value: this,
        };
      },
    };
    const t = Object.assign(resultObj, iterator);
    return t;
  }

  find(query: IterableIterator<T | T[]>): IterableIterator<T | T[]> {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next(): IteratorResult<T | T[]> {
        const iterator = query.next();
        if (iterator.done) {
          return { done: true, value: undefined };
        }
        return {
          done: false,
          value: iterator.value,
        };
      },
    };
  }

  private getIteratorSettings(settings: string | string[]): IterableIterator<string> {
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

const userSearch = new AbstractReq(data);
// @ts-ignore
console.info([...userSearch.find(userSearch.select(['user', 'skills']).where('skills'))]);

// // console.log([...new Calc([3, 4, 5]).add(2)]);
// // 1. Необходимо написать итератор для генерации случайных чисел по заданным параметрам
// const random = (from: number, to: number): IterableIterator<number> => ({
//   [Symbol.iterator]() {
//     return this;
//   },
//   next(): IteratorResult<number> {
//     console.log('random');
//     return {
//       done: false,
//       value: Math.floor(Math.random() * (to - from + 1) + from),
//     };
//   },
// });

// // 2. Необходимо написать функцию take, которая принимает любой Iterable объект
// // и возвращает итератор по заданному количеству его элементов

// const take = (iterable: IterableIterator<number | number[]>, count: number): IterableIterator<number | number[]> => {
//   let current = 0;
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//     next(): IteratorResult<number | number[]> {
//       current++;
//       console.log('take');
//       if (current <= count) {
//         return {
//           done: false,
//           value: iterable.next().value,
//         };
//       }
//       return {
//         done: true,
//         value: undefined,
//       };
//     },
//   };
// };

// // 3. Необходимо написать функцию filter, которая принимает любой Iterable объект
// // и функцию-предикат и возвращает итератор по элементам которые удовлетворяют предикату

// const filter = (iter: IterableIterator<number>, fn: (el: number) => boolean): IterableIterator<number> => ({
//   [Symbol.iterator]() {
//     return this;
//   },
//   next(): IteratorResult<number> {
//     const iterator = iter.next();
//     const iterValue = iterator.value;
//     console.log('filter');
//     if (iterator.done) {
//       return {
//         done: true,
//         value: undefined,
//       };
//     }
//     return {
//       done: false,
//       value: fn(iterValue) ? iterValue : this.next().value,
//     };
//   },
// });

// const randomInt3 = random(0, 100);
// console.log([
//   ...take(
//     filter(randomInt3, (el) => el > 70),
//     3,
//   ),
// ]);
