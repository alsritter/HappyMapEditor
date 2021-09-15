/**
 * 用于二分查找一个范围
 */
export function binarySearch(array: number[], min: number, max: number) {
  if (!array || array.length === 0) return [];

  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  if (min <= array[0] && max >= array[array.length - 1]) {
    return array;
  }

  if (min == max) {
    if (min <= array[0]) {
      return [];
    }

    if (max >= array[array.length - 1]) {
      return [];
    }

    return [array[binarySearchLastLowest(array, min)]];
  }

  // return sequentialSearch(array, min, max);

  let first = -1;
  let lest = array.length;

  if (array[0] >= min) {
    first = 0;
  } else {
    first = binarySearchLastLowest(array, min);
  }

  if (array[array.length - 1] <= max) {
    lest = array.length;
  } else {
    lest = binarySearchFirstBigger(array, max);
  }

  return array.slice(first, lest);
}

/**
 * 找到最后一个比 value 小的下标
 */
function binarySearchLastLowest(array: number[], value: number) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midVal = array[mid];
    // 在数组中找到小于等于目标数的值
    if (midVal > value) {
      right = mid - 1;
    } else {
      if (mid == 0 || (mid + 1 < array.length - 1 && array[mid + 1] >= value)) {
        return mid;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
}

/**
 * 找到第一个比 value 大的下标
 */
function binarySearchFirstBigger(array: number[], value: number) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midVal = array[mid];
    // 在数组中找到大于等于目标数的值
    if (midVal >= value) {
      if (mid == 0 || array[mid - 1] <= value) {
        return mid;
      } else {
        right = mid - 1;
      }
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

/**
 * 测试使用的顺序查找
 *
 * @param array
 * @param min
 * @param max
 * @returns
 */
function sequentialSearch(array: number[], min: number, max: number) {
  let first = -1;
  let last = array.length;
  // 找到第一个比 min 大的值
  for (let i = 0; i < array.length; i++) {
    if (array[i] <= min) {
      first = i - 1;
    }
  }

  if (first < 0) {
    first = 0;
  }

  for (let i = first; i < array.length; i++) {
    if (array[i] >= max) {
      last = i;
    }
  }

  if (last > array.length) {
    last = array.length;
  }

  return array.slice(first, last);
}
