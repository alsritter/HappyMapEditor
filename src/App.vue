<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <MainCanvas />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, onUpdated } from 'vue';
import { useStore } from 'vuex';
import MainCanvas from './components/MainCanvas/MainCanvas.vue';
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
        isRecall: store.getters['keyboard/isRecall'],
        selectKeys: store.getters['keyboard/selectKeys'],
        pressedKeys: store.getters['keyboard/selectPressedKeys']
      };
    });

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
        store.dispatch('keyboard/KEY_DOWN', e.key);
        methods.onShortcutKey();
      },
      onKeyUp(e: KeyboardEvent) {
        e.preventDefault();
        store.dispatch('keyboard/KEY_UP', e.key);
      },
      // 监听快捷键
      onShortcutKey() {
        if (KeyGetters.value.isRecall) {
          console.log('按下了撤回键');
        }
      }
    };

    const update = {
      refresh() {
        store.dispatch('keyboard/REFRESH', undefined);
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
