import { TileData } from '@/mystore/types';

export interface ICollectState {
  /**
   * 这个用于缓存引入类型，每次插入之前先检查缓存里面是否存在这个 Tile
   * 如果存在则直接返回这个 Tile 的引用，它的 Key 是 Tile 的 index
   */
  tileInstancesCache: Map<string, TileData>;
}
