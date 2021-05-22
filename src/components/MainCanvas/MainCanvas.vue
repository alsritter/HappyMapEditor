<template>
  <div class="map__container">
    <canvas id="FRONT" class="map" ref="mapCanvas" :width="width" :height="height" @wheel.prevent="scrollBarWheel"></canvas>
    <canvas id="MIDDLE" class="map" :width="width" :height="height"></canvas>
    <canvas id="BACKGROUND" class="map" :width="width" :height="height"></canvas>
  </div>
</template>

<script lang="ts" src="./MainCanvas.ts"></script>
<style lang="less" scoped src="./MainCanvas.less"></style>
