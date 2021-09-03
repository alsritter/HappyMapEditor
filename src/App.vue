<template>
  <div id="app">
    <!-- <webSocket /> -->
    <!-- <MainCanvas /> -->
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main><MainCanvas /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, onUpdated } from 'vue';
// import { useStore } from 'vuex';
import { useStore } from '@/use/useStore';
import { AllActionTypes } from '@/store/action-types';
import MainCanvas from './components/MainCanvas/MainCanvas.vue';
// import WebSocket from './components/WebSocket/WebSocket.vue';
// import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainCanvas
  },
  setup() {
    const store = useStore();
    const KeyGetters = computed(() => {
      return {
        isRecall: store.getters.isRecall,
        selectKeys: store.getters.selectKeys,
        pressedKeys: store.getters.selectPressedKeys,
        isAlt: store.getters.isAlt
      };
    });

    // const tmp = computed(() => store.getters.selectKeys);

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
        // store.dispatch('keyboard/KEY_DOWN', e.key);
        // console.log(e.key);

        store.dispatch(AllActionTypes.KEYBOARD_KEY_DOWN, e.key);
        methods.onShortcutKey();
      },
      onKeyUp(e: KeyboardEvent) {
        e.preventDefault();
        // store.dispatch('keyboard/KEY_UP', e.key);
        store.dispatch(AllActionTypes.KEYBOARD_KEY_UP, e.key);
      },
      // 监听快捷键
      onShortcutKey() {
        // console.log(tmp);
        if (KeyGetters.value.isRecall) {
          console.log('按下了撤回键');
        }
      }
    };

    const update = {
      refresh() {
        // store.dispatch('keyboard/REFRESH', undefined);
        store.dispatch(AllActionTypes.KEYBOARD_REFRESH);
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
    width: 90%;
    max-width: 1400px;
    margin: 15px auto;
    display: flex;
  }
  .main-left {
    flex: 1;
    margin-right: 15px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

// body > .el-container {
//   margin-bottom: 40px;
// }
</style>
