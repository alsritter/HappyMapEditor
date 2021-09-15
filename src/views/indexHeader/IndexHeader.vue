<template>
  <div class="index-header">
    <!-- 限制元素堆积在中间 -->
    <div class="limit-box">
      <!-- 可以返回首页的logo -->
      <div class="logo" @click="GotoIndex"></div>
      <el-button size="mini" type="warning" @click="outputMapData">导出数据</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { expTiles, expInitial, expBg, expPrefabs, expTileData, downLoadFiles } from '@/core/util/iofile/exportdata';
import { useStore } from '@/mystore';

export default defineComponent({
  setup() {
    const store = useStore();

    function GotoIndex() {
      console.log('点击了 Log');
    }

    function outputMapData() {
      const data = {
        create_time: '2021-05-01T12:53Z',
        version: '1.1',
        author: 'alsritter',
        initial: expInitial(),
        background: expBg(store),
        prefabs: expPrefabs(store),
        tileData: expTileData(store),
        tiles: expTiles(store)
      };

      // const str = JSON.stringify(data);
      downLoadFiles(data, 'exportData.json');

      // console.log(str);
      // console.log(JSON.stringify(data));
      // let link = document.createElement('a');
      // link.download = 'exportData.json';
      // link.href = 'data:text/plain,' + str;
      // link.click();
    }

    return { GotoIndex, outputMapData };
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
