<!-- eslint-disable prettier/prettier -->
<template>
  <fieldset class="form-fieldset">
    <legend
      class="form-fieldset__legend"
      :class="{ small: legendSize === 'sm' }"
    >
      {{ legend }}
      <span
        v-if="checkValidationFailed('required')"
        class="form-fieldset__required-mark"
        title="Обязательное поле"
      >
        *
      </span>
    </legend>
    <div
      class="form-fieldset__content"
      :class="{
        inline,
        'no-flex-stretch': noFlexStretch,
        'validation-failed-hide-input-require-marks': checkValidationFailed('required'),
      }"
    >
      <slot></slot>
    </div>
  </fieldset>
</template>
<!-- eslint-enable -->

<script>
  import { validation } from '@/mixins';

  export default {
    mixins: [validation],
    props: {
      vuelidateObj: {
        type: Object,
        required: false,
        default: () => {},
      },
      inputData: {
        type: Object,
        required: false,
        default: () => {},
      },
      type: {
        type: String,
        required: false,
        default: '',
      },
      legend: {
        type: String,
        required: true,
      },
      legendSize: {
        type: String,
        required: false,
        default: 'lg',
      },
      inline: {
        type: Boolean,
        required: false,
        default: false,
      },
      noFlexStretch: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  };
</script>

<style lang="scss">
  .form-fieldset {
    &__legend {
      margin-bottom: 25px;
      font-weight: 600;
      font-size: 32px;

      &.small {
        margin-bottom: 12px;
        font-size: 19px;
      }
    }

    &__required-mark {
      color: $text-red;
    }

    &__content {
      &.inline {
        display: flex;

        > * {
          flex: 1 1 0;
        }

        > * + * {
          margin-left: 20px;
        }
      }

      &.no-flex-stretch {
        > * {
          flex: none;
        }
      }

      &.validation-failed-hide-input-require-marks {
        color: $text-black;

        .form-group__label-required-mark {
          display: none;
        }
      }
    }
  }
</style>
