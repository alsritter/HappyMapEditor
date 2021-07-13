import { Ref, ComputedRef, computed } from 'vue';
import bus from '@/core/util/bus';
import graph from '@/core/util/graph';
import Constants from '@/core/util/Constants';
// import { useStore, Store } from 'vuex';
import { Store } from '@/store';
import { useStore } from '@/use/useStore';
import { AllActionTypes } from '@/store/action-types';
import { AllMutationTypes } from '@/store/mutation-types';
import { DisplayLayer } from '@/store/modules/map/map.types';
import { Point } from '@/store/modules/canvas/canvas.types';

export default class CanvasEventShape {
  dragging: Ref<boolean>;
  currentX: Ref<number>;
  currentY: Ref<number>;
  store: Store;
  canvasGetters: ComputedRef<{
    state: {
      canvasSize: {
        size: number;
      };
      initPoint: {
        x: number;
        y: number;
      };
    };
    getSize: number;
    getPoint: Point;
  }>;

  /**
   * 传入绑定的参数，所以这里应该使用 Ref 类型
   * @param dragging 是否拖拽
   * @param currentX 当前 X
   * @param currentY 当前 Y
   */
  constructor(dragging: Ref<boolean>, currentX: Ref<number>, currentY: Ref<number>) {
    this.dragging = dragging;
    this.currentX = currentX;
    this.currentY = currentY;
    this.store = useStore();

    this.canvasGetters = computed(() => {
      return {
        state: this.store.getters.status,
        getSize: this.store.getters.getSize,
        getPoint: this.store.getters.getPoint
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
    // canvasDOM.onmousedown = (event: MouseEvent) => {
    //   // console.log(event.clientX, event.clientY);
    //   // console.log(graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY));
    //   console.log(
    //     graph.canvasPoint.pixToCoordinate(canvasDOM, this.canvasGetters.value.getSize, this.currentX.value, this.currentY.value, event.clientX, event.clientY)
    //   );
    // };
    this.drawCanvas(canvasDOM);

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
    // console.log(size);

    if (event.deltaY < 0) {
      if (size > Constants.MAX_SIZE) return;
      //上滚
      // this.store.dispatch('canvas/UPDATE_SIZE', size + 1);
      this.store.dispatch(AllActionTypes.CANVAS_UPDATE_SIZE, size + 1);
    } else if (event.deltaY > 0) {
      //下滚
      if (size < Constants.MIN_SIZE) return;
      // this.store.dispatch('canvas/UPDATE_SIZE', size - 1);
      this.store.dispatch(AllActionTypes.CANVAS_UPDATE_SIZE, size - 1);
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
        this.canvasGetters.value.getSize,
        this.currentX.value,
        this.currentY.value,
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
      // console.log(this.store.getters.getTileOrPrefabByCoordinate(point.x, point.y, DisplayLayer.FRONT));
      this.store.commit(AllMutationTypes.MAP_CHANGE_POINT, data);

      // console.log(this.store.getters.getAllBlock(DisplayLayer.FRONT));
      bus.emit('refreshCanvas');
      bus.emit('sendData', data);
    };
  };
}
