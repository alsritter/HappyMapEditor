<template>
  <div class="index-header">
    <!-- 限制元素堆积在中间 -->
    <div class="limit-box">
      <!-- 可以返回首页的logo -->
      <div class="logo" @click="GotoIndex"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function GotoIndex() {
      console.log('点击了 Log');
    }

    return { GotoIndex };
  }
});
</script>

<style lang="scss" scoped>
// 定义背景颜色
$bgc: #f9f7d8;

.index-header {
  width: 100%;
  min-height: 30px;
  background-color: $bgc;
  box-sizing: border-box;
  padding: 0 70px 0 70px;
  &::after {
    content: '';
    display: block;
    clear: left;
  }
}

.limit-box {
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  float: left;
  height: 30px;
  width: 150px;
  cursor: pointer;
  background: url('@/assets/img/logo.png') no-repeat center center;
  background-size: 50px;
}
</style>
