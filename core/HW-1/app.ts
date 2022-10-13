import { List } from './classes/list';
import { Queue } from './classes/queue';
import { Stack } from './classes/stack';
import { Structure } from './classes/structure';

const list = new List<number>();

list.push(1);
list.push(2);
list.push(3);

console.log(list?.firstNode?.data); // 1
console.log(list?.lastNode?.data); // 3
console.log(list?.firstNode?.next?.data); // 2
console.log(list?.firstNode?.next?.prev?.data); // 1

for (const value of list) {
  console.log(value);
}

// //<=====================================================>
const queue = new Queue<number>();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head); // 10

console.log(queue.pop()); // 10

console.log(queue.head); // 11

console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
console.log(queue.pop()); // Exception
//<=====================================================>

const dequeue = new Queue<number>();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop()); // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop()); // 10
console.log(dequeue.pop()); // Exception
//<=====================================================>
const stack = new Stack<number>();

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.firstNode?.data); // 12

console.log(stack.pop()); // 12

console.log(stack.firstNode?.data); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception
//<=====================================================>
const jackBlack = new Structure(['name', 'lastName', 'age']);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

console.log(jackBlack.get('name')); // 'Jack'
console.log(jackBlack.get('lastName')); // 'Jack'
console.log(jackBlack.get('age')); // 'Jack'
