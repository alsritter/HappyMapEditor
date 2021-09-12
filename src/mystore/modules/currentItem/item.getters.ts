import { IItemState } from './item.state';
import { Layer } from '@/mystore/types';

/**
 * 判断当前图层是否显示
 */
export function currentLayerIsDisplayed(state: IItemState) {
  return (layer: Layer) => {
    switch (layer) {
      case Layer.FRONT:
        return state.displayLayers.frontShow;
      case Layer.MIDDLE:
        return state.displayLayers.middleShow;
      case Layer.BACKGROUND:
        return state.displayLayers.backgroundShow;
    }

    return true;
  };
}
