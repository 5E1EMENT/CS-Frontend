class TaskWorker<T> {
  #execTime: number = 100;

  #idleTime: number = 100;

  #task: Generator<'timeout' | Error>;

  constructor(iterable: Iterable<T>, callback: (iterElement: T) => void) {
    const iterator = iterable[Symbol.iterator]();
    this.#task = this.#createWorker(iterator, callback);
  }

  *#createWorker(
    iterator: Iterator<T>,
    callback: (iterElement: T) => void
  ): Generator<'timeout' | Error> {
    let { done, value } = iterator.next();
    let startTime = performance.now();

    while (!done) {
      if (performance.now() - startTime > this.#execTime) {
        yield 'timeout';
        startTime = performance.now();
      }

      try {
        callback(value);
      } catch (error) {
        if (error instanceof Error) yield error;
      }

      ({ done, value } = iterator.next());
    }
  }

  iterate(resolve: (v?: any) => void, reject: (r?: any) => void): unknown {
    const { done, value } = this.#task.next();
    console.log(value);
    if (done) return resolve();

    if (value instanceof Error) return reject(value);

    return setTimeout(() => {
      this.iterate(resolve, reject);
    }, this.#idleTime);
  }
}

function forEach<T>(
  iterable: Iterable<T>,
  callback: (iterElement: T) => void
): Promise<void> {
  if (typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('Object is not iterable');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Callback is not a type of function');
  }

  const taskWorker = new TaskWorker(iterable, callback);
  return new Promise((resolve, reject) => {
    taskWorker.iterate(resolve, reject);
  });
}

const numbers = [...Array(5e7).keys()];
let sumOfNums = 0;
console.log(222);
forEach(numbers, (num) => {
  sumOfNums += num;
}).then(() => {
  console.log(sumOfNums); // 5e5
  console.log('Finished!');
});
