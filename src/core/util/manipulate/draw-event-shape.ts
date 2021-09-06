import bus from '@/core/util/bus';
import { canvasDraw, canvasPoint } from '@/core/util/graph';
import { Layer, Point, Tile } from '@/mystore/types';
import { jumpTimedProcessArray, Task } from '@/core/util/process';
import { useStore } from '@/mystore';
import Constants from '@/core/util/Constants';

export default class DrawEventShape {
  width: number;
  height: number;
  store;
  gridElement: HTMLCanvasElement;
  frontCtx: CanvasRenderingContext2D;
  middleCtx: CanvasRenderingContext2D;
  backgroundCtx: CanvasRenderingContext2D;

  constructor(
    gridElement: HTMLCanvasElement,
    frontCtx: CanvasRenderingContext2D,
    middleCtx: CanvasRenderingContext2D,
    backgroundCtx: CanvasRenderingContext2D
  ) {
    this.width = Constants.CANVAS_WIDTH;
    this.height = Constants.CANVAS_HEIGHT;
    this.store = useStore();
    this.gridElement = gridElement;
    this.frontCtx = frontCtx;
    this.middleCtx = middleCtx;
    this.backgroundCtx = backgroundCtx;
    //
    this.initDraw();
    this.handleDrawTileEvent();
    this.handleRefreshCanvas();
  }

  /**
   * 初始绘制
   */
  initDraw() {
    const gridCtx = this.gridElement.getContext('2d') as CanvasRenderingContext2D;
    canvasDraw.drawGrid(gridCtx, this.width, this.height, Constants.DEFAULT_SIZE, this.store.state.initPoint.x, this.store.state.initPoint.y);
  }

  handleDrawTileEvent() {
    bus.on('drawTile', (data) => {
      const point = data as Point;
      const tile = this.store.getters.buildTile(point);
      this.store.action.mapAddTile(tile, point);
      const layer = this.store.state.currentLayer;
      switch (layer) {
        case Layer.FRONT:
          this.drawTile(tile, this.frontCtx);
          break;
        case Layer.MIDDLE:
          this.drawTile(tile, this.backgroundCtx);
          break;
        case Layer.BACKGROUND:
          this.drawTile(tile, this.backgroundCtx);
          break;
      }
    });
  }

  private drawTile(tile: Tile, ctx: CanvasRenderingContext2D) {
    canvasDraw.drawSingleItem(
      ctx,
      this.width,
      this.height,
      this.store.state.canvasSize,
      this.store.state.initPoint.x,
      this.store.state.initPoint.y,
      tile.point.x,
      tile.point.y,
      tile
    );
  }

  handleRefreshCanvas() {
    bus.on('refreshCanvas', () => {
      const startPoint = canvasPoint.canvasPixToCoordinate(this.store.state.canvasSize, this.store.state.initPoint.x, this.store.state.initPoint.y, 0, 0);
      const endPoint = canvasPoint.canvasPixToCoordinate(
        this.store.state.canvasSize,
        this.store.state.initPoint.x,
        this.store.state.initPoint.y,
        this.width,
        this.height
      );
      const tiles = this.store.getters.getTileRange(startPoint, endPoint) as Tile[];
      this.addTask(tiles);
    });
  }

  private addTask(tiles: Tile[]) {
    // Draw the queue
    const queues = new Array<Task>();
    // 绘制格子数据入队
    queues.push({
      data: {
        frontCtx: this.frontCtx,
        middleCtx: this.middleCtx,
        backgroundCtx: this.backgroundCtx,
        size: this.store.state.canvasSize,
        initX: this.store.state.initPoint.x,
        initY: this.store.state.initPoint.y,
        width: this.width,
        height: this.height,
        tiles
      },
      priority: 1
    });

    // 执行任务
    jumpTimedProcessArray(
      queues,
      (item) => {
        if (item == undefined) return;
        const gridCtx = this.gridElement.getContext('2d') as CanvasRenderingContext2D;
        canvasDraw.drawGrid(gridCtx, this.width, this.height, this.store.state.canvasSize, this.store.state.initPoint.x, this.store.state.initPoint.y);
        canvasDraw.drawAllItem(
          item.data.frontCtx,
          item.data.middleCtx,
          item.data.backgroundCtx,
          item.data.size,
          item.data.initX,
          item.data.initY,
          item.data.width,
          item.data.height,
          item.data.tiles
        );
      },
      () => {
        // console.log('任务完成');
      }
    );
  }
}
