<template>
  <div class="inline-header"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
$bgc: #888778;

.inline-header {
  width: 100%;
  min-height: 50px;
  background-color: $bgc;
  box-sizing: border-box;
  padding: 0 70px 0 70px;
  &::after {
    content: '';
    display: block;
    clear: left;
  }
}
</style>
