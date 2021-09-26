<template>
  <div id="showType">
    <!-- <div class="title">选择修改的图层</div> -->
    <el-divider>选择修改的层</el-divider>
    <br />

    <!-- 图层显示 -->
    <div class="layer-show">
      <el-checkbox v-model="display.prefabShow"></el-checkbox>
      <el-checkbox v-model="display.frontShow"></el-checkbox>
      <el-checkbox v-model="display.middleShow"></el-checkbox>
      <el-checkbox v-model="display.backgroundShow"></el-checkbox>
    </div>

    <div class="layer-select">
      <input type="radio" name="layerRadio" />
      <label id="s-prefab">预制件</label>

      <input id="s-front" v-model="layer" type="radio" name="layerRadio" value="0" />
      <label for="s-front">前景装饰</label>

      <input id="s-middle" v-model="layer" type="radio" checked="true" name="layerRadio" value="1" />
      <label for="s-middle">瓦片层</label>

      <input id="s-background" v-model="layer" type="radio" name="layerRadio" value="2" />
      <label for="s-background">背景装饰</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, toRefs } from 'vue';
import { useStore } from '@/mystore';
import { Layer } from '@/mystore/types';

export default defineComponent({
  setup() {
    const store = useStore();
    const layer = ref('0');
    const display = reactive({
      prefabShow: true,
      frontShow: true,
      middleShow: true,
      backgroundShow: true
    });

    watch(display, () => {
      store.action.currentDisplayLayer(display);
    });

    watch(layer, () => {
      switch (layer.value) {
        case '0':
          store.action.canvasCurrentLayer(Layer.FRONT);
          break;
        case '1':
          store.action.canvasCurrentLayer(Layer.MIDDLE);
          break;
        case '2':
          store.action.canvasCurrentLayer(Layer.BACKGROUND);
          break;
      }
    });

    return {
      layer,
      display
    };
  }
});
</script>

<style lang="scss" scoped>
#showType {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // display: flex;

  input {
    display: none;
    z-index: 10;
  }

  .layer-show {
    float: left;
  }

  input:checked + label {
    background: #5bc0de;
    color: #fff;
  }

  label {
    background: #eee;
    width: 100%;
    height: 30px;
    display: block;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  #s-prefab {
    background: #b5bdbf;
    color: #eee;
  }
}
</style>
