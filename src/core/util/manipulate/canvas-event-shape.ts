import bus from '@/core/util/bus';
import { canvasPoint } from '@/core/util/graph';
import { useStore } from '@/mystore';
import { watch } from 'vue';

export default class CanvasEventShape {
  store;
  canvasDOM: HTMLCanvasElement;

  constructor(canvasDOM: HTMLCanvasElement) {
    console.log('实例化');

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

    //鼠标弹起（注意，这里要使用 document）
    this.canvasDOM.onmouseup = () => {
      //canvasDOM.style.cursor = 'default';
      this.store.action.canvasModifyDragState(false);
    };

    //鼠标移动
    this.canvasDOM.onmousemove = (event) => {
      if (this.store.state.dragging) {
        const move = canvasPoint.windowToCanvas(this.canvasDOM, event.clientX, event.clientY);
        this.store.action.canvasInit_X(this.store.state.initPoint.x + move.x - mouseDownLocation.x);
        this.store.action.canvasInit_Y(this.store.state.initPoint.y + move.y - mouseDownLocation.y);

        // 改变光标样式
        //canvasDOM.style.cursor = 'move';
        mouseDownLocation = canvasPoint.windowToCanvas(this.canvasDOM, event.clientX, event.clientY);
        bus.emit('refreshCanvas');
      }
    };

    // 处理鼠标离开容器（这里统一收尾工作）
    this.canvasDOM.onmouseout = () => {
      //canvasDOM.style.cursor = 'default';
      this.store.action.canvasModifyDragState(false);
    };
  };

  /**
   * 初始事件
   */
  initCanvasEvent = (): void => {
    this.drawCanvas();
    this.canvasDOM.onmouseup = null;
    this.canvasDOM.onmousemove = null;
    this.canvasDOM.onmouseout = null;
    this.store.action.canvasModifyDragState(false);
  };

  /**
   * 点击绘制
   */
  drawCanvas = (): void => {
    this.canvasDOM.onmousedown = (event: MouseEvent) => {
      const point = canvasPoint.pixToCoordinate(
        this.canvasDOM,
        this.store.state.canvasSize,
        this.store.state.initPoint.x,
        this.store.state.initPoint.y,
        event.clientX,
        event.clientY
      );

      // bus.emit('refreshCanvas');
      // bus.emit('sendData', data);
      // console.log(point);
      bus.emit('drawTile', point);
    };
  };
}
