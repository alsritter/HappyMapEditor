import { Point, PrefabYPoint, PrefabXPoint } from '@/mystore/types';

/**
 * 用于二分查找一个范围
 */
export function binarySearch(array: number[], min: number, max: number) {
  if (!array || array.length == 0) return [];

  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  if (array[array.length - 1] < max && array[0] > min) {
    return array;
  }

  let mid = 0;
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    mid = Math.floor((end - start) / 2 + start);
    // 说明在左边
    if (min < array[mid]) {
      end = mid - 1;
    }
    // 说明在右边
    else if (min > array[mid]) {
      start = mid + 1;
    } else {
      break;
    }
  }
  // 此时 mid 就是大于或等于 min 的值
  const minIndex = mid;
  let maxIndex = array.length;

  if (max <= array[array.length - 1]) {
    end = array.length - 1;
    start = 0;
    while (start <= end) {
      mid = Math.floor((end - start) / 2 + start);
      // 说明在左边
      if (max < array[mid]) {
        end = mid - 1;
      }
      // 说明在右边
      else if (max > array[mid]) {
        start = mid + 1;
      } else {
        break;
      }
    }
    // 此时 mid 就是小于 max 的最大值
    maxIndex = mid;
  }
  // const tarr = array.slice(minIndex, maxIndex);
  // console.log('截取后：', tarr, minIndex, maxIndex);
  return array.slice(minIndex, maxIndex);
}

export function binarySearchByPrefabY(array: PrefabYPoint[], min: number, max: number) {
  if (!array || array.length == 0) return [];

  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  if (array[array.length - 1].y < max && array[0].y > min) {
    return array;
  }

  let mid = 0;
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    mid = Math.floor((end - start) / 2 + start);
    // 说明在左边
    if (min < array[mid].y) {
      end = mid - 1;
    }
    // 说明在右边
    else if (min > array[mid].y) {
      start = mid + 1;
    } else {
      break;
    }
  }
  // 此时 mid 就是大于或等于 min 的值
  const minIndex = mid;
  let maxIndex = array.length;

  if (max <= array[array.length - 1].y) {
    end = array.length - 1;
    start = 0;
    while (start <= end) {
      mid = Math.floor((end - start) / 2 + start);
      // 说明在左边
      if (max < array[mid].y) {
        end = mid - 1;
      }
      // 说明在右边
      else if (max > array[mid].y) {
        start = mid + 1;
      } else {
        break;
      }
    }
    // 此时 mid 就是小于 max 的最大值
    maxIndex = mid;
  }
  // const tarr = array.slice(minIndex, maxIndex);
  // console.log('截取后：', tarr, minIndex, maxIndex);
  return array.slice(minIndex, maxIndex);
}

export function binarySearchByPrefabX(array: PrefabXPoint[], min: number, max: number) {
  if (!array || array.length == 0) return [];

  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  if (array[array.length - 1].x < max && array[0].x > min) {
    return array;
  }

  let mid = 0;
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    mid = Math.floor((end - start) / 2 + start);
    // 说明在左边
    if (min < array[mid].x) {
      end = mid - 1;
    }
    // 说明在右边
    else if (min > array[mid].x) {
      start = mid + 1;
    } else {
      break;
    }
  }
  // 此时 mid 就是大于或等于 min 的值
  const minIndex = mid;
  let maxIndex = array.length;

  if (max <= array[array.length - 1].x) {
    end = array.length - 1;
    start = 0;
    while (start <= end) {
      mid = Math.floor((end - start) / 2 + start);
      // 说明在左边
      if (max < array[mid].x) {
        end = mid - 1;
      }
      // 说明在右边
      else if (max > array[mid].x) {
        start = mid + 1;
      } else {
        break;
      }
    }
    // 此时 mid 就是小于 max 的最大值
    maxIndex = mid;
  }
  // const tarr = array.slice(minIndex, maxIndex);
  // console.log('截取后：', tarr, minIndex, maxIndex);
  return array.slice(minIndex, maxIndex);
}
