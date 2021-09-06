import { Tile, Layer } from '@/mystore/types';

/**
 * 根据任务总量分配
 * 例如进行一个千万级别的运算总任务，可以将其分解为 10 个百万级别的运算小任务
 *
 * 封装 定时器分解任务 函数
 * @param items 这个就是一个参数对象的队列，每个参数代表一次任务
 * @param process 执行上面参数的回调函数
 * @param callback 全部任务执行完成时调用的回调函数
 */
export const processArray = <T>(items: Array<T>, process: (item: T | undefined) => void, callback: (items: Array<T>) => void): void => {
  // 复制一份数组副本
  // const todo = items.concat();
  const todo = items;

  if (todo.length < 2) {
    // 为了避免一直复制，这里应该使用内部函数的递归
    setTimeout(function fun() {
      process(todo.shift());
      if (todo.length > 0) {
        setTimeout(fun, 25);
      } else {
        callback(items);
      }
    }, 25);
  }
};

/**
 * 根据运行时间分配，这个主要用来做绘图任务的缓存
 *
 * ====适合绘制信息，且信息不能丢失的情况====
 *
 * 例如运行一个千万级别的运算总任务，不直接确定分配为多少个子任务，或者分配的颗粒度比较小，
 * 在每一个或几个计算完成后，查看此段运算消耗的时间，如果时间小于某个临界值，比如 10ms，
 * 那么就继续进行运算，否则就暂停，等到下一个轮询再进行进行
 *
 * 优点是避免了第一种情况出现的问题，缺点是多出了一个时间比较的运算，额外的运算过程也可能影响到性能
 *
 * @param items 这个就是一个参数对象的队列，每个参数代表一次任务
 * @param process 执行上面参数的回调函数
 * @param callback 全部任务执行完成时调用的回调函数
 */
export const timedProcessArray = <T>(items: Array<T>, process: (item: T | undefined) => void, callback: (items: Array<T>) => void): void => {
  const todo = items;
  if (todo.length < 3) {
    setTimeout(function fun() {
      const start = +new Date();
      // 如果单个数据处理时间小于 50ms ，则无需分解任务
      do {
        process(todo.shift());
      } while (todo.length && +new Date() - start < 50);

      if (todo.length > 0) {
        setTimeout(fun, 25);
      } else {
        callback(items);
      }
    });
  }
};

/**
 * 根据运行时间分配，这个主要用来做绘图任务的缓存，它和 timedProcessArray 的区别就是，它只保留最后两帧，
 *
 * @param items This is a queue of parameter objects, each parameter representing a task
 * @param process The callback function that executes the task
 * @param callback Callback function called when all tasks have completed
 */
export const jumpTimedProcessArray = (items: Array<Task>, process: (item: Task | undefined) => void, callback: (items: Array<Task>) => void): void => {
  const todo = items;
  // Only if there are no more tasks in the queue (Max cache 2 frames)
  if (todo.length < 3) {
    setTimeout(function fun() {
      const start = +new Date();
      do {
        const item = todo.shift();

        process(item);
        if (todo.length > 3) {
          // Just keep the last 3 frames
          todo.splice(0, todo.length - 3);
          // sort from largest to smallest
          todo.sort((a, b) => a.priority - b.priority);
        }
      } while (todo.length && +new Date() - start < 50);

      if (todo.length > 0) {
        setTimeout(fun, 25);
      } else {
        callback(items);
      }
    });
  }
};

export type Task = {
  data: {
    frontCtx: CanvasRenderingContext2D;
    middleCtx: CanvasRenderingContext2D;
    backgroundCtx: CanvasRenderingContext2D;
    size: number;
    initX: number;
    initY: number;
    width: number;
    height: number;
    tiles: Tile[];
  };
  priority: number;
};

// 7分钟理解JS的节流、防抖及使用场景 https://juejin.cn/post/6844903669389885453#comment
// TODO: 改进
export default {
  processArray,
  timedProcessArray,
  jumpTimedProcessArray
};
