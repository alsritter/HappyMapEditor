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
      // shift 方法，删除数组中的第一个元素并返回它。如果数组为空，则返回 undefined，并且不修改数组。
      process(todo.shift());
      if (todo.length > 0) {
        // 将当前正在执行的函数本身再次使用定时器
        // 本来这里可以直接使用 arguments.callee 的，但是严格模式下用不了，所以这里通过调用这个 fun 来代替
        // 注意：arguments 该对象代表正在执行的函数和调用它的函数的参数，而 caller 返回一个对函数的引用，该函数调用了当前函数。
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
  // const todo = items.concat();
  const todo = items;
  // 只有队列里面没有任务了才再次执行(这里最大缓存 2 帧)
  if (todo.length < 3) {
    setTimeout(function fun() {
      // 开始计时
      const start = +new Date(); // JavaScript 中可以在某个元素前使用 ‘+’ 号，这个操作是将该元素转换成 Number 类型
      // 如果单个数据处理时间小于 50ms ，则无需分解任务

      do {
        process(todo.shift());
        // console.log(+new Date() - start, todo.length); // 打印任务执行时间以及任务队列堆积的任务数量
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
 * ====所以适合绘制网格这种不重要的任务调用====
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
export const jumpTimedProcessArray = <T>(items: Array<T>, process: (item: T | undefined) => void, callback: (items: Array<T>) => void): void => {
  // const todo = items.concat();
  const todo = items;
  // 只有队列里面没有任务了才再次执行(这里最大缓存 2 帧)
  if (todo.length < 3) {
    setTimeout(function fun() {
      // 开始计时
      const start = +new Date(); // JavaScript 中可以在某个元素前使用 ‘+’ 号，这个操作是将该元素转换成 Number 类型
      // 如果单个数据处理时间小于 50ms ，则无需分解任务

      do {
        process(todo.shift());
        // console.log(+new Date() - start, todo.length);
        // 如果大于3 帧数
        if (todo.length > 3) {
          // 去掉前面不必要的帧
          todo.splice(0, todo.length - 3);
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

export default {
  processArray,
  timedProcessArray,
  jumpTimedProcessArray
};
