<template>
  <!-- <index-header /> -->
  <!-- <main> -->
  <!-- <MainCanvas /> -->
  <!-- <router-view class="main-left"></router-view> -->
  <!-- <index-aside class="main-right" /> -->
  <!-- </main> -->
  <!-- <index-footer /> -->

  <el-container>
    <el-header height="50px"><index-header /></el-header>
    <el-container>
      <el-aside width="450px"><index-left-aside /></el-aside>
      <el-container>
        <el-header height="50px"><inline-header /></el-header>
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
import InlineHeader from '@/views/indexHeader/inlineHeader/InlineHeader.vue';
import IndexLeftAside from '@/views/indexAside/IndexLeftAside.vue';
import IndexRightAside from '@/views/indexAside/IndexRightAside.vue';
import IndexFooter from '@/views/indexFooter/IndexFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    // MainCanvas,
    IndexHeader,
    IndexLeftAside,
    IndexRightAside,
    IndexFooter,
    InlineHeader
  },
  setup() {
    const store = useStore();
    const methods = {
      // 这里进行全局初始化
      init() {
        this.addEvents();
        //this.$store.dispatch('maps/MAPS_REQUEST');
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
        // console.log(tmp);
        if (store.getters.isRecall()) {
          console.log('按下了撤回键');
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
    margin: 15px auto;
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
