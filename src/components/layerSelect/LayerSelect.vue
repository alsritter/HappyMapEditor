<template>
  <div id="showType">
    <!-- <div class="title">选择修改的图层</div> -->
    <el-divider>选择修改的层</el-divider>
    <br />
    <input id="s-front" v-model="layer" type="radio" checked="true" name="layerRadio" value="0" />
    <label for="s-front">前景装饰</label>

    <input id="s-middle" v-model="layer" type="radio" name="layerRadio" value="1" />
    <label for="s-middle">瓦片层</label>

    <input id="s-background" v-model="layer" type="radio" name="layerRadio" value="2" />
    <label for="s-background">背景装饰</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/mystore';
import { Layer } from '@/mystore/types';

export default defineComponent({
  setup() {
    const store = useStore();
    const layer = ref('0');
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
      layer
    };
  }
});
</script>

<style lang="scss" scoped>
#showType {
  // background-color: rgb(34, 34, 34);
  // padding: 15px;
  // border-top-width: 1px;
  // border-top-color: #eeeeee;
  // border-top-style: inset;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // .title {
  //   border-radius: 3px;
  //   border-top-width: 1px;
  //   border-top-color: #eeeeee;
  //   border-top-style: inset;

  //   border-bottom-width: 2px;
  //   border-bottom-color: rgb(104, 33, 33);
  //   border-bottom-style: inset;

  //   height: 10%;
  //   background-color: rgb(230, 81, 81);
  //   box-shadow: 2px 2px 3px rgba(27, 27, 27, 0.76);
  //   line-height: 50px;
  //   text-align: center;
  //   font-size: 13pt;
  // }

  input {
    display: none;
    z-index: 10;
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
}
</style>
