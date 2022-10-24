//1. Необходимо написать регулярное выражение, которое при вызове test на строке
//будет давать false, если в строке есть символы отличные от латинских, цифр,

import { Calc } from './MathReplacer';

//подчеркивания и знака $
const myRegExp = /[_\$\d\w]/g;
console.log(myRegExp.test('Привет!')); // false

//2. Необходимо создать массив на основе строки, где раздилителем будут символы . , ;
//или пробелы (подряд идущие пробелы считаюся за один)

const myRegExp2 = /[;,.\s]+/;
console.log('foo    bla.bar,gd;4'.split(myRegExp2)); // ['foo', 'bla', 'bar', 'gd', '4']

//3. Необходимо написать функцию, которая принимает строковый шаблон и объект параметров,
// и возвращает результат применения данных к этому шаблону

const format = (str: string, obj: Record<string, unknown>): string => {
  //Шаблон который описывает ${....}
  const stringTemplateRegexp = /\${\w+}/g;
  // Находим все совпадения
  //match будет равен ${user} и ${age}
  // По итогу заменяем ${user} и ${age} на то что вернет функция 'bob' и 10
  return str.replace(stringTemplateRegexp, (match: string) => {
    //Регулярка всех символов кроме букв
    const replaceSpecSymbolsRegExp = /[^\w+]/g;
    //Заменяем все символы кроме букв на пустую строку
    // и возвращаем объект по ключу
    // obj[user] obj[age]
    return obj[match.replace(replaceSpecSymbolsRegExp, '')] as string;
  });
};

// Hello, Bob! Your age is 10.
const res = format('Hello, ${user}! Your age is ${age}.', {
  user: 'Bob',
  age: 10,
});

console.log(res);

// 4. Необходимо написать регулярное выражение, которое бы удаляла из строки
// любые дублирования подстрок из 1-го, 2-х или 3-х символов, которые идут подряд
const myRegExp3 = /(.)(?=.*\1)/g;
const replaceVal = '';

console.log('aaaabbbbczzzz'.replace(myRegExp3, replaceVal)); //'abcz';
console.log('abababbbabcabc'.replace(myRegExp3, replaceVal)); // 'abc';
console.log('foofoobabaaaazze'.replace(myRegExp3, replaceVal)); // 'fobaze';

// 5. Нахождение арифметических операций в строке и замена на результат

console.log(
  Calc.calculate(`
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
`)
);
