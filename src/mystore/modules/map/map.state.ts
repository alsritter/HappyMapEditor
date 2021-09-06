import { SortedMap } from 'sweet-collections';
import { Tile, TileData } from '@/mystore/types';

/**
 * Sorted Map 参考：https://www.cnblogs.com/lighten/p/7411935.html
 * https://npm.io/package/sweet-collections
 *
 * 存储结构（满足 Map 和 x-y 范围查找 subMap）
 * 这里选择 Y 轴作为入口点是因为游戏地图一般是平的，所以 Y 轴比较少
 *
 * YTreeMap ->
 * key: y
 * value: XTreeMap
 * XTreeMap ->
 * key: x
 * value: Tile
 */

export interface IMapState {
  mapTiles: SortedMap<number, SortedMap<number, Tile>>;
  /**
   * 这个用于缓存引入类型，每次插入之前先检查缓存里面是否存在这个 Tile
   * 如果存在则直接返回这个 Tile 的引用，它的 Key 是 Tile 的 index
   */
  tileInstancesCache: Map<number, TileData>;
}

export function initMap() {
  return new SortedMap<number, SortedMap<number, Tile>>((a: number, b: number) => a - b);
}
