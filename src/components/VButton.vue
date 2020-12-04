<!-- eslint-disable prettier/prettier -->
<template>
  <button
    class="btn"
    :class="{ clicked: isClickedAnimationActive }"
    @click="runClickedAnimation"
  >
    <slot></slot>
  </button>
</template>
<!-- eslint-enable -->

<script>
  import { delay } from '@/utils/helpers';

  export default {
    data() {
      return {
        isClickedAnimationActive: false,
      };
    },
    methods: {
      async runClickedAnimation() {
        this.isClickedAnimationActive = true;
        await delay(400);
        this.isClickedAnimationActive = false;
      },
    },
  };
</script>

<style lang="scss">
  .btn {
    padding: 15px;
    border: 1px solid $border-black;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, opacity 0.3s;

    &:hover,
    &:focus {
      color: $text-white;
      background-color: $bg-black;
      transition: background-color 0.3s, color 0.3s, opacity 0.3s;
    }

    &[disabled] {
      opacity: 0.3;
      transition: opacity 0.3s;

      &:hover,
      &:focus,
      &:active {
        color: inherit;
        background-color: inherit;
      }
    }

    &.clicked {
      opacity: 0.7;
      transition: opacity 0.3s;
    }
  }
</style>
