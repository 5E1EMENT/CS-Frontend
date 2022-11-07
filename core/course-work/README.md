# Библиотека для создания абстрактных "запросов" к данным и движок запросов

## Возможности библиотеки

Библиотека предоставляет API для создания универсальных запросов к объектам, в том числе и глубоким объектам. А также реализацию движка, который осуществляет поиск значений в объекте используя переданный запрос. Поиск данных осуществляется лениво и эффективно.

```sh
const query = select(['user', 'skills']).where('skills').includes('fighting', 'alchemy').and('user').startsWith('Ger');

const data = [
  {
    user: 'Geralt',
    skills: ['fighting', 'witchcraft', 'alchemy']
  }
];

console.log(...find(query, data));
```