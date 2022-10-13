import { INode } from './node';

export class List<T> {
  /**
   * A link to the first node of the list
   */
  firstNode: INode<T> | null = null;

  /**
   * A link to the last node of the list
   */
  lastNode: INode<T> | null = null;
  /**
   * Internal length value of the list
   */
  lengthStore: number = 0;
  /**
   * Number of nodes in the list
   */
  get length(): number {
    return this.lengthStore;
  }

  /**
   * Data of the first node in the list
   */
  get first(): any {
    return this.firstNode?.data;
  }

  /**
   * Data of the last node in the list
   */
  get last(): any {
    return this.lastNode?.data;
  }

  /**
   * @param [iterable] - data to add to the list
   */
  constructor(value?: T) {
    if (value) this.push(value);
  }
  /**
   * Add node to the to the top of the list
   */
  push(value: T): number {
    const link = new INode<T>(value);
    if (this.lastNode === null) {
      this.firstNode = link;
    } else {
      this.lastNode.next = link;
      link.prev = this.lastNode;
    }
    this.lastNode = link;
    this.lengthStore++;
    return this.lengthStore;
  }
  /**
   * Add node at the start of the list
   * returns list length
   */
  unshift(value: T): number {
    const link = new INode<T>(value);
    if (this.firstNode !== null) {
      this.firstNode.prev = link;
    } else {
      this.lastNode = link;
    }

    this.firstNode = link;
    this.lengthStore++;
    return this.length;
  }
  /**
   * Remove node from the start of the list
   */
  shift(): T | Error {
    const first = this.firstNode;
    if (first == null) {
      return new Error('Exeption');
    }
    if (this.length === 1) {
      this.firstNode = null;
      this.lastNode = null;
    } else {
      this.firstNode = first!.next;
    }
    first.next = null;
    this.lengthStore--;
    return first.data;
  }
  /**
   * Removes the last node from the list and returns its data as the result.
   * This method changes the length of the list.
   */
  pop(): T | Error {
    if (!this.length) return new Error('Exeption');
    const last = this.lastNode;
    if (this.length === 1) {
      this.firstNode = null;
      this.lastNode = null;
    } else {
      this.lastNode = last!.prev as INode<T>;
      this.lastNode!.next = null;
    }
    this.lengthStore--;
    return last!.data;
  }

  /**
   * Returns an iterator over the data from the list
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  /**
   * Returns an iterator over the data from the list
   */
  values(): IterableIterator<T> {
    let current = this.firstNode,
      cursor = 0;

    const length = this.lengthStore;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<T> {
        const done = length <= cursor++,
          value = current;

        current = value !== null ? value.next : value;

        if (done || value == null) {
          return {
            done: true,
            value: undefined,
          };
        }

        return {
          done,
          value: value.data,
        };
      },
    };
  }
}
