import { Block, MapState } from './map.state';
import { GetterTree } from 'vuex';

export type MapGetters = {
  // 根据坐标位置取得对应的 Block
  // 这种闭包的写法使用方式：https://github.com/vuejs/vuex/issues/456
  // 使用例 store.getters['map/getBlock'](1, 2)
  getBlock(state: MapState): (x: number, y: number) => Block;
};

const getters: GetterTree<MapState, MapState> & MapGetters = {
  getBlock: (state: MapState) => (x: number, y: number) => {
    console.log(x, y);
    // return state.blocks['BACKGROUND'][0];
    // 这里返回测试数据
    return {
      x: 10,
      y: 21,
      size: 2,
      data: [[]]
    };
  }
};

export default getters;
