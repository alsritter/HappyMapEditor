/**
 * 显示的图层
 */
export enum DisplayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

/**
 * 砖块的信息
 */
export interface Tile {
  displayModel: DisplayLayer;
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
 * size 表示一个区块的宽高，这个块不要使用稀疏数组
 * 这个存储块大小确定下来就不能随便改了，它的大小位于常量那里
 */
export interface Block {
  x: number;
  y: number;
  size: number;
  data: number[][];
}
