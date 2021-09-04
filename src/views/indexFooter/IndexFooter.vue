<template>
  <div class="index-footer">© 2021 Alsritter</div>
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
$bgc: #f9f7d8;

.index-footer {
  clear: both;
  top: -10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $bgc;
  height: 100%;
}
</style>
