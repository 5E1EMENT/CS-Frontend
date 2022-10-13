import { INode } from './node';

export class Stack<T> {
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

  constructor(value?: INode<T>) {
    if (value) {
      this.firstNode = value;
      this.lastNode = value;
    }
  }
  /**
   * Add node to the to the top of the stack
   * return length of the stack
   */
  push(val: T): number {
    const newNode = new INode<T>(val);

    if (!this.firstNode) {
      this.firstNode = newNode;
      this.lastNode = newNode;
    } else {
      const temp = this.firstNode;
      this.firstNode = newNode;
      this.firstNode.next = temp;
    }

    return this.lengthStore++;
  }
  /**
   * Remove node from the top of the list
   * return value or Exeption error
   */
  pop(): T | Error {
    if (!this.firstNode) return new Error('Exeption');
    const temp = this.firstNode;
    if (this.lengthStore === 1) {
      this.lastNode = null;
    }
    this.firstNode = this.firstNode.next;
    this.lengthStore--;
    return temp.data;
  }
}
