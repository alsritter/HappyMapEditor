<template>
  <div class="index-aside">
    <el-card class="selector-box">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="单砖块" name="tiles"><tile-list /></el-tab-pane>
        <el-tab-pane label="预制件" name="prefab"><prefab-list /></el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card>
      <div>
        <el-divider>选中道具</el-divider>
        <div v-if="store.state.itemType == 'TILE'">
          <el-image :src="store.state.tile.path"></el-image>
          <div>编号：{{ store.state.tile.index }}</div>
          <div>名称：{{ store.state.tile.name }}</div>
          <div>详情：{{ store.state.tile.desc }}</div>
        </div>
        <div v-else>
          <el-image :src="store.state.prefab.path"></el-image>
          <div>编号：{{ store.state.prefab.index }}</div>
          <div>名称：{{ store.state.prefab.name }}</div>
          <div>详情：{{ store.state.prefab.desc }}</div>
          <div>宽度：{{ store.state.prefab.width }}</div>
          <div>高度：{{ store.state.prefab.height }}</div>
        </div>

        <el-divider>画布属性</el-divider>
        <span>x: {{ store.state.initPoint.x }}-</span>
        <span>y: {{ store.state.initPoint.y }}</span>
        &nbsp;&nbsp;
        <span>画布大小：{{ Math.round((store.state.canvasSize / 32) * 100) }} %</span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/mystore';
import TileList from '@/components/tileList/TileList.vue';
import PrefabList from '@/components/prefabList/PrefabList.vue';

export default defineComponent({
  components: {
    TileList,
    PrefabList
  },
  setup() {
    const store = useStore();
    const activeName = ref('tiles');

    return {
      activeName,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
// .tile-selector {
//   width: 100%;
//   height: 780px;
//   background-color: #56553f;
//   margin-bottom: 18px;
// }

.index-aside {
  width: 450px;
}

.el-card {
  margin-bottom: 10px;
}
</style>
