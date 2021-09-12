import { Tile, TileData, PrefabData, Prefab, Block } from '@/mystore/types';
import TreeMap from 'ts-treemap';

/**
 * Sorted Map 参考：
 * https://www.cnblogs.com/lighten/p/7411935.html
 * https://npm.io/package/sweet-collections
 * 当前：
 * https://github.com/yuyasvx/ts-treemap
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
  mapTiles: TreeMap<number, TreeMap<number, Tile>>;
  mapBlocks: TreeMap<number, TreeMap<number, Block>>;
  /**
   * 对应 Block 内部的 Prefab Index
   */
  blockInPrefabCount: TreeMap<number, TreeMap<number, Set<number>>>;
  /**
   * 这个用于缓存引入类型，每次插入之前先检查缓存里面是否存在这个 Tile
   * 如果存在则直接返回这个 Tile 的引用，它的 Key 是 Tile 的 index
   */
  tileInstancesCache: Map<number, TileData>;
  prefabInstancesCache: Map<number, PrefabData>;
  prefabInstances: Map<number, Prefab>;
}

export function initTileMap() {
  return new TreeMap<number, TreeMap<number, Tile>>((a: number, b: number) => a - b);
}

export function initBlockMap() {
  return new TreeMap<number, TreeMap<number, Block>>((a, b) => a - b);
}

export function initPrefabCountMap() {
  return new TreeMap<number, TreeMap<number, Set<number>>>((a, b) => a - b);
}
