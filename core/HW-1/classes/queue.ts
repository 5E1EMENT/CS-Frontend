import { List } from './list';

export class Queue<T> extends List<T> {
  readonly queue!: List<T>;

  get head(): T | undefined {
    return this.queue.first;
  }

  get length(): number {
    return this.queue.length;
  }

  constructor() {
    super();
    this.queue = this.createInnerQueue();
  }

  push(task: T): number {
    this.queue.push(task);
    return this.length;
  }

  pop(): T | Error {
    return this.queue.shift();
  }

  createInnerQueue(): List<T> {
    return new List<T>();
  }
}
