import Range from './range';

//1. Необходимо написать итератор для генерации случайных чисел по заданным параметрам
const random = (from: number, to: number): IterableIterator<number> => {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<number> {
      return {
        done: false,
        value: Math.floor(Math.random() * (to - from + 1) + from),
      };
    },
  };
};

const randomInt = random(0, 100);
const randomInt11 = random(0, 100);

console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());

// 2. Необходимо написать функцию take, которая принимает любой Iterable объект
//и возвращает итератор по заданному количеству его элементов

const take = (
  iterable: IterableIterator<number | number[]>,
  count: number
): IterableIterator<number | number[]> => {
  let current = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<number | number[]> {
      current++;
      if (current <= count) {
        return {
          done: false,
          value: iterable.next().value,
        };
      }
      return {
        done: true,
        value: undefined,
      };
    },
  };
};

const randomInt2 = random(0, 100);
console.log([...take(randomInt2, 5)]);

// 3. Необходимо написать функцию filter, которая принимает любой Iterable объект
// и функцию-предикат и возвращает итератор по элементам которые удовлетворяют предикату

const filter = (
  iter: IterableIterator<number>,
  fn: (el: number) => boolean
): IterableIterator<number> => {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<number> {
      const iterator = iter.next();
      const iterValue = iterator.value;
      if (iterator.done) {
        return {
          done: true,
          value: undefined,
        };
      }
      return {
        done: false,
        value: fn(iterValue) ? iterValue : this.next().value,
      };
    },
  };
};

const randomInt3 = random(0, 100);
console.log([
  ...take(
    filter(randomInt, (el) => el > 70),
    3
  ),
]);

// 4. Необходимо написать функцию enumerate, которая принимает любой Iterable объект
// и возввращает итератор по парам (номер итерации, элемент)

const randomInt4 = random(0, 100);

const enumerate = (iter: IterableIterator<number>) => {
  let counter = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<number[]> {
      const { done, value } = iter.next();
      if (done) {
        return {
          done: true,
          value: undefined,
        };
      }
      const pair = [counter, value];
      counter++;
      return { done: false, value: pair };
    },
  };
};

console.log([...take(enumerate(randomInt4), 3)]);

//5. Необходимо написать класс Range, который бы позволял создавать диапазоны чисел или символов,
// а также позволял обходить элементы Range с любого конца

const symbolRange = new Range('a', 'f');

console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']

const numberRange = new Range(-5, 1);

console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]

// 6. Необходимо написать функцию seq, которая бы принимала множество Iterable объектов
// и возвращала итератор по их элементам

const seq = (...iterables: Array<any>): IterableIterator<any> => {
  let iterableCount = 0;
  let currentIterator: Iterator<unknown> | null = null;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (iterableCount >= iterables.length)
        return { done: true, value: undefined };

      if (currentIterator === null) {
        currentIterator = iterables[iterableCount][Symbol.iterator]();
      }

      console.log(currentIterator);

      const { done, value } = currentIterator.next();

      if (done) {
        iterableCount++;
        currentIterator = null;
        return this.next();
      }

      return { done: false, value };
    },
  };
};

console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'

// 7. Необходимо написать функцию zip, которая бы принимала множество Iterable объектов
// и возвращала итератор по кортежам их элементов

const zip = (...iterables: Array<any>): IterableIterator<any> => {
  const iterators: Iterator<unknown>[] = [];

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (!iterables.length) return { done: true, value: undefined };

      if (iterators.length === 0) {
        for (const iterableItem of iterables) {
          iterators.push(iterableItem[Symbol.iterator]());
        }
      }

      let isFinished = true;
      const iteratorsValue = [];
      for (const iteratorItem of iterators) {
        const { done, value } = iteratorItem.next();

        if (!done) isFinished = false;

        iteratorsValue.push(value);
      }

      console.log(isFinished);
      return isFinished
        ? { done: true, value: undefined }
        : { done: false, value: iteratorsValue };
    },
  };
};

console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]

// 8. Необходимо написать функцицию, которая принималабы любой Iterable объект
//и Iterable с функциями и возвращала итератор где каждому элементу левого Iterable
// последовательно применяются все функции из правого

const mapSeq = <T>(
  iterable: Array<T>,
  mappers: ((value: T) => T)[]
): IterableIterator<T> => {
  const collectionIterator = iterable[Symbol.iterator]();
  console.log(collectionIterator);
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T> {
      const { done, value } = collectionIterator.next();
      if (done) return { done: true, value: undefined };
      const mappersIterator = mappers[Symbol.iterator]();
      let mappersIteratorResult = mappersIterator.next();
      let result: T = value;
      while (!mappersIteratorResult.done) {
        result = mappersIteratorResult.value(result);
        mappersIteratorResult = mappersIterator.next();
      }

      return { done: false, value: result };
    },
  };
};

console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]
