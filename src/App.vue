<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <MainCanvas />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, onUpdated } from 'vue';
// import { useStore } from 'vuex';
import { useStore } from '@/use/useStore';
import { AllActionTypes } from '@/store/action-types';
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
