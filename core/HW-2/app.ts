import { binarySearch } from './classes/binarySearch';
import { BinarySearchTree } from './classes/BinarySearchTree';
import { DynamicArray } from './classes/dynamicArray';
import { HashMap } from './classes/HashMap';

const arr = new DynamicArray(3 /* Размер фиксированного массива в списке */);

arr.add(1);
arr.add(2);
arr.add(3);
arr.add(4);
arr.add(5);
arr.add(7);
arr.add(7);

console.log(arr.length); // 5
console.log(arr.capacity); // 3

console.log(arr.get(0)); // 1
console.log(arr.get(1)); // 2
console.log(arr.get(4)); // 5

for (const value of arr) {
  console.log(value);
}
// <===============================>
const map = new HashMap();

map.set('foo', 'bar');
map.set(10, 'bla');

console.log(map.get('foo')); // 'bar'
console.log(map.get(10)); // 'bla'

// <===============================>
console.log(binarySearch(4, [-432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98])); // 8 - это индекс

// <=============================

//      10
//   5     13
// 2  7  11  16

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(7);

console.log(tree.contains(11));

console.log(tree);
