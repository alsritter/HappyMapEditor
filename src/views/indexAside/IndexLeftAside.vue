<template>
  <div class="index-aside">
    <el-card class="box-card">
      <!-- <template #header>
        <div class="card-header">
          <span>选择 Tile</span>
        </div>
      </template> -->
      <!-- <canvas class="tile-selector"></canvas> -->
      <el-tabs type="card">
        <el-tab-pane label="单砖块" name="tiles">单砖块</el-tab-pane>
        <el-tab-pane label="预制件" name="second">预制件</el-tab-pane>
      </el-tabs>
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
.tile-selector {
  width: 100%;
  height: 780px;
  background-color: #56553f;
  margin-bottom: 18px;
}
</style>
