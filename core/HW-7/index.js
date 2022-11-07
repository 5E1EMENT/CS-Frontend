var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _TaskWorker_instances, _TaskWorker_execTime, _TaskWorker_idleTime, _TaskWorker_task, _TaskWorker_createWorker;
class TaskWorker {
    constructor(iterable, callback) {
        _TaskWorker_instances.add(this);
        _TaskWorker_execTime.set(this, 100);
        _TaskWorker_idleTime.set(this, 100);
        _TaskWorker_task.set(this, void 0);
        const iterator = iterable[Symbol.iterator]();
        __classPrivateFieldSet(this, _TaskWorker_task, __classPrivateFieldGet(this, _TaskWorker_instances, "m", _TaskWorker_createWorker).call(this, iterator, callback), "f");
    }
    iterate(resolve, reject) {
        const { done, value } = __classPrivateFieldGet(this, _TaskWorker_task, "f").next();
        console.log(value);
        if (done)
            return resolve();
        if (value instanceof Error)
            return reject(value);
        return setTimeout(() => {
            this.iterate(resolve, reject);
        }, __classPrivateFieldGet(this, _TaskWorker_idleTime, "f"));
    }
}
_TaskWorker_execTime = new WeakMap(), _TaskWorker_idleTime = new WeakMap(), _TaskWorker_task = new WeakMap(), _TaskWorker_instances = new WeakSet(), _TaskWorker_createWorker = function* _TaskWorker_createWorker(iterator, callback) {
    let { done, value } = iterator.next();
    let startTime = performance.now();
    while (!done) {
        if (performance.now() - startTime > __classPrivateFieldGet(this, _TaskWorker_execTime, "f")) {
            yield 'timeout';
            startTime = performance.now();
        }
        try {
            callback(value);
        }
        catch (error) {
            if (error instanceof Error)
                yield error;
        }
        ({ done, value } = iterator.next());
    }
};
function forEach(iterable, callback) {
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
