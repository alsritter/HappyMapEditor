<template>
  <div class="inline-header">
    <div>
      <el-checkbox v-model="showGrid" label="显示网格"></el-checkbox>
      <el-checkbox v-model="showAxis" label="显示轴线"></el-checkbox>
    </div>
    <div v-if="store.state.itemType == 'TILE'">
      <el-radio v-model="brush" label="PEN">铅笔|B</el-radio>
      <el-radio v-model="brush" label="ERASER">橡皮|E</el-radio>
      <el-radio v-model="brush" label="PIPETA">滴灌|F</el-radio>
      <el-radio v-model="brush" label="AREA_PEN">选框笔|P</el-radio>
      <el-radio v-model="brush" label="AREA_ERASER">选框擦|U</el-radio>
    </div>
    <div v-else>
      <el-radio v-model="prefabModel" label="DRAW">绘制|Q</el-radio>
      <el-radio v-model="prefabModel" label="DELETE">删除|D</el-radio>
    </div>
  </div>
</template>

<script lang="ts">
import bus from '@/core/util/bus';
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/mystore';
import { ToolType, PrefabToolType } from '@/mystore/types';

export default defineComponent({
  setup() {
    const store = useStore();
    const showGrid = ref(true);
    const showAxis = ref(true);
    const brush = ref('PEN');
    const prefabModel = ref('DRAW');

    watch(showGrid, (newValue) => {
      bus.emit('refreshCanvas');
      store.action.canvasShowGrid(newValue);
    });

    watch(showAxis, (newValue) => {
      bus.emit('refreshCanvas');
      store.action.canvasShowAxis(newValue);
    });

    watch(brush, (value) => {
      store.action.currentTool(value as ToolType);
    });

    watch(prefabModel, (value) => {
      store.action.currentPrefabTool(value as PrefabToolType);
    });

    watch(
      () => store.getters.isDown_B(),
      (newValue) => {
        if (newValue) {
          store.action.currentTool(ToolType.PEN);
          brush.value = 'PEN';
        }
      }
    );

    watch(
      () => store.getters.isDown_E(),
      (newValue) => {
        if (newValue) {
          store.action.currentTool(ToolType.ERASER);
          brush.value = 'ERASER';
        }
      }
    );

    watch(
      () => store.getters.isDown_F(),
      (newValue) => {
        if (newValue) {
          store.action.currentTool(ToolType.PIPETA);
          brush.value = 'PIPETA';
        }
      }
    );

    watch(
      () => store.getters.isDown_P(),
      (newValue) => {
        if (newValue) {
          store.action.currentTool(ToolType.AREA_PEN);
          brush.value = 'AREA_PEN';
        }
      }
    );

    watch(
      () => store.getters.isDown_U(),
      (newValue) => {
        if (newValue) {
          store.action.currentTool(ToolType.AREA_ERASER);
          brush.value = 'AREA_ERASER';
        }
      }
    );

    return { showGrid, showAxis, brush, store, prefabModel };
  }
});
</script>

<style lang="scss" scoped>
$bgc: #cccbba;

.el-radio {
  height: 0px;
}

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
