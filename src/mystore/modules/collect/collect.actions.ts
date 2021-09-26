import { ICollectState } from './collect.state';

/**
 * 设置颜色
 */
export function collectTileColor(state: ICollectState) {
  return (key: string, color: string) => {
    const tileData = state.tileInstancesCache.get(key);
    if (tileData && color) tileData.color = color;
  };
}

// /**
//  * 设置这个 Tile 的效果
//  */
// export function collectTileEffect(state: ICollectState) {
//   return (key: string, effects: string[]) => {
//     const tileData = state.tileInstancesCache.get(key);
//     if (tileData && effects) {
//       tileData.effectKeys = effects;
//     }
//   };
// }

// /**
//  * 设置这个 Tile 的效果
//  */
// export function collectTileTags(state: ICollectState) {
//   return (key: string, tags: string[]) => {
//     const tileData = state.tileInstancesCache.get(key);
//     if (tileData && tags) {
//       tileData.tags = tags;
//     }
//   };
// }
