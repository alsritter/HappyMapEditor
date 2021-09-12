import { defineComponent, ref, onMounted, Ref } from 'vue';
import bus from '@/core/util/bus';
import Constants from '@/core/util/Constants';
import { CanvasEventShape, DrawEventShape } from '@/core/util/manipulate';
import { useStore } from '@/mystore';
import { Layer } from '@/mystore/types';

export default defineComponent({
  setup() {
    const store = useStore();
    // 引用页面的画布
    const GRID_CANVAS = ref(null) as Ref<HTMLCanvasElement | null>;
    const PREFAB_CANVAS = ref(null) as Ref<HTMLCanvasElement | null>;
    // Tile 画布
    const tileCanvasBox = {
      [Layer.FRONT]: ref(null) as Ref<HTMLCanvasElement | null>,
      [Layer.MIDDLE]: ref(null) as Ref<HTMLCanvasElement | null>,
      [Layer.BACKGROUND]: ref(null) as Ref<HTMLCanvasElement | null>
    };

    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    // The starting position of the current coordinate

    /**
     * 放大缩小画布
     */
    function scrollBarWheel(event: WheelEventInit): void {
      if (event.deltaY == undefined) return;
      const size = store.state.canvasSize;
      if (event.deltaY < 0) {
        if (size > Constants.MAX_SIZE) return;
        //上滚
        store.action.canvasUpdateSize(size + 1);
      } else if (event.deltaY > 0) {
        //下滚
        if (size < Constants.MIN_SIZE) return;
        store.action.canvasUpdateSize(size - 1);
      } else {
        console.error('Mouse wheel zooming in and out status acquisition failed!');
      }

      bus.emit('refreshCanvas');
    }

    onMounted(() => {
      const gridElement = GRID_CANVAS.value as unknown as HTMLCanvasElement;
      const frontElement = tileCanvasBox.FRONT.value as unknown as HTMLCanvasElement;
      const middleElement = tileCanvasBox.MIDDLE.value as unknown as HTMLCanvasElement;
      const backgroundElement = tileCanvasBox.BACKGROUND.value as unknown as HTMLCanvasElement;
      const prefabElement = PREFAB_CANVAS.value as unknown as HTMLCanvasElement;

      const gridCtx = gridElement.getContext('2d') as CanvasRenderingContext2D;
      const frontCtx = frontElement.getContext('2d') as CanvasRenderingContext2D;
      const middleCtx = middleElement.getContext('2d') as CanvasRenderingContext2D;
      const backgroundCtx = backgroundElement.getContext('2d') as CanvasRenderingContext2D;
      const prefabCtx = prefabElement.getContext('2d') as CanvasRenderingContext2D;
      // Initialization event
      new CanvasEventShape(gridElement);
      new DrawEventShape(gridElement, frontCtx, middleCtx, backgroundCtx, prefabCtx);
    });

    return { ...tileCanvasBox, GRID_CANVAS, PREFAB_CANVAS, width, height, scrollBarWheel };
  }
});
