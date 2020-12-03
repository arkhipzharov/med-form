<!-- eslint-disable prettier/prettier -->
<template>
  <FormFieldset
    class="date-form-field"
    :legend="legend"
    legendSize="sm"
    inline
  >
    <ValidationWrapper
      v-for="(data, key) in dateFormFieldData"
      :key="key"
      :vuelidateObj="vuelidateObj"
      :inputData="
        rootFormData[`${flattenedDataKeysBase}${capitalizeFirstLetter(key)}`]
      "
      :type="'number'"
    >
      <FormGroup
        :vuelidateObj="vuelidateObj"
        :inputData="
          rootFormData[`${flattenedDataKeysBase}${capitalizeFirstLetter(key)}`]
        "
        :type="'number'"
      />
    </ValidationWrapper>
  </FormFieldset>
</template>
<!-- eslint-enable -->

<script>
  import { required, between } from 'vuelidate/lib/validators';
  import { capitalizeFirstLetter } from '@/utils/helpers';
  import FormFieldset from './FormFieldset';
  import ValidationWrapper from './ValidationWrapper';
  import FormGroup from './FormGroup';

  const currentYear = new Date().getFullYear();

  export const dateFormFieldData = {
    day: {
      label: 'День',
      placeholder: '20',
    },
    month: {
      label: 'Месяц',
      placeholder: '12',
    },
    year: {
      label: 'Год',
      placeholder: '2000',
    },
  };

  export const dateFormFieldValidations = {
    day: {
      required,
      between: between(1, 31),
    },
    month: {
      required,
      between: between(1, 12),
    },
    year: {
      required,
      between: between(currentYear - 200, currentYear),
    },
  };

  export default {
    components: {
      FormFieldset,
      ValidationWrapper,
      FormGroup,
    },
    props: {
      vuelidateObj: {
        type: Object,
        required: true,
      },
      legend: {
        type: String,
        required: true,
      },
      rootFormData: {
        type: Object,
        required: true,
      },
      flattenedDataKeysBase: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        dateFormFieldData,
      };
    },
    methods: { capitalizeFirstLetter },
  };
</script>
