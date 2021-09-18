<template>
  <!-- <div class="coordinate">x:{{ currentX }}, y: {{ currentY }}</div> -->
  <el-card shadow="hover">
    <div class="map__container">
      <img class="bg_img" :src="bgUrl" :width="width" :height="height" />
      <!-- GRID_CANVAS 就是顶层用来刷新网格的那个画布，因为经常更新，所以这里单独提取出来 -->
      <canvas id="GRID_CANVAS" ref="GRID_CANVAS" class="map" :width="width" :height="height" @wheel.prevent="scrollBarWheel"></canvas>

      <!-- 下面这些就是用来绘制 Tile 的画布 -->
      <canvas id="FRONT" ref="FRONT" class="map" :width="width" :height="height"></canvas>
      <canvas id="MIDDLE" ref="MIDDLE" class="map" :width="width" :height="height"></canvas>
      <canvas id="BACKGROUND" ref="BACKGROUND" class="map" :width="width" :height="height"></canvas>

      <!-- 预制件的画布 -->
      <canvas id="PREFAB" ref="PREFAB_CANVAS" class="map" :width="width" :height="height"></canvas>
      <!-- 显示当前选中的笔刷 -->
      <canvas id="BRUSH" ref="BRUSH_CANVAS" class="map" :width="width" :height="height"></canvas>
    </div>
  </el-card>
</template>

<script lang="ts" src="./MainCanvas.ts"></script>
<style lang="less" scoped src="./MainCanvas.scss"></style>
