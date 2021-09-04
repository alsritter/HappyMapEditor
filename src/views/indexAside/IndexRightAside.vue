<template>
  <div class="index-aside">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>选择项目</span>
        </div>
      </template>
      <div>选择项目</div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>已经选择的 Tile</span>
        </div>
      </template>
      <div><canvas class="current-tile"></canvas></div>
    </el-card>
  </div>
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
.current-tile {
  width: 100%;
  height: 400px;
  background-color: #56553f;
  margin-bottom: 18px;
}
</style>
