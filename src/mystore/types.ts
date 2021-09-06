export type Point = {
  x: number;
  y: number;
};

export enum Layer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

/**
 * 这个是把通用的数据提取出来
 */
export class TileData {
  path: string;
  index: number;
  color: string;
  effectKeys: number[];
  tags: number[];

  constructor(path: string, index: number, color: string = '#FFF', effectKeys: number[] = [], tags: number[] = []) {
    this.path = path;
    this.index = index;
    this.color = color;
    this.effectKeys = effectKeys;
    this.tags = tags;
  }
}

export class Tile {
  layer: Layer;
  point: Point;
  data: TileData;

  /**
   *
   * @param path
   * @param index
   * @param layer 这里直接存 Layer 就无需分图层存了
   * @param color
   * @param effectKeys
   * @param tags
   */
  constructor(point: Point, layer: Layer, data: TileData) {
    this.point = point;
    this.data = data;
    this.layer = layer;
  }
}

export interface ICurrentTile {
  path: string;
  name: string;
  desc: string;
  index: number;
}

export interface ICurrentPrefab {
  path: string;
  name: string;
  desc: string;
  index: number;
  width: number;
  height: number;
}

// /**
//  * 区块
//  * size 表示一个区块的宽高，这个块不要使用稀疏数组
//  * 这个存储块大小确定下来就不能随便改了，它的大小位于常量那里
//  */
// export interface Block {
//   /**
//    * Block X 终点坐标
//    */
//   x: number;
//   /**
//    * Block Y 终点坐标
//    */
//   y: number;
//   size: number;
//   data: number[][];
// }

// // 这里存储块应该使用字典，根据 'x-y' 这个位置组合 key  取出块，所以需要对取的坐标规格化
// export interface IBlocks {
//   [Layer.FRONT]: Dictionary<string, Block>;
//   [Layer.MIDDLE]: Dictionary<string, Block>;
//   [Layer.BACKGROUND]: Dictionary<string, Block>;
// }

export enum ItemType {
  TILE = 'TILE',
  PREFAB = 'PREFAB'
}
