<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="form-group"
    :class="{ inline }"
  >
    <FormInput
      v-if="type === 'radio'"
      :inputData="inputDataFinal"
      :type="type"
      :selectedValueData="selectedValueData"
      :selectedValueDataKey="selectedValueDataKey"
    />
    <FormInput
      v-if="type === 'checkbox'"
      :inputData="inputData"
      :type="type"
    />
    <label
      :for="inputDataFinal.id || inputDataFinal.idAndDataKey"
      class="form-group__label"
      :class="{ 'inline-child': inline }"
    >
      {{ inputDataFinal.labelAndValue || inputDataFinal.label }}
      <span
        v-if="checkValidationFailed('required')"
        class="form-group__label-required-mark"
        title="Обязательное поле"
      >
        *
      </span>
      {{ tip ? `(${tip.trim()})` : '' }}
    </label>
    <FormInput
      v-if="type === 'text' || type === 'number'"
      :inputData="inputData"
      :validateObj="validateObj"
      :type="type"
      :nestedInpuDataKey="nestedInpuDataKey"
    />
    <FormSelect
      v-else-if="type === 'select'"
      :inputData="inputDataFinal"
      :options="options"
      :multiple="multiple"
    />
    <FormTextarea
      v-else-if="type === 'textarea'"
      :inputData="inputData"
      :validateObj="validateObj"
    />
  </div>
</template>
<!-- eslint-enable -->

<script>
  import { validation } from '@/mixins/validation';
  import FormInput from './FormInput';
  import FormSelect from './FormSelect';
  import FormTextarea from './FormTextarea';

  export default {
    components: {
      FormInput,
      FormSelect,
      FormTextarea,
    },
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
        default: 'text',
      },
      tip: {
        type: String,
        required: false,
        default: '',
      },
      selectedValueData: {
        type: Object,
        required: false,
        default: () => {},
      },
      selectedValueDataKey: {
        type: String,
        required: false,
        default: '',
      },
      nestedInpuDataKey: {
        type: String,
        required: false,
        default: '',
      },
      options: {
        type: Array,
        required: false,
        default: () => [],
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false,
      },
      inline: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    computed: {
      inputDataFinal() {
        let { inputData } = this;
        if (!inputData) {
          inputData = this.selectedValueData;
        }
        return inputData;
      },
    },
  };
</script>

<style lang="scss">
  .form-group {
    &.inline {
      display: flex;
      align-items: center;
    }

    &__label {
      display: inline-block;
      margin-bottom: 15px;

      &.inline-child {
        margin-bottom: 0;
      }
    }

    &__label-required-mark {
      color: $text-red;
    }

    &__error-tip {
      margin-top: 15px;
    }
  }
</style>
