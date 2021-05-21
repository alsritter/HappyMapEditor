<template>
  <canvas id="testCanvas" width="500" height="500" @wheel.prevent="scrollBarWheel"></canvas>
</template>

<script lang="ts" src="./HelloWorld.ts"></script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
