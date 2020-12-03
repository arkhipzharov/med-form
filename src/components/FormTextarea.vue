<!-- eslint-disable prettier/prettier -->
<template>
  <textarea
    v-model.trim="validateObj.$model"
    class="form-textarea"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    :placeholder="inputData.placeholder"
    @change="$evBus.$emit('changed-value-or-values', {
      dataKey: inputData.idAndDataKey,
      newValue: $event.target.value,
    })"
  ></textarea>
</template>
<!-- eslint-disable prettier/prettier -->

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
    },
  };
</script>

<style lang="scss">
  .form-textarea {
    display: block;
    width: 100%;
    height: 80px;
    padding: 15px;
    border: 1px solid $border-grey;
    border-radius: 5px;

    &::placeholder {
      color: $text-grey;
    }
  }
</style>
