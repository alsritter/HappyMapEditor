<template>
  <div class="index-aside">
    <el-card class="selector-box">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="单砖块" name="tiles"><tile-list /></el-tab-pane>
        <el-tab-pane label="预制件" name="prefab"><prefab-list /></el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card>
      <div>
        <el-divider>选中道具</el-divider>
        <div v-if="store.state.itemType == 'TILE'">
          <el-image :src="store.state.tile.path"></el-image>
          <div>编号：{{ store.state.tile.spriteId }}</div>
          <br />
          <div v-if="store.state.tile.isCollect">
            <div class="block">
              <!-- <span class="demonstration">选择颜色：</span> -->
              <el-color-picker v-model="color" color-format="hex" show-alpha @change="changeColor(store.state.tile.key)"></el-color-picker>
            </div>
          </div>
          <div v-else>
            <div>名称：{{ store.state.tile.name }}</div>
            <div>详情：{{ store.state.tile.desc }}</div>
          </div>
        </div>
        <div v-else>
          <el-image :src="store.state.prefab.path"></el-image>
          <div>编号：{{ store.state.prefab.prefabId }}</div>
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
import bus from '@/core/util/bus';
import { defineComponent, ref, watch } from 'vue';
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
    const color = ref('#fff');

    watch(
      () => store.state.tile.key,
      (value) => {
        const ct = store.getters.getCollectTileByKey(store.state.tile.key)?.color;
        if (ct) {
          color.value = ct;
        }
      }
    );

    function changeColor(key: string) {
      store.action.collectTileColor(key, color.value);
      bus.emit('refreshCanvas');
    }

    return {
      activeName,
      store,
      changeColor,
      color
    };
  }
});
</script>

<style lang="scss" scoped>
.index-aside {
  width: 450px;
}

.el-card {
  margin-bottom: 10px;
}
</style>
