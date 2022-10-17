import { List } from './list';
import { INode } from './node';

export class DynamicArray<T> extends List<T> {
  protected list: List<Array<T>>;
  #length: number;

  #capacity: number;

  get length(): number {
    return this.list.length;
  }

  get capacity(): number {
    return this.#capacity;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const arr of this.list) {
      for (let i = 0; i < this.#capacity; i += 1) {
        yield arr[i];
      }
    }
  }

  constructor(capacity: number) {
    super();
    this.list = this.createInnerlist();
    this.#length = 0;
    this.#capacity = capacity;
  }

  add(task: T): void {
    const arr = this.list?.lastNode?.data;
    if (!arr || arr[arr.length - 1] !== undefined) {
      this.grow();
      this.add(task);
    } else {
      arr[this.getInnerIndex(this.#length)] = task;
      this.#length += 1;
    }
  }

  get(index: number): T | undefined {
    const item = this.findListItemForIndex(index);
    //@ts-ignore
    return item === null ? undefined : item.data[this.getInnerIndex(index)];
  }

  protected findListItemForIndex(index: number): INode<T> | INode<T[]> | null {
    const target = Math.floor(index / this.#capacity);
    let i = 0;
    let item = this.list.firstNode;
    while (item !== null && target !== i) {
      item = item.next;
      i += 1;
    }
    return item;
  }

  protected grow(size: number = this.#capacity): List<Array<T>>[] {
    const total = Math.ceil(size / this.#capacity);
    const itemsAdded = new Array(total);
    for (let i = 0; i < total; i += 1) {
      this.list.push(new Array<T>(this.#capacity));
      itemsAdded[i] = this.list.lastNode;
    }
    return itemsAdded;
  }

  protected shrink(size: number = this.#capacity): void {
    const total = Math.floor(size / this.#capacity);
    for (let i = 0; i < total; i += 1) {
      this.list.pop();
    }
  }

  protected getInnerIndex(globalIndex: number): number {
    return globalIndex % this.#capacity;
  }

  createInnerlist(): List<Array<T>> {
    return new List<Array<T>>();
  }
}
