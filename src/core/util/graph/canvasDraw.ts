/**
 * 这里专门用来绘制网格
 *
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 每个格子的大小
 * @param x 起始点 X
 * @param y 起始点 Y
 */
export const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, size: number, x: number, y: number): void => {
  // 要绘制网格必定要刷新画布
  clearAllCanvas(ctx, width, height);

  // 计算数量
  const _cols = width / size;
  const _rows = _cols;

  // CanvasRenderingContext2D.beginPath() 是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
  // ctx.beginPath(); // 开始绘制线条，若不使用 beginPath，则不能绘制多条线条
  ctx.setLineDash([1, 2]); //绘制虚线
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 1; //设置线条宽度

  // 计算当前中心点的所在格子位置 这里不要使用 floor 取值，效率有问题
  // ceil 向上取整 floor 向下取整
  // const cx = (0.5 + (x / width) * _cols) | 0;
  // const cy = (0.5 + (y / hight) * _rows) | 0;
  const cx = (x / width) * _cols;
  const cy = (y / height) * _rows;

  // console.time('time');

  // 绘制线条
  for (let i = 0; i < _cols; i++) {
    ctx.beginPath();
    ctx.moveTo(size * i + (x % size), 0);
    ctx.lineTo(size * i + (x % size), height);
    ctx.stroke();

    // 绘制文字
    ctx.font = `${size * 0.6}px serif`;
    ctx.fillText(Math.ceil(i - cx) + '', size * i - 0.5 + (x % size), y + size / 2, size); // 要让文字居中
  }

  // 同理y轴
  for (let i = 0; i < _rows; i++) {
    ctx.beginPath();
    ctx.moveTo(0, size * i + (y % size));
    ctx.lineTo(width, size * i + (y % size));
    ctx.stroke();

    // 绘制文字
    ctx.font = `${size * 0.6}px serif`;
    ctx.fillText(Math.ceil(i - cy) + '', x, size * i - 0.5 + size / 2 + (y % size), size);
  }

  // console.timeEnd('time');

  ctx.beginPath();
  ctx.setLineDash([]); // 恢复实线
  ctx.lineWidth = 2; //设置线条宽度
  ctx.strokeStyle = '#161a1d'; //设置线条颜色
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);

  ctx.stroke();

  // 模拟阻塞操作
  // let tmp = 0;
  // for (let index = 0; index < 30000000; index++) {
  //   tmp++;
  // }
};

/**
 * 绘制内容
 *
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 每个格子的大小
 * @param x 起始点 X 位置
 * @param y 起始点 Y 位置
 * @param changeX 待修改的位置
 * @param changeY 待修改的位置
 * @param data 要绘制的数据
 */
export const drawData = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  x: number,
  y: number,
  changeX: number,
  changeY: number,
  data: string
): void => {
  // 计算当前要修改的具体位置(有正负)
  const pixX = changeX * size + x;
  const pixY = changeY * size + y;

  // 如果要修改的格子在画布外面则不需要绘制，注意它的起始坐标在左上角，所以要比对四个角完全不在画布里面才不需要绘制
  if (pixX > width || pixX + size < 0 || pixY > height || pixY + size < 0) return;
  // 先清空指定位置
  ctx.clearRect(pixX, pixY, size, size);
  // 绘制色块
  ctx.fillRect(pixX, pixY, size, size);
  // // 绘制文字
  // ctx.font = `${size * 0.7}px serif`;
  // ctx.fillText(data, pixX + size / 2, pixY + size / 2, size); // 要让文字居中
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
