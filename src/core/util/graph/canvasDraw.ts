/**
 * 这里专门用来绘制画布
 */

export const drawGrid = (ctx: CanvasRenderingContext2D, width: number, hight: number, size: number, x: number, y: number): void => {
  // 计算数量
  const _cols = width / size;
  const _rows = _cols;

  // 绘制线条
  for (let i = 0; i < _cols; i++) {
    ctx.beginPath(); // 开启路径，设置不同的样式
    ctx.moveTo(size * i - 0.5, y); // -0.5是为了解决像素模糊问题
    ctx.lineTo(size * i - 0.5, hight);
    ctx.setLineDash([1, 2]); //绘制虚线
    ctx.strokeStyle = '#2a2a2a'; // 设置每个线条的颜色
    ctx.stroke();
  }
  // 同理y轴
  for (let i = 0; i < _rows; i++) {
    ctx.beginPath(); // 开启路径，设置不同的样式
    ctx.moveTo(x, size * i - 0.5);
    ctx.lineTo(width, size * i - 0.5);
    ctx.strokeStyle = '#2a2a2a';
    ctx.stroke();
  }
};

export const clearAllCanvas = (ctx: CanvasRenderingContext2D, width: number, hight: number): void => {
  ctx.clearRect(0, 0, width, hight);
};

export default {
  drawGrid,
  clearAllCanvas
};
