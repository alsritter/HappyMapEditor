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
  index: number;
  color: string;
  effectKeys: number[];
  tags: number[];

  constructor(index: number, image: HTMLImageElement | null = null, color: string = '#5d9bbf2e', effectKeys: number[] = [], tags: number[] = []) {
    this.image = image;
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

export class PrefabData {
  image: HTMLImageElement | null;
  index: number;
  width: number;
  height: number;

  constructor(index: number, width: number, height: number, image: HTMLImageElement | null = null) {
    this.index = index;
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
  path: string;
  name: string;
  desc: string;
  index: number;
  image: HTMLImageElement | null;
}

export interface ICurrentPrefab {
  path: string;
  name: string;
  desc: string;
  index: number;
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
  AREA_ERASER = 'AREA_ERASER'
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
