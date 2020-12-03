import { helpers } from 'vuelidate/lib/validators';

export function length(length) {
  return helpers.withParams({ type: 'length', value: length }, (value) => {
    return !helpers.req(value) || value.length === length;
  });
}
