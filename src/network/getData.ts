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

export default { getTileList, getPrefabList, getBg };
