/**
 * https://gist.github.com/chengyiqun/41bc2a93cc983358317311c6a55e0cd2
 *
 * 函数节流包装函数
 * @author
 * @export
 * @class Throttle
 */
export class Throttle {
  private timer: number | undefined;
  private stop: boolean = false;
  private death: boolean = false;

  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public use(func: Function, delay: number, immediate: boolean = false): Function {
    let flag = true;
    const self = this;
    return (...args: any) => {
      if (this.death) {
        func.apply(this, args);
        return;
      }
      if (this.stop) {
        func.apply(this, args);
        return;
      }
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }
      if (!flag) {
        return;
      }
      flag = false;
      self.timer = window.setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, delay);
    };
  }

  /**
   * 销毁
   *
   * @memberof Throttle
   */
  public destroy() {
    this.death = true;
    this.stop = true;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  /**
   * 开启
   *
   * @memberof Throttle
   */
  public open() {
    if (!this.death) {
      this.stop = false;
    }
  }

  /**
   * 关闭
   *
   * @memberof Throttle
   */
  public close() {
    this.stop = true;
  }
}

/*
例子
export class Test {
  private count: number = 1
  private throttle = new Throttle()
  private throttleUse: Function = this.throttle.use(this.request, 1000)
  private request(params: any) {
    console.log('this的指向', this);
    console.log('参数', params);
    console.log(this.count++)
  }
  节流调用
  private handelClickByThrottle() {
    this.throttleUse('截流函数')
  }
  停止 | 开启节流函数
  private changeStopThrottle(action: boolean) {
    action ? this.throttle.open() : this.throttle.close()
  }
  销毁节流函数
  private destroyThrottle() {
    this.throttle.destroy()
  }
}
*/
