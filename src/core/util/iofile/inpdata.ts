import { Layer, Prefab, PrefabData, Tile, TileData } from '@/mystore/types';
import { useStore } from '@/mystore';
import axios from '@/network';
import bus from '@/core/util/bus';

const store = useStore();

type TD = {
  key: string;
  layer: number;
  tile_sprite_id: string;
  color: string;
  effect_keys: string[];
};

type TP = {
  x: number;
  y: number;
  key: string;
  layer: number;
};

type PP = {
  prefab_id: string;
  x: number;
  y: number;
};

type BG = {
  bg_id: string;
  color: string;
};

// 导入数据
export function inputData(dataStr: string) {
  const map = JSON.parse(dataStr);
  const background = map.background;
  const initial = map.initial;
  const prefabs = map.prefabs;
  const tileData = map.tileData;
  const tiles = map.tiles;

  if (initial.x && initial.y) {
    store.action.mapSetStartPoint({
      x: initial.x,
      y: initial.y
    });
  }

  inData(tileData, tiles, prefabs, background);
}

async function inData(tiledata: TD[], tile: TP[], prefabs: PP[], bg: BG) {
  store.action.clearAllTileData();
  for (const o of tiledata) {
    await axios.getData
      .getTileById(o.tile_sprite_id)
      .then((res: any) => {
        const img = new Image(100, 200);
        img.src = res.path;
        const tile = new TileData(o.key, numberToLayer(o.layer), o.tile_sprite_id, res.path, img, o.color);
        store.action.effectModify(o.key, o.effect_keys);
        store.action.replaceTileData(tile);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  inTile(tile);

  await inBg(bg);
  await inPrefabs(prefabs);

  bus.emit('refreshCanvas');
}

/**
 * 需要等待 inTileData 执行完成才能执行
 */
function inTile(items: TP[]) {
  store.action.clearAllTile();
  items.forEach((o) => {
    const pos = { x: o.x, y: o.y };
    const tile = new Tile(pos, numberToLayer(o.layer), store.state.tileInstancesCache.get(o.key) as TileData);
    store.action.replaceTile(tile);
  });
}

/**
 * 插入 Prefab
 */
async function inPrefabs(items: PP[]) {
  store.action.clearPrefabs();
  for (const o of items) {
    await axios.getData
      .getPrefabById(o.prefab_id)
      .then((res: any) => {
        const img = new Image(100, 200);
        img.src = res.path;
        const width = res.width;
        const height = res.height;
        const pos = { x: o.x, y: o.y + height - 1 };
        const pdata = new PrefabData(o.prefab_id, width, height, img);
        const prefab = new Prefab(pos, pdata);
        store.action.replacePrefab(prefab);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

async function inBg(bg: BG) {
  store.action.backgroundClear();
  if (!bg.bg_id) return;

  await axios.getData
    .getBgById(bg.bg_id)
    .then((res: any) => {
      const path = res.path;
      const name = res.name;
      store.action.backgroundModify(bg.bg_id, path, name);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function numberToLayer(layer: number) {
  switch (layer) {
    case 1:
      return Layer.BACKGROUND;
    case 2:
      return Layer.MIDDLE;
    case 3:
      return Layer.FRONT;
    default:
      return Layer.BACKGROUND;
  }
}
