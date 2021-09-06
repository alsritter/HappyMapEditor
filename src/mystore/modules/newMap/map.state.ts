import { SortedMap } from 'sweet-collections';
import { Point, Layer } from '@/mystore/types';

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

// const yMap = new SortedMap<number, SortedMap<number, Tile>>((a: number, b: number) => a - b);

// const xMap = new SortedMap<number, Tile>((a: number, b: number) => a - b);

// xMap.set(2, new Tile({ x: 2, y: 1 }, 'path02', 1));
// xMap.set(3, new Tile({ x: 3, y: 2 }, 'path03', 2));
// xMap.set(5, new Tile({ x: 5, y: 3 }, 'path05', 3));
// xMap.set(6, new Tile({ x: 6, y: 4 }, 'path06', 4));
// xMap.set(4, new Tile({ x: 4, y: 5 }, 'path04', 5));
// xMap.set(1, new Tile({ x: 1, y: 6 }, 'path01', 6));

// yMap.forEach((key, value) => {
//   console.log(key, value);
// });

export class Tile {
  path: string;
  index: number;
  color: string;
  effectKeys: number[];
  tags: number[];
  layer: Layer;

  /**
   *
   * @param path
   * @param index
   * @param layer 这里直接存 Layer 就无需分图层存了
   * @param color
   * @param effectKeys
   * @param tags
   */
  constructor(path: string, index: number, layer: Layer, color: string = '#FFF', effectKeys: number[] = [], tags: number[] = []) {
    this.path = path;
    this.index = index;
    this.color = color;
    this.effectKeys = effectKeys;
    this.tags = tags;
    this.layer = layer;
  }
}

export interface IMapState {
  mapTiles: SortedMap<number, SortedMap<number, Tile>>;
}

export function initMap() {
  return new SortedMap<number, SortedMap<number, Tile>>((a: number, b: number) => a - b);
}
