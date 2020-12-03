import { helpers } from 'vuelidate/lib/validators';

export const nameOfSomethingRu = helpers.regex(
  'nameOfSomethingRu',
  // https://www.xspdf.com/resolution/50803928.html
  /^([А-Яа-яёЁ]+[\s-])+[А-Яа-яёЁ]+$|^[А-Яа-яёЁ]+$/,
);
