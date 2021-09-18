/**
 * 用于导出地图数据
 */
import { Layer, Tile } from '@/mystore/types';
import TreeMap from 'ts-treemap';
import { useStore } from '@/mystore';

const store = useStore();

/**
 * 导出初始化数据
 */
export function expInitial() {
  return {
    x: 1,
    y: 3,
    speed: 8,
    runDivisor: 3,
    jumpSpeedDivisor: 1.2,
    climbSpeed: 0.1,
    crouchSpeedDivisor: 3,
    jumpForce: 10,
    jump2ForceDivisor: 2,
    climbLateralForce: 5
  };
}

/**
 * 导出背景数据
 */
export function expBg() {
  return {
    bg_id: store.state.bgId,
    color: '#fff'
  };
}

/**
 * 导出预制件信息
 */
export function expPrefabs() {
  const result = [];
  const prefabs = [...store.state.prefabInstances.values()];
  for (const prefab of prefabs) {
    result.push({
      prefab_id: prefab.data.prefabId,
      // 得减去宽度高度信息
      // x: prefab.point.x + prefab.data.width,
      // y: -(prefab.point.y + prefab.data.height)
      x: prefab.point.x,
      y: prefab.point.y - prefab.data.height + 1
    });
  }
  return result;
}

/**
 * 导出 Tile 信息
 */
export function expTileData() {
  const result = [];
  const tiles = [...store.state.tileInstancesCache.values()];
  for (const tile of tiles) {
    result.push({
      key: tile.key,
      layer: layerToNumber(tile.layer),
      tile_sprite_id: tile.tileSpriteId,
      color: tile.color,
      effect_keys: tile.effectKeys,
      tags: tile.tags
    });
  }
  return result;
}

/**
 * 导出 Tile 信息
 */
export function expTiles() {
  const result = [];
  const yMap = [...store.state.mapTiles.values()];
  for (const xMap of yMap) {
    const txMap = xMap as TreeMap<number, Tile>;
    const tiles = [...txMap.values()];
    for (const tile of tiles) {
      result.push({ x: tile.point.x, y: tile.point.y, key: tile.data.key, layer: layerToNumber(tile.layer) });
    }
  }
  return result;
}

export function layerToNumber(layer: Layer) {
  switch (layer) {
    case Layer.BACKGROUND:
      return 1;
    case Layer.MIDDLE:
      return 2;
    case Layer.FRONT:
      return 3;
  }
}

/**
 *
 * @param {any} data 要导出的数据
 * @param {string} fileName 导出的文件名
 */
export function downLoadFiles(data: any, fileName: any) {
  const a = document.createElement('a');
  a.style.visibility = 'hidden';
  document.body.appendChild(a);
  const blobs = new Blob([JSON.stringify(data)], {
    type: 'data:application/json;charset=utf-8'
  });
  const objurl = URL.createObjectURL(blobs);
  a.href = objurl;
  // a.href = "data:application/json;charset=utf-8" + JSON.stringify(data, null, 2);  // 使用这种方式会导出文件失败net error，原因在于协议不同无法跨域
  a.download = fileName;
  a.click();
  document.body.removeChild(a);
}
