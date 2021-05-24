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

const dragCanvas = (canvasDOM: HTMLCanvasElement) => {
  // 参考资料 https://www.jianshu.com/p/80d37f5763a5
  // canvasDOM.onmousedown = (event: MouseEvent) => {
  //   if (typeof event === 'object') {
  //     //鼠标的x坐标减去box的左边距离，unchangeX 这个距离是不会变的，通过这个新鼠标的X坐标减去 unchangeX 就是box的Left
  //     const unchangeX = event.clientX - canvasDOM.offsetLeft;
  //     const unchangeY = event.clientY - canvasDOM.offsetTop;
  //     canvasDOM.onmousemove = (event: MouseEvent) => {
  //       let oLeft = event.clientX - unchangeX;
  //       let oTop = event.clientY - unchangeY;
  //       //优化部分：鼠标移动到浏览器左侧、右侧、上侧、下侧时的问题
  //       if (oLeft < 0) {
  //         oLeft = 0;
  //       } else if (oLeft > document.documentElement.clientWidth - canvasDOM.offsetWidth) {
  //         oLeft = document.documentElement.clientWidth - canvasDOM.offsetWidth;
  //       }
  //       if (oTop < 0) {
  //         oTop = 0;
  //       } else if (oTop > document.documentElement.clientHeight - canvasDOM.offsetHeight) {
  //         oTop = document.documentElement.clientHeight - canvasDOM.offsetHeight;
  //       }
  //       currentX.value = oLeft;
  //       currentY.value = oTop;
  //       bus.emit('refreshCanvas');
  //     };
  //   }
  // };
  // // 恢复
  // canvasDOM.onmouseup = (event: MouseEvent) => {
  //   canvasDOM.onmousemove = null;
  // };
};
