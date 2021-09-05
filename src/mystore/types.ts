import { Dictionary } from 'typescript-collections';

export type Point = {
  x: number;
  y: number;
};

export enum Layer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
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

/**
 * 砖块的信息
 */
export interface Tile {
  id: number;
  displayModel: Layer;
  // 通过 id 去另一个存储图片的 State 查找图片
  tileSpriteId: number;
  color: string;
  effectKeys: Array<number>;
  tags: Array<number>;
}

/**
 * 预制件的信息
 */
export interface Prefab {
  id: number;
  spriteId: number;
  width: number;
  height: number;
}

/**
 * 区块
 * size 表示一个区块的宽高，这个块不要使用稀疏数组
 * 这个存储块大小确定下来就不能随便改了，它的大小位于常量那里
 */
export interface Block {
  /**
   * Block X 终点坐标
   */
  x: number;
  /**
   * Block Y 终点坐标
   */
  y: number;
  size: number;
  data: number[][];
}

// 这里存储块应该使用字典，根据 'x-y' 这个位置组合 key  取出块，所以需要对取的坐标规格化
export interface IBlocks {
  [Layer.FRONT]: Dictionary<string, Block>;
  [Layer.MIDDLE]: Dictionary<string, Block>;
  [Layer.BACKGROUND]: Dictionary<string, Block>;
}

export enum ItemType {
  TILE = 'TILE',
  PREFAB = 'PREFAB'
}
