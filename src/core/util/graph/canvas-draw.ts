import { AllItemParamType, GridParamType, SingleItemParamType, GridRuntimeType } from '@/core/util/graph';
import { blockCoordinateToCoordinate, CoordinateToPix, blockIsOffScreen } from '@/core/util/graph/canvas-point';
import Constants from '@/core/util/Constants';
/**
 * 这里专门用来绘制网格
 *
 * @param item 绘制网格的参数
 */
export const drawGrid = (item: GridParamType): void => {
  // 要绘制网格必定要刷新画布
  clearAllCanvas(item.ctx, item.width, item.height);

  // 计算数量
  const _cols = item.width / item.size;
  // const _rows = _cols;
  const _rows = item.height / item.size;

  // CanvasRenderingContext2D.beginPath() 是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
  // ctx.beginPath(); // 开始绘制线条，若不使用 beginPath，则不能绘制多条线条
  item.ctx.setLineDash([1, 2]); //绘制虚线
  item.ctx.strokeStyle = '#2a2a2a';
  item.ctx.fillStyle = '#2a2a2a';
  item.ctx.lineWidth = 1; //设置线条宽度

  // 计算当前中心点的所在格子位置 这里不要使用 floor 取值，效率有问题
  // ceil 向上取整 floor 向下取整
  // const cx = (0.5 + (x / width) * _cols) | 0;
  // const cy = (0.5 + (y / hight) * _rows) | 0;
  const cx = (item.x / item.width) * _cols;
  const cy = (item.y / item.height) * _rows;

  // console.time('time');

  // 绘制线条
  for (let i = 0; i < _cols; i++) {
    item.ctx.beginPath();
    item.ctx.moveTo(item.size * i + (item.x % item.size), 0);
    item.ctx.lineTo(item.size * i + (item.x % item.size), item.height);
    item.ctx.stroke();

    // 绘制文字
    item.ctx.font = `${item.size * 0.6}px serif`;
    item.ctx.fillText(Math.ceil(i - cx) + '', item.size * i - 0.5 + (item.x % item.size), item.y + item.size / 2, item.size); // 要让文字居中
  }

  // 同理y轴
  for (let i = 0; i < _rows; i++) {
    item.ctx.beginPath();
    item.ctx.moveTo(0, item.size * i + (item.y % item.size));
    item.ctx.lineTo(item.width, item.size * i + (item.y % item.size));
    item.ctx.stroke();

    // 绘制文字
    item.ctx.font = `${item.size * 0.6}px serif`;
    item.ctx.fillText(Math.ceil(i - cy) + '', item.x, item.size * i - 0.5 + item.size / 2 + (item.y % item.size), item.size);
  }

  // console.timeEnd('time');

  item.ctx.beginPath();
  item.ctx.setLineDash([]); // 恢复实线
  item.ctx.lineWidth = 2; //设置线条宽度
  item.ctx.strokeStyle = '#161a1d'; //设置线条颜色
  item.ctx.moveTo(0, item.y);
  item.ctx.lineTo(item.width, item.y);
  item.ctx.moveTo(item.x, 0);
  item.ctx.lineTo(item.x, item.height);

  item.ctx.stroke();

  // 模拟阻塞操作
  // let tmp = 0;
  // for (let index = 0; index < 60000000; index++) {
  //   tmp++;
  // }
};

/**
 * 绘制单个格子
 *
 * @param item 绘制格子的参数
 */
export const drawSingleItem = (item: SingleItemParamType): void => {
  if (item.data == undefined) return;

  // 计算当前要修改的具体位置(有正负)
  const pixX = item.changeX * item.size + item.x;
  const pixY = item.changeY * item.size + item.y;
  const data = item.data;

  if ('tileSpriteId' in data) {
    // 如果要修改的格子在画布外面则不需要绘制，注意它的起始坐标在左上角，所以要比对四个角完全不在画布里面才不需要绘制
    if (pixX > item.width || pixX + item.size < 0 || pixY > item.height || pixY + item.size < 0) return;
    // 先清空指定位置
    item.ctx.clearRect(pixX, pixY, item.size, item.size);
    // ctx.strokeStyle = data; // 这种是轮廓颜色
    item.ctx.fillStyle = data.color;
    // 绘制色块
    item.ctx.fillRect(pixX, pixY, item.size, item.size);
  }
};

/**
 * 绘制整个画布
 *
 * @param data 绘制整个 Block
 */
export const drawAllItem = (data: AllItemParamType): void => {
  const items = data.items;
  const blocks = data.data;
  const ctx = data.ctx;
  const width = data.width;
  const height = data.height;
  const size = data.size;
  const x = data.x;
  const y = data.y;
  const bsize = Constants.BLOCK_SIZE;

  for (const block of blocks) {
    // 判断位置，如果超出边界直接无需遍历
    if (blockIsOffScreen(width, height, size, x, y, block)) continue;
    // 这块顺便给 Block 绘制一个边框
    drawBlockBox(ctx, size, x, y, block.x, block.y);

    // 开始遍历绘制
    for (let iy = 0; iy < block.data.length; iy++) {
      for (let ix = 0; ix < block.data[iy].length; ix++) {
        const value = block.data[iy][ix];
        if (value != -1) {
          const tile = items.getValue(value);
          // 因为这里的 block.x 是数组最末值，所以需要转换一下，而且需要考虑正负
          const point = blockCoordinateToCoordinate(bsize, block.x, block.y, ix, iy);
          drawSingleItem({
            ctx: ctx,
            width,
            height,
            size,
            x,
            y,
            changeX: point.x,
            changeY: point.y,
            data: tile,
            gridType: GridRuntimeType.SINGLE
          });
        }
      }
    }
  }
};

/**
 * 绘制 Block 盒子（边框）
 * @param ctx 画布元素
 * @param size 单元格宽度
 * @param sx 像素起始点
 * @param sy 像素起始点
 * @param x Block 的终点坐标
 * @param y Block 的终点坐标
 */
export const drawBlockBox = (ctx: CanvasRenderingContext2D, size: number, sx: number, sy: number, x: number, y: number): void => {
  const boxW = size * Constants.BLOCK_SIZE;
  const bsize = Constants.BLOCK_SIZE;

  // 取出基准点
  // const bsx = x + (x > 0 ? -(bsize - 1) : bsize - 1);
  // const bsy = y + (y > 0 ? -(bsize - 1) : bsize - 1);

  // 因为负数是从 -1 开始的，所以需要移动一位
  const fx = x > 0;
  const fy = y > 0;
  const dx = fx ? bsize - 1 : -bsize;
  const dy = fy ? bsize - 1 : -bsize;

  const bsx = x - dx;
  const bsy = y - dy;

  const boxPoint = CoordinateToPix(size, sx, sy, bsx, bsy);

  // console.log(boxPoint);
  const xBoxW = boxW * (x > 0 ? 1 : -1);
  const yBoxW = boxW * (y > 0 ? 1 : -1);

  ctx.beginPath();
  ctx.moveTo(boxPoint.x, boxPoint.y);
  ctx.lineTo(boxPoint.x + xBoxW, boxPoint.y);

  ctx.moveTo(boxPoint.x, boxPoint.y);
  ctx.lineTo(boxPoint.x, boxPoint.y + yBoxW);

  ctx.moveTo(boxPoint.x + xBoxW, boxPoint.y + yBoxW);
  ctx.lineTo(boxPoint.x, boxPoint.y + yBoxW);

  ctx.moveTo(boxPoint.x + xBoxW, boxPoint.y + yBoxW);
  ctx.lineTo(boxPoint.x + xBoxW, boxPoint.y);
  ctx.stroke();
};

/**
 * 清空整个画布
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 */
export const clearAllCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.clearRect(0, 0, width, height);
};

export default {
  drawGrid,
  clearAllCanvas,
  drawSingleItem,
  drawAllItem,
  drawBlockBox
};
