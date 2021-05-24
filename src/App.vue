<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <MainCanvas />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
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

    //FIXME: 注意在 Vue3 中的 composition api 无法使用 mapGetters，因为它依赖于 this
    // 具体参考这个 issue https://github.com/vuejs/vuex/issues/1948
    // 所以下面这种写法用不了

    // const test = computed(() => {
    //   return {
    //     ...mapGetters([
    //       'keyboard/isRecall'
    //       // ...
    //     ])
    //   };
    // });

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
