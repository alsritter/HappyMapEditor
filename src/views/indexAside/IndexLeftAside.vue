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
    <el-card class="select-bg">
      <el-row :gutter="24">
        <el-col :span="8"><background-select /></el-col>
        <el-col v-if="store.state.bgName" :span="14">
          <el-divider>背景信息</el-divider>
          <span>当前选中背景： {{ store.state.bgName }}</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import bus from '@/core/util/bus';
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/mystore';

import BackgroundSelect from '@/components/backgroundSelect/BackgroundSelect.vue';
import TileList from '@/components/tileList/TileList.vue';
import PrefabList from '@/components/prefabList/PrefabList.vue';

export default defineComponent({
  components: {
    TileList,
    PrefabList,
    BackgroundSelect
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

    // function getHexColor(color: string) {
    //   const values = color
    //     .replace(/rgba?\(/, '')
    //     .replace(/\)/, '')
    //     .replace(/[\s+]/g, '')
    //     .split(',');
    //   const a = parseFloat(values[3] || 1),
    //     r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    //     g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    //     b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

    //   return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2) + ('0' + a.toString(16)).slice(-2);
    // }

    // function changeColor(key: string) {
    //   console.log(getHexColor(color.value));

    //   store.action.collectTileColor(key, getHexColor(color.value));
    //   bus.emit('refreshCanvas');
    // }

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

.background-select {
  display: inline;
}
</style>
