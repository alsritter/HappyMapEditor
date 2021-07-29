<template>
  <div>
    <span>打开/关闭 WebSocket 连接</span>
    <input id="checkbox" v-model="checked" type="checkbox" />
    <label for="checkbox">{{ checked }}</label>
  </div>
</template>

<script lang="ts" src="./WebSocket.ts"></script>
