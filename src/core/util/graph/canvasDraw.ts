import { GridParamType, DataParamType } from '@/core/util/graph';
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
  const _rows = _cols;

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
 * 绘制内容
 *
 * @param item 绘制格子的参数
 */
export const drawData = (item: DataParamType): void => {
  // 计算当前要修改的具体位置(有正负)
  const pixX = item.changeX * item.size + item.x;
  const pixY = item.changeY * item.size + item.y;

  // 如果要修改的格子在画布外面则不需要绘制，注意它的起始坐标在左上角，所以要比对四个角完全不在画布里面才不需要绘制
  if (pixX > item.width || pixX + item.size < 0 || pixY > item.height || pixY + item.size < 0) return;
  // 先清空指定位置
  item.ctx.clearRect(pixX, pixY, item.size, item.size);
  // ctx.strokeStyle = data; // 这种是轮廓颜色
  item.ctx.fillStyle = item.data;
  // 绘制色块
  item.ctx.fillRect(pixX, pixY, item.size, item.size);
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
  drawData
};
