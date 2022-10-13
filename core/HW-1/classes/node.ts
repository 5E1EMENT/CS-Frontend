/**
 * Linked list node
 * @typeparam T - node data
 */
export class INode<T> {
  /**
   * Node data
   */
  readonly data: T;

  /**
   * A link to the next node
   */
  next: INode<T> | null = null;

  /**
   * A link to the previous node
   */
  prev?: INode<T> | null = null;

  /**
   * @param [data]
   */
  constructor(data: T) {
    this.data = data;
  }
}
