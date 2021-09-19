<template>
  <div class="index-aside">
    <el-card class="selector-box">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="单砖块" name="tiles"><tile-list /></el-tab-pane>
        <el-tab-pane label="预制件" name="prefab"><prefab-list /></el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card class="info-box">
      <div>
        <div v-if="store.state.tile.path || store.state.prefab.path">
          <el-divider>选中道具</el-divider>
          <div v-if="store.state.itemType == 'TILE'">
            <el-row :gutter="24">
              <el-col :span="7"><el-image :src="store.state.tile.path"></el-image></el-col>
              <el-col :span="17">
                <div>
                  <div>编号：{{ store.state.tile.spriteId }}</div>
                  <br />
                  <div v-if="!store.state.tile.isCollect">
                    <div>名称：{{ store.state.tile.name }}</div>
                    <div>详情：{{ store.state.tile.desc }}</div>
                  </div>
                  <div v-show="store.state.tile.isCollect">
                    <effect-list />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row :gutter="24">
              <el-col :span="7"><el-image :src="store.state.prefab.path"></el-image></el-col>
              <el-col :span="17">
                <div>
                  <div>编号：{{ store.state.prefab.prefabId }}</div>
                  <div>名称：{{ store.state.prefab.name }}</div>
                  <div>详情：{{ store.state.prefab.desc }}</div>
                  <div>宽度：{{ store.state.prefab.width }}</div>
                  <div>高度：{{ store.state.prefab.height }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-divider>画布属性</el-divider>
        <span>x: {{ store.state.initPoint.x }}-</span>
        <span>y: {{ store.state.initPoint.y }}</span>
        &nbsp;&nbsp;
        <span>画布大小：{{ Math.round((store.state.canvasSize / 32) * 100) }} %</span>
      </div>
    </el-card>
    <el-card><tool-select /></el-card>
  </div>
</template>

<script lang="ts">
import bus from '@/core/util/bus';
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/mystore';

import EffectList from '@/components/effectList/EffectList.vue';
import TileList from '@/components/tileList/TileList.vue';
import PrefabList from '@/components/prefabList/PrefabList.vue';
import ToolSelect from '@/components/toolSelect/ToolSelect.vue';

export default defineComponent({
  components: {
    TileList,
    PrefabList,
    EffectList,
    ToolSelect
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

    return {
      activeName,
      store,
      // changeColor,
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

.el-image {
  margin: 5px;
  width: 70px;
  height: 70px;
}

.info-box {
  // width: 70%;
}
</style>
