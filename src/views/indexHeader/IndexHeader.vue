<template>
  <div class="index-header">
    <!-- 限制元素堆积在中间 -->
    <div class="limit-box">
      <!-- 可以返回首页的logo -->
      <!-- <div class="logo" @click="gotoIndex"></div> -->
      <el-button size="mini" type="warning" @click="clearLocal">清空本地数据</el-button>
      <el-button size="mini" type="primary" @click="outputMapData">导出数据</el-button>
      <el-button size="mini" @click="openUnity">打开 Unity</el-button>
      <file-reader @load="inputMapData"></file-reader>
      <el-dialog v-model="dialogVisible" width="1000px">
        <embed-unity />
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { expTiles, expInitial, expBg, expPrefabs, expTileData, downLoadFiles } from '@/core/util/iofile/exportdata';
import { inputData } from '@/core/util/iofile/inpdata';
import { useStore } from '@/mystore';
import { ElMessage } from 'element-plus';
import FileReader from '@/components/textReader/FileReader.vue';
import EmbedUnity from '@/components/embedUnity/EmbedUnity.vue';
import bus from '@/core/util/bus';

export default defineComponent({
  components: {
    // MainCanvas,
    FileReader,
    EmbedUnity
  },
  setup() {
    const store = useStore();
    const dialogVisible = ref(false);

    function inputMapData(value: string) {
      // const map = JSON.parse(value);
      // console.log(map);
      inputData(value);
    }

    function gotoIndex() {
      // console.log('点击了 Log');
    }

    function clearLocal() {
      localStorage.removeItem('localMapData');
    }

    function outputMapData() {
      if (!store.state.bgUrl) {
        ElMessage.error('请先选择一个背景图片');
        return;
      }

      const data = {
        create_time: '2021-05-01T12:53Z',
        version: '1.1',
        author: 'alsritter',
        initial: expInitial(),
        background: expBg(),
        prefabs: expPrefabs(),
        tileData: expTileData(),
        tiles: expTiles()
      };
      downLoadFiles(data, 'exportData.json');
    }

    function openUnity() {
      //
      bus.emit('unityRefresh');
      dialogVisible.value = true;
    }

    return { gotoIndex, outputMapData, inputMapData, clearLocal, openUnity, dialogVisible };
  }
});
</script>

<style lang="scss" scoped>
// 定义背景颜色
$bgc: #e9e9e9;

.index-header {
  width: 100%;
  min-height: 30px;
  background-color: $bgc;
  box-sizing: border-box;
  padding: 0 20px 0 20px;
  &::after {
    content: '';
    display: block;
    clear: left;
  }
}

.limit-box {
  // max-width: 1400px;
  margin: 0 auto;
}

// .logo {
//   float: left;
//   height: 30px;
//   width: 150px;
//   cursor: pointer;
//   background: url('@/assets/img/logo.png') no-repeat center center;
//   background-size: 50px;
// }

label.text-reader {
  margin-left: 10px;
}
</style>
