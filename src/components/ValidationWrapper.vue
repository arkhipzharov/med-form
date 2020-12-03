<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="validation-wrapper"
    :class="{ error: validateObj.$error }"
  >
    <slot></slot>
    <template v-if="validateObj.$dirty">
      <p
        v-if="firstFailedValidationName"
        class="form-group__error-tip"
      >
        {{ errorMessages[firstFailedValidationName](validateObj) }}
      </p>
    </template>
  </div>
</template>
<!-- eslint-enable -->

<script>
  import { errorMessages } from '@/js/objects/libs/vuelidate';
  import { validation } from '@/mixins/validation';

  export default {
    mixins: [validation],
    props: {
      vuelidateObj: {
        type: Object,
        required: true,
      },
      inputData: {
        type: Object,
        required: false,
        default: () => {},
      },
      options: {
        type: Array,
        required: false,
        default: () => [],
      },
      nestedInpuDataKey: {
        type: String,
        required: false,
        default: '',
      },
      type: {
        type: String,
        required: false,
        default: '',
      },
    },
    data() {
      return {
        errorMessages,
      };
    },
    computed: {
      firstFailedValidationName() {
        return Object.keys(this.validateObj.$params).find((key) => {
          return this.checkValidationFailed(key);
        });
      },
    },
  };
</script>

<style lang="scss">
  .validation-wrapper {
    &.error {
      color: $text-red;

      .form-input__input:not([type='radio']),
      .form-select {
        border: 1px solid $border-red;
      }
    }
  }
</style>
