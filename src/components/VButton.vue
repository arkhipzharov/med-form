<!-- eslint-disable prettier/prettier -->
<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
<!-- eslint-enable -->

<script>
  export default {};
</script>

<style lang="scss">
  .btn {
    padding: 15px;
    border: 1px solid $border-black;
    border-radius: 5px;

    &[disabled] {
      opacity: 0.3;
    }
  }
</style>
