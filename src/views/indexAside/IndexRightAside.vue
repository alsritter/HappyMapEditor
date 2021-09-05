<template>
  <div class="index-aside">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>收藏的 Tile</span>
        </div>
      </template>
      <div><canvas class="current-tile"></canvas></div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>图层</span>
        </div>
      </template>
      <div></div>
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
.el-card {
  margin-bottom: 10px;
}
</style>
