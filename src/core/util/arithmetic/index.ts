/**
 * 用于二分查找一个范围
 */
export function binarySearch(array: number[], min: number, max: number) {
  if (!array || array.length == 0) return [];

  if (min == max) return [];

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
    start = minIndex;
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
  return array.slice(minIndex, maxIndex);
}
