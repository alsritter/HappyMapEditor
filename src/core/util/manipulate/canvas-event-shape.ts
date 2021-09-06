import { Ref, ComputedRef, computed } from 'vue';
import bus from '@/core/util/bus';
import graph from '@/core/util/graph';
import Constants from '@/core/util/Constants';
import { useStore } from '@/mystore';

enum DisplayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

export default class CanvasEventShape {
  store: any;

  /**
   * 传入绑定的参数，所以这里应该使用 Ref 类型
   * @param dragging 是否拖拽
   */
  constructor() {
    this.store = useStore();
  }

  /**
   * 拖动画布
   * 只拖动最上面的，下面的是跟着一起动的
   */
  dragCanvas = (canvasDOM: HTMLCanvasElement): void => {
    let mouseDownLocation = {
      x: 0,
      y: 0
    };

    //监听鼠标按下事件
    canvasDOM.onmousedown = (event: MouseEvent) => {
      mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
      this.store.action.canvasModifyDragState(true);
    };

    //鼠标弹起（注意，这里要使用 document）
    canvasDOM.onmouseup = () => {
      //canvasDOM.style.cursor = 'default';
      this.store.action.canvasModifyDragState(false);
    };

    //鼠标移动
    canvasDOM.onmousemove = (event) => {
      if (this.store.state.dragging) {
        const move = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
        this.store.action.canvasInit_X(this.store.state.initPoint.x + move.x - mouseDownLocation.x);
        this.store.action.canvasInit_Y(this.store.state.initPoint.y + move.y - mouseDownLocation.y);

        // 改变光标样式
        //canvasDOM.style.cursor = 'move';
        mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
        bus.emit('refreshCanvas');
      }
    };

    // 处理鼠标离开容器（这里统一收尾工作）
    canvasDOM.onmouseout = () => {
      //canvasDOM.style.cursor = 'default';
      this.store.action.canvasModifyDragState(false);
    };
  };

  /**
   * 初始事件
   */
  initCanvasEvent = (canvasDOM: HTMLCanvasElement): void => {
    this.drawCanvas(canvasDOM);
    canvasDOM.onmouseup = null;
    canvasDOM.onmousemove = null;
    canvasDOM.onmouseout = null;
    this.store.action.canvasModifyDragState(false);
  };

  /**
   * 放大缩小画布
   */
  scrollBarWheel = (event: WheelEventInit): void => {
    if (event.deltaY == undefined) {
      return;
    }

    const size = this.store.state.canvasSize;
    // console.log(size);

    if (event.deltaY < 0) {
      if (size > Constants.MAX_SIZE) return;
      //上滚
      this.store.action.canvasUpdateSize(size + 1);
    } else if (event.deltaY > 0) {
      //下滚
      if (size < Constants.MIN_SIZE) return;
      this.store.action.canvasUpdateSize(size - 1);
    } else {
      console.error('Mouse wheel zooming in and out status acquisition failed!');
    }

    bus.emit('refreshCanvas');
  };

  /**
   * 点击绘制
   */
  drawCanvas = (canvasDOM: HTMLCanvasElement): void => {
    canvasDOM.onmousedown = (event: MouseEvent) => {
      const point = graph.canvasPoint.pixToCoordinate(
        canvasDOM,
        this.store.state.canvasSize,
        this.store.state.initPoint.x,
        this.store.state.initPoint.y,
        event.clientX,
        event.clientY
      );

      const tmpTile = {
        id: 0,
        displayModel: DisplayLayer.FRONT,
        // 通过 id 去另一个存储图片的 State 查找图片
        tileSpriteId: 0,
        color: '#ffc107',
        effectKeys: [],
        tags: []
      };

      const data = {
        x: point.x,
        y: point.y,
        data: tmpTile
      };

      this.store.action.mapModifyPoint(data);
      bus.emit('refreshCanvas');
      bus.emit('sendData', data);
    };
  };
}
