import bus from '@/core/util/bus';
import { canvasDraw, canvasPoint, canvasBlockDraw } from '@/core/util/graph';
import { Layer, Point, Tile, TileData, Prefab } from '@/mystore/types';
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
  prefabCtx: CanvasRenderingContext2D;

  constructor(
    gridElement: HTMLCanvasElement,
    frontCtx: CanvasRenderingContext2D,
    middleCtx: CanvasRenderingContext2D,
    backgroundCtx: CanvasRenderingContext2D,
    prefabCtx: CanvasRenderingContext2D
  ) {
    this.width = Constants.CANVAS_WIDTH;
    this.height = Constants.CANVAS_HEIGHT;
    this.store = useStore();
    this.gridElement = gridElement;
    this.frontCtx = frontCtx;
    this.middleCtx = middleCtx;
    this.backgroundCtx = backgroundCtx;
    this.prefabCtx = prefabCtx;
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
    canvasDraw.drawGrid(
      gridCtx,
      this.width,
      this.height,
      Constants.DEFAULT_SIZE,
      this.store.state.initPoint.x,
      this.store.state.initPoint.y,
      this.store.state.showGrid,
      this.store.state.showAxis
    );
  }

  handleDrawTileEvent() {
    bus.on('pen', (data) => {
      // 检查当前图层是否显示，不显示则不绘制
      const layer = this.store.state.currentLayer;
      if (!this.store.getters.currentLayerIsDisplayed(layer)) return;

      const point = data as Point;
      const tile = this.store.action.mapAddTile(point);

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

    bus.on('eraser', (data) => {
      const layer = this.store.state.currentLayer;
      if (!this.store.getters.currentLayerIsDisplayed(layer)) return;

      const point = data as Point;
      this.store.action.mapDeleteTile(point);
      switch (layer) {
        case Layer.FRONT:
          this.deleteTile(point, this.frontCtx);
          break;
        case Layer.MIDDLE:
          this.deleteTile(point, this.backgroundCtx);
          break;
        case Layer.BACKGROUND:
          this.deleteTile(point, this.backgroundCtx);
          break;
      }
      // bus.emit('refreshCanvas');
    });

    bus.on('areaPen', (data) => {
      const layer = this.store.state.currentLayer;
      if (!this.store.getters.currentLayerIsDisplayed(layer)) return;

      const start = data.start as Point;
      const end = data.end as Point;
      const tileData = this.store.action.mapAddAreaTile(start, end);
      switch (layer) {
        case Layer.FRONT:
          this.drawAreaTile(tileData as TileData, start, end, this.frontCtx);
          break;
        case Layer.MIDDLE:
          this.drawAreaTile(tileData as TileData, start, end, this.backgroundCtx);
          break;
        case Layer.BACKGROUND:
          this.drawAreaTile(tileData as TileData, start, end, this.backgroundCtx);
          break;
      }
    });

    bus.on('areaEraser', (data) => {
      const layer = this.store.state.currentLayer;
      if (!this.store.getters.currentLayerIsDisplayed(layer)) return;

      const start = data.start as Point;
      const end = data.end as Point;
      this.store.action.mapDeleteAreaTile(start, end);
      switch (layer) {
        case Layer.FRONT:
          this.deleteAreaTile(start, end, this.frontCtx);
          break;
        case Layer.MIDDLE:
          this.deleteAreaTile(start, end, this.backgroundCtx);
          break;
        case Layer.BACKGROUND:
          this.deleteAreaTile(start, end, this.backgroundCtx);
          break;
      }
    });

    bus.on('prefabDraw', (data) => {
      const point = data as Point;
      const prefab = this.store.getters.getPrefabByPoint(point);
      if (prefab == undefined) {
        const newPrefab = this.store.action.mapAddPrefab(point);

        if (!newPrefab) {
          return;
        }

        canvasBlockDraw.drawSinglePrefab(
          this.prefabCtx,
          this.width,
          this.height,
          this.store.state.canvasSize,
          this.store.state.initPoint.x,
          this.store.state.initPoint.y,
          newPrefab.point.x,
          newPrefab.point.y,
          newPrefab.data
        );
      }
    });

    bus.on('prefabDelete', (data) => {
      const point = data as Point;
      const prefab = this.store.action.mapDeletePrefab(point);
      // bus.emit('refreshCanvas');
      if (prefab) {
        this.deleteAreaTile(prefab.point, { x: prefab.point.x + prefab.data.width - 1, y: prefab.point.y + prefab.data.height - 1 }, this.prefabCtx);
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
      tile.data
    );
  }

  private drawAreaTile(data: TileData, start: Point, end: Point, ctx: CanvasRenderingContext2D) {
    canvasDraw.drawAreaItem(
      ctx,
      this.width,
      this.height,
      this.store.state.canvasSize,
      this.store.state.initPoint.x,
      this.store.state.initPoint.y,
      start,
      end,
      data
    );
  }

  private deleteTile(point: Point, ctx: CanvasRenderingContext2D) {
    canvasDraw.clearCanvasPoint(ctx, this.store.state.initPoint.x, this.store.state.initPoint.y, point, this.store.state.canvasSize);
  }

  private deleteAreaTile(start: Point, end: Point, ctx: CanvasRenderingContext2D) {
    canvasDraw.clearAreaItem(ctx, this.store.state.canvasSize, this.store.state.initPoint.x, this.store.state.initPoint.y, start, end);
  }

  handleRefreshCanvas() {
    bus.on('refreshCanvas', () => {
      this.addTask();
    });
  }

  private addTask() {
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
        height: this.height
      },
      priority: 1
    });

    // 执行任务
    jumpTimedProcessArray(
      queues,
      (item) => {
        if (item == undefined) return;
        // 这里保留几个格子的位置
        const startPoint = canvasPoint.canvasPixToCoordinate(
          this.store.state.canvasSize,
          this.store.state.initPoint.x,
          this.store.state.initPoint.y,
          -1 * this.store.state.canvasSize,
          -1 * this.store.state.canvasSize
        );

        const endPoint = canvasPoint.canvasPixToCoordinate(
          this.store.state.canvasSize,
          this.store.state.initPoint.x,
          this.store.state.initPoint.y,
          this.width + 1 * this.store.state.canvasSize,
          this.height + 1 * this.store.state.canvasSize
        );

        const tiles = this.store.getters.getTileRange(startPoint, endPoint) as Tile[];

        const gridCtx = this.gridElement.getContext('2d') as CanvasRenderingContext2D;
        canvasDraw.drawGrid(
          gridCtx,
          this.width,
          this.height,
          this.store.state.canvasSize,
          this.store.state.initPoint.x,
          this.store.state.initPoint.y,
          this.store.state.showGrid,
          this.store.state.showAxis
        );
        canvasDraw.drawAllItem(
          item.data.frontCtx,
          item.data.middleCtx,
          item.data.backgroundCtx,
          this.store.state.displayLayers,
          item.data.size,
          item.data.initX,
          item.data.initY,
          item.data.width,
          item.data.height,
          tiles
        );

        canvasDraw.clearAllCanvas(this.prefabCtx, this.width, this.height);
        if (this.store.state.displayLayers.prefabShow) {
          const prefabs = this.store.getters.getPrefabRange(startPoint, endPoint) as Prefab[];

          canvasBlockDraw.drawAllPrefab(
            this.prefabCtx,
            this.width,
            this.height,
            this.store.state.canvasSize,
            this.store.state.initPoint.x,
            this.store.state.initPoint.y,
            prefabs
          );
        }
      },
      () => {
        // console.log('任务完成');
      }
    );
  }
}
