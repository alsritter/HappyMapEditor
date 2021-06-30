import * as Collections from 'typescript-collections';

/**
 * 显示的图层
 */
export enum displayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

/**
 * 砖块的信息
 */
export interface Tile {
  displayModel: displayLayer;
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
  spriteId: number;
  width: number;
  height: number;
}

/**
 * 区块
 * size 表示一个区块的大小，这个块不要使用稀疏数组
 */
export interface Block {
  x: number;
  y: number;
  size: number;
  data: number[][];
}

const blocks = {
  [displayLayer.FRONT]: new Array<Block>(),
  [displayLayer.MIDDLE]: new Array<Block>(),
  [displayLayer.BACKGROUND]: new Array<Block>()
};

const tiles = new Collections.Dictionary<string, Tile>();
const prefabs = new Collections.Dictionary<string, Prefab>();

export const initialState = {
  blocks,
  tiles,
  prefabs
};

export type MapState = typeof initialState;

export default initialState;
