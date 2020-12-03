/* eslint-disable no-use-before-define */

export const errorMessages = {
  required: () => 'Обязательное поле',
  numeric: ({ $params }) => 'Только цифры',
  between: ({ $params }) => `
    от ${$params.between.min} до
    ${$params.between.max}
  `,
  startsWith: ({ $params }) => `
    Должно начинаться с "${$params.startsWith.value}"
  `,
  length: ({ $params }) => `Только ${$params.length.value} знаков`,
  alphaRu: () => 'Только русские буквы',
  nameOfSomethingRu: () => `
    Только русские буквы и одиночные пробелы/одиночные тире между них
  `,
  maxLength: ({ $params }) => `
    Не должно быть длиннее ${
      $params.maxLength.max
    } ${adoptWordEndingsToNumber($params.maxLength.max, [
      'знака',
      'знаков',
      'знаков',
    ])}
  `,
  postalCode: () => 'Неправильно введён почтовый индекс',
  house: () => 'Неправильно введён номер дома',
  passportSeries: () => 'Неправильно введена серия паспорта',
};

// ru and en
//
// https://realadmin.ru/coding/sklonenie-na-javascript.html (ru)
function adoptWordEndingsToNumber(number, wordsWithAllEndings) {
  number = Math.abs(number) % 100;
  const n1 = number % 10;
  let index;
  if (number > 10 && number < 20) {
    index = 2;
  } else if (n1 > 1 && n1 < 5) {
    index = 1;
  } else if (n1 === 1) {
    index = 0;
  } else {
    index = 2;
  }
  return wordsWithAllEndings[index];
}
