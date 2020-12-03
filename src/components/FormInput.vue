<!-- eslint-disable prettier/prettier -->
<template>
  <div class="form-input">
    <input
      v-if="type === 'text'"
      :id="inputData.idAndDataKey"
      v-model.trim="validateObj.$model"
      class="form-input__input"
      :placeholder="inputData.placeholder"
      autocomplete="off"
    >
    <input
      v-else-if="type === 'number'"
      :id="inputData.idAndDataKey"
      v-model.number="validateObj.$model"
      :type="type"
      class="form-input__input"
      :placeholder="inputData.placeholder"
      autocomplete="off"
    >
    <input
      v-else-if="type === 'radio'"
      :id="inputData.id"
      class="form-input__input"
      :type="type"
      :value="inputData.labelAndValue"
      :checked="selectedValueData.value === inputData.labelAndValue"
      @change="$evBus.$emit('changed-value-or-values', {
        dataKey: selectedValueDataKey,
        newValue: $event.target.value,
      })"
    >
    <input
      v-else-if="type === 'checkbox'"
      :id="inputData.idAndDataKey"
      class="form-input__input"
      :type="type"
      :checked="inputData.value"
      @change="$evBus.$emit('changed-value-or-values', {
        dataKey: inputData.idAndDataKey,
        newValue: $event.target.checked,
      })"
    >
  </div>
</template>
<!-- eslint-enable -->

<script>
  export default {
    props: {
      validateObj: {
        type: Object,
        required: false,
        default: () => {},
      },
      inputData: {
        type: Object,
        required: true,
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
      type: {
        type: String,
        required: false,
        default: 'text',
      },
    },
  };
</script>

<style lang="scss">
  .form-input {
    &__input {
      display: block;
      width: 100%;
      padding: 15px;
      border: 1px solid $border-grey;
      border-radius: 5px;

      &[type='radio'],
      &[type='checkbox'] {
        width: 20px;
        height: 20px;
        margin-right: 7px;
      }

      &::placeholder {
        color: $text-grey;
      }
    }
  }
</style>
