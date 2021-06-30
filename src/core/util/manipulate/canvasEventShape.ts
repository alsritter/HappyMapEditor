import * as Vue from 'vue';
import bus from '@/core/util/bus';
import graph from '@/core/util/graph';
import Constants from '@/core/util/Constants';
import { useStore, Store } from 'vuex';

export default class CanvasEventShape {
  dragging: Vue.Ref<boolean>;
  currentX: Vue.Ref<number>;
  currentY: Vue.Ref<number>;
  store: Store<any>;
  canvasGetters: Vue.ComputedRef<{
    state: any;
    getSize: any;
    getPoint: any;
  }>;

  /**
   * 传入绑定的参数，所以这里应该使用 Vue.Ref 类型
   * @param dragging 是否拖拽
   * @param currentX 当前 X
   * @param currentY 当前 Y
   */
  constructor(dragging: Vue.Ref<boolean>, currentX: Vue.Ref<number>, currentY: Vue.Ref<number>) {
    this.dragging = dragging;
    this.currentX = currentX;
    this.currentY = currentY;
    this.store = useStore();

    this.canvasGetters = Vue.computed(() => {
      return {
        state: this.store.getters['canvas/status'],
        getSize: this.store.getters['canvas/getSize'],
        getPoint: this.store.getters['canvas/getPoint']
      };
    });
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
      this.dragging.value = true;
    };

    //鼠标弹起（注意，这里要使用 document）
    canvasDOM.onmouseup = () => {
      //canvasDOM.style.cursor = 'default';
      this.dragging.value = false;
    };

    //鼠标移动
    canvasDOM.onmousemove = (event) => {
      if (this.dragging.value) {
        const move = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
        this.currentX.value += move.x - mouseDownLocation.x;
        this.currentY.value += move.y - mouseDownLocation.y;

        // 改变光标样式
        //canvasDOM.style.cursor = 'move';
        mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
        bus.emit('refreshCanvas');
      }
    };

    // 处理鼠标离开容器（这里统一收尾工作）
    canvasDOM.onmouseout = () => {
      //canvasDOM.style.cursor = 'default';
      this.dragging.value = false;
    };
  };

  /**
   * 初始事件
   */
  InitCanvasEvent = (canvasDOM: HTMLCanvasElement): void => {
    canvasDOM.onmousedown = (event: MouseEvent) => {
      // console.log(event.clientX, event.clientY);
      // console.log(graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY));
      console.log(
        graph.canvasPoint.pixToCoordinate(canvasDOM, this.canvasGetters.value.getSize, this.currentX.value, this.currentY.value, event.clientX, event.clientY)
      );
    };
    canvasDOM.onmouseup = null;
    canvasDOM.onmousemove = null;
    canvasDOM.onmouseout = null;
    this.dragging.value = false;
  };

  /**
   * 放大缩小画布
   */
  scrollBarWheel = (event: WheelEventInit): void => {
    if (event.deltaY == undefined) {
      return;
    }

    const size = this.canvasGetters.value.getSize;

    if (event.deltaY < 0) {
      if (size > Constants.MAX_SIZE) return;
      //上滚
      this.store.dispatch('canvas/UPDATE_SIZE', size + 1);
    } else if (event.deltaY > 0) {
      //下滚
      if (size < Constants.MIN_SIZE) return;
      this.store.dispatch('canvas/UPDATE_SIZE', size - 1);
    } else {
      console.error('Mouse wheel zooming in and out status acquisition failed!');
    }

    bus.emit('refreshCanvas');
  };
}
