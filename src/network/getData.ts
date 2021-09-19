import { request } from './request';

export function getTileList() {
  return request({
    url: '/get-tiles'
  });
}

export function getPrefabList() {
  return request({
    url: '/get-prefabs'
  });
}

export function getBg() {
  return request({
    url: '/get-bg'
  });
}

export function getEffectList() {
  return request({
    url: '/get-effects'
  });
}

export function getEffectById(id: string) {
  return request({
    url: `/get-effect-by-id/${id}`
  });
}

export function getTileById(id: string) {
  return request({
    url: `/get-tile-by-id/${id}`
  });
}

export function getPrefabById(id: string) {
  return request({
    url: `/get-prefab-by-id/${id}`
  });
}

export function getBgById(id: string) {
  return request({
    url: `/get-bg-by-id/${id}`
  });
}

export default { getTileList, getPrefabList, getBg, getTileById, getPrefabById, getBgById, getEffectList, getEffectById };
