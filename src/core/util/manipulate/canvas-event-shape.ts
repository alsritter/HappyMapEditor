import bus from '@/core/util/bus';
import { canvasPoint } from '@/core/util/graph';
import { useStore } from '@/mystore';
import { ToolType } from '@/mystore/types';
import { watch } from 'vue';
import { Throttle } from '@/core/util/process';

export default class CanvasEventShape {
  store;
  canvasDOM: HTMLCanvasElement;

  constructor(canvasDOM: HTMLCanvasElement) {
    this.store = useStore();
    this.canvasDOM = canvasDOM;
    this.initCanvasEvent();
    // Listen for keyboard events
    watch(
      () => this.store.getters.isAlt(),
      (newValue, oldValue) => {
        if (newValue) {
          this.dragCanvas();
        } else {
          this.initCanvasEvent();
        }
      }
    );

    bus.on('init', () => {
      this.initCanvasEvent();
    });
  }

  /**
   * 拖动画布
   * 只拖动最上面的，下面的是跟着一起动的
   */
  dragCanvas = (): void => {
    let mouseDownLocation = {
      x: 0,
      y: 0
    };

    //监听鼠标按下事件
    this.canvasDOM.onmousedown = (event: MouseEvent) => {
      mouseDownLocation = canvasPoint.windowToCanvas(this.canvasDOM, event.clientX, event.clientY);
      this.store.action.canvasModifyDragState(true);
    };

    const throttle = new Throttle();
    const moveFun = throttle.use((event: MouseEvent) => {
      const move = canvasPoint.windowToCanvas(this.canvasDOM, event.clientX, event.clientY);
      this.store.action.canvasInit_X(this.store.state.initPoint.x + move.x - mouseDownLocation.x);
      this.store.action.canvasInit_Y(this.store.state.initPoint.y + move.y - mouseDownLocation.y);
      // 改变光标样式
      //canvasDOM.style.cursor = 'move';
      mouseDownLocation = canvasPoint.windowToCanvas(this.canvasDOM, event.clientX, event.clientY);
      bus.emit('refreshCanvas');
    }, 10);
    throttle.open();

    //鼠标弹起（注意，这里要使用 document）
    this.canvasDOM.onmouseup = () => {
      //canvasDOM.style.cursor = 'default';
      throttle.destroy();
      this.store.action.canvasModifyDragState(false);
    };

    //鼠标移动（使用函数节流）
    this.canvasDOM.onmousemove = (event) => {
      if (this.store.state.dragging) {
        moveFun(event);
      }
    };

    // 处理鼠标离开容器（这里统一收尾工作）
    this.canvasDOM.onmouseout = () => {
      //canvasDOM.style.cursor = 'default';
      throttle.destroy();
      this.store.action.canvasModifyDragState(false);
    };
  };

  /**
   * 初始事件
   */
  initCanvasEvent = (): void => {
    this.drawCanvas();
    this.store.action.canvasModifyDragState(false);
  };

  /**
   * 点击绘制
   */
  drawCanvas = (): void => {
    switch (this.store.state.currentTool) {
      case ToolType.PEN:
        this.click('pen');
        break;
      case ToolType.PIPETA:
        this.click('pipette');
        break;
      case ToolType.ERASER:
        this.click('eraser');
        break;
      case ToolType.AREA_PEN:
        this.drag('areaPen');
        break;
      case ToolType.AREA_ERASER:
        this.drag('areaEraser');
        break;
      default:
        this.click('pen');
        break;
    }
  };

  private click(eventName: string) {
    this.canvasDOM.onmousedown = (event: MouseEvent) => {
      const point = canvasPoint.pixToCoordinate(
        this.canvasDOM,
        this.store.state.canvasSize,
        this.store.state.initPoint.x,
        this.store.state.initPoint.y,
        event.clientX,
        event.clientY
      );
      bus.emit(eventName, point);
    };
    this.canvasDOM.onmouseup = null;
    this.canvasDOM.onmousemove = null;
    this.canvasDOM.onmouseout = null;
  }

  /**
   * 拖动时调用
   */
  private drag(eventName: string) {
    let down = false;
    let downPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };
    let deffPoint = { x: 0, y: 0 };
    const throttle = new Throttle();
    // 拖动时的回调函数(只有在不同的格子里才要重绘（否则会在一个格子里面不断的重绘）)
    const moveFun = throttle.use((event: MouseEvent) => {
      deffPoint = canvasPoint.pixToCoordinate(
        this.canvasDOM,
        this.store.state.canvasSize,
        this.store.state.initPoint.x,
        this.store.state.initPoint.y,
        event.clientX,
        event.clientY
      );

      if (endPoint.x == deffPoint.x && endPoint.y == deffPoint.y) {
        return;
      } else {
        endPoint = deffPoint;
      }

      bus.emit(eventName, {
        start: downPoint,
        end: endPoint
      });
    }, 10);
    throttle.open();

    this.canvasDOM.onmousedown = (event: MouseEvent) => {
      down = true;
      downPoint = canvasPoint.pixToCoordinate(
        this.canvasDOM,
        this.store.state.canvasSize,
        this.store.state.initPoint.x,
        this.store.state.initPoint.y,
        event.clientX,
        event.clientY
      );
      endPoint = downPoint;
    };

    this.canvasDOM.onmouseup = () => {
      throttle.destroy();
      down = false;
    };

    this.canvasDOM.onmouseout = () => {
      throttle.destroy();
      down = false;
    };

    this.canvasDOM.onmousemove = (event) => {
      if (down) {
        moveFun(event);
      }
    };
  }
}
