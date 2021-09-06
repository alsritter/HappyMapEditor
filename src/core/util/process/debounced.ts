/**
 * 函数防抖包装函数
 * https://gist.github.com/chengyiqun/41bc2a93cc983358317311c6a55e0cd2
 *
 * @author
 * @export
 * @class Debounced
 */
export class Debounced {
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public use = (func: Function, delay: number, immediate: boolean = false): Function => {
    let timer: number | undefined;
    return (...args: any) => {
      if (immediate) {
        func.apply(this, args); // 确保引用函数的指向正确，并且函数的参数也不变
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
}

/*
例子
export class Test
  private count: number = 1
  包装后的防抖函数
  private debouncedUse: Function = new Debounced().use(this.request, 1000)
  原始函数
  private request(params: any) {
    console.log('this的指向', this);
    console.log('参数', params);
    console.log(this.count++)
  }
  调用包装后的防抖函数
  private handelClickByDebounced() {
    this.debouncedUse(123)
  }
*/
