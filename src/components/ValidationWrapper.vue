<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="validation-wrapper"
    :class="{ error: validateObj.$error }"
  >
    <slot></slot>
    <template v-if="validateObj.$dirty">
      <div class="validation-wrapper__error-tip-color-transition-startup-wrapper">
        <p
          v-if="firstFailedValidationName"
          class="validation-wrapper__error-tip"
        >
          {{ errorMessages[firstFailedValidationName](validateObj) }}
        </p>
      </div>
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
    // need this because v-if removes transition, maybe because of manipulation
    // of element existence in DOM
    &__error-tip-color-transition-startup-wrapper {
      transition: color 0.3s;

      @at-root .validation-wrapper.error & {
        color: $text-red;
        transition: color 0.3s;
      }
    }

    &__error-tip {
      margin-top: 15px;
    }
  }
</style>
