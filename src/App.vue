<template>
  <el-container>
    <el-header height="45px"><index-header /></el-header>
    <el-container>
      <el-aside width="450px"><index-left-aside /></el-aside>
      <el-container>
        <!-- <el-header height="30px"></el-header> -->
        <el-main><router-view></router-view></el-main>
      </el-container>
      <el-aside width="300px"><index-right-aside /></el-aside>
    </el-container>
    <el-footer><index-footer /></el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, onUpdated } from 'vue';
// import { useStore } from 'vuex';
import { useStore } from '@/mystore';
import IndexHeader from '@/views/indexHeader/IndexHeader.vue';
import IndexLeftAside from '@/views/indexAside/IndexLeftAside.vue';
import IndexRightAside from '@/views/indexAside/IndexRightAside.vue';
import IndexFooter from '@/views/indexFooter/IndexFooter.vue';
import { inputData } from '@/core/util/iofile/inpdata';
import { ElMessage } from 'element-plus';
import { expTiles, expInitial, expBg, expPrefabs, expTileData } from '@/core/util/iofile/exportdata';

export default defineComponent({
  name: 'App',
  components: {
    // MainCanvas,
    IndexHeader,
    IndexLeftAside,
    IndexRightAside,
    IndexFooter
  },
  setup() {
    const store = useStore();
    const methods = {
      // 这里进行全局初始化
      init() {
        this.addEvents();
        //this.$store.dispatch('maps/MAPS_REQUEST');
        const map = localStorage.getItem('localMapData');
        if (map) {
          inputData(map);
        }
        window.oncontextmenu = function (e: any) {
          //取消默认的浏览器自带右键 很重要！！
          e.preventDefault();
        };
      },
      addEvents() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
      },
      onKeyDown(e: KeyboardEvent) {
        e.preventDefault();
        store.action.keyboardKeyDown(e.key);
        methods.onShortcutKey();
      },
      onKeyUp(e: KeyboardEvent) {
        e.preventDefault();
        store.action.keyboardKeyUp(e.key);
      },
      // 监听快捷键
      onShortcutKey() {
        if (store.getters.isRecall()) {
          // 按下了撤回键
        }
        // 按下保存
        if (store.getters.isSave()) {
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
          // downLoadFiles(data, 'exportData.json');
          localStorage.setItem('localMapData', JSON.stringify(data));
          ElMessage.success('保存成功');
        }
      }
    };

    const update = {
      refresh() {
        store.action.keyboardRefresh();
      }
    };

    onUpdated(() => {
      update.refresh();
    });

    onMounted(() => {
      methods.init();
    });
  }
});
</script>

<style lang="scss">
/* 此处一定要加上~，在dom中使用也要加~ */
@import url('@/assets/css/normalize.css');

// pc端
@media (min-width: $action-width) {
  main {
    width: 97%;
    max-width: 1400px;
    // margin: 15px auto;
    display: flex;
  }
  .main-left {
    flex: 1;
    margin-right: 15px;
  }
}

.el-header {
  --el-header-padding: 0 0px !important;
}

.el-main {
  --el-main-padding: 0 !important;
}
</style>
