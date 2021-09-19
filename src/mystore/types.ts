export type Point = {
  x: number;
  y: number;
};

/**
 * 区块
 * size 表示一个区块的宽高，这个块不要使用稀疏数组
 * 这个存储块大小确定下来就不能随便改了，它的大小位于常量那里
 */
export class Block {
  /**
   * Block X 终点坐标
   */
  x: number;
  /**
   * Block Y 终点坐标
   */
  y: number;
  /**
   * 里面存储的是 index
   */
  data: number[][];

  constructor(x: number, y: number, data: number[][]) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

export enum Layer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

/**
 * 这个是把通用的数据提取出来
 */
export class TileData {
  image: HTMLImageElement | null;
  url: string;
  key: string;
  layer: Layer;
  tileSpriteId: string;
  color: string;

  constructor(key: string, layer: Layer, tileSpriteId: string, url: string, image: HTMLImageElement | null = null, color: string = '#ffffff00') {
    this.image = image;
    this.url = url;
    this.key = key;
    this.layer = layer;
    this.tileSpriteId = tileSpriteId;
    this.color = color;
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

export class PrefabData {
  image: HTMLImageElement | null;
  prefabId: string;
  width: number;
  height: number;

  constructor(prefabId: string, width: number, height: number, image: HTMLImageElement | null = null) {
    this.prefabId = prefabId;
    this.width = width;
    this.height = height;
    this.image = image;
  }
}

export class Prefab {
  point: Point;
  data: PrefabData;

  constructor(point: Point, data: PrefabData) {
    this.point = point;
    this.data = data;
  }
}

export interface ICurrentTile {
  isCollect: boolean;
  path: string;
  name: string;
  desc: string;
  spriteId: string;
  key: string;
  image: HTMLImageElement | null;
}

export interface ICurrentPrefab {
  path: string;
  name: string;
  desc: string;
  prefabId: string;
  width: number;
  height: number;
  image: HTMLImageElement | null;
}

export enum ItemType {
  TILE = 'TILE',
  PREFAB = 'PREFAB'
}

export enum ToolType {
  PEN = 'PEN',
  ERASER = 'ERASER',
  PIPETA = 'PIPETA',
  AREA_PEN = 'AREA_PEN',
  AREA_ERASER = 'AREA_ERASER',
  START = 'START'
}

export enum PrefabToolType {
  DRAW = 'DRAW',
  DELETE = 'DELETE'
}

/**
 * 当前正在显示的图层
 */
export class DisplayLayers {
  prefabShow: boolean;
  frontShow: boolean;
  middleShow: boolean;
  backgroundShow: boolean;

  constructor() {
    this.prefabShow = true;
    this.frontShow = true;
    this.middleShow = true;
    this.backgroundShow = true;
  }
}

export class Background {
  bgId: string;
  color: string;
  url: string;

  constructor(bgId: string, url: string, color: string = '#fff') {
    this.bgId = bgId;
    this.color = color;
    this.url = url;
  }
}
