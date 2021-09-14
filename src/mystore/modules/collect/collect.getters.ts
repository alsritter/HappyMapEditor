import { ICollectState } from './collect.state';

/**
 * 取得全部收藏的 Tile
 */
export function getAllCollectTile(state: ICollectState) {
  return () => {
    return [...state.tileInstancesCache.values()];
  };
}

export function getCollectTileByKey(state: ICollectState) {
  return (key: string) => {
    return state.tileInstancesCache.get(key);
  };
}
