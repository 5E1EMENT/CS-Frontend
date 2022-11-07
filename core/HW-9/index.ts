// 1.Необходимо написать функцию sleep, которая бы принимала заданное количество миллисекунд
//и возвращала Promise.

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
};
console.log(1);
sleep(1000).then(() => {
  console.log(`I'am awake!`);
});

// 2. Необходимо написать функцию timeout, которая бы принимала Promise и заданное
// количество миллисекунд и возвращала Promise.

const timeout = (req: Promise<any>, time: number) => {
  return Promise.race([req, new Promise((_r, rej) => setTimeout(rej, time))]);
};

// Через 200 мс Promise будет зареджекчен
timeout(sleep(1000), 2000)
  .then((data) => {
    console.log(data);
    console.log(321);
  })
  .catch((data) => {
    console.error(data);
    console.log(123);
  });

// 4. Необходимо написать функцию promisify, которая бы принимала функцию,
// где последний аргумент thunk-callback и возвращала бы новую функцию.
// Новая функция вместо thunk-callback будет возвращать Promise.

// const promisify = (fn: (file: any, callBack: any) => void): Promise<any> => {
//   return new Promise((resolve, reject) => {});
// };

// function readFile(file, cb) {
//   cb(null, 'fileContent');
// }

// const readFilePromise = promisify(readFile);
// readFilePromise('my-file.txt').then(console.log).catch(console.error);
