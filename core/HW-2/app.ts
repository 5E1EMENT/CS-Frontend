export const isDigit = (str: string) => {
  const isNumber = Number(str);
  const romanKeys = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
  ];

  console.log(!isNaN(isNumber));
  if (!isNaN(isNumber)) {
    return true;
  } else {
    for (let letter of str) {
      return !!romanKeys.indexOf(letter);
    }
  }
};

console.log(isDigit('123')); // true
console.log(isDigit('Ⅻ')); // true
