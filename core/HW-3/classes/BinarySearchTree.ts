class BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  root: BinaryNode | null;
  constructor() {
    this.root = null;
  }
  insert(value: number) {
    let newNode = new BinaryNode(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value: number) {
    if (this.root === null) return false;
    let current = this.root,
      found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left as BinaryNode;
      } else if (value > current.value) {
        current = current.right as BinaryNode;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current;
  }

  contains(value: number) {
    if (this.root === null) return false;
    let current = this.root,
      found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left as BinaryNode;
      } else if (value > current.value) {
        current = current.right as BinaryNode;
      } else {
        return true;
      }
    }
    return false;
  }
}
