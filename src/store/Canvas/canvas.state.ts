/**
 * 起始点
 */
const initPoint = {
  x: 0,
  y: 0
};

/**
 * 画布大小
 */
const canvasSize = {
  size: 30
};

/**
 * 画布的图层
 */
export enum displayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

const getCanvas = (layer: displayLayer) => {
  const dom = document.getElementById(layer) as HTMLCanvasElement;
  const canvas = dom.getContext('2d');
  return canvas;
};

export const initialState = {
  initPoint,
  canvasSize,
  [displayLayer.FRONT]: getCanvas(displayLayer.FRONT),
  [displayLayer.MIDDLE]: getCanvas(displayLayer.MIDDLE),
  [displayLayer.BACKGROUND]: getCanvas(displayLayer.BACKGROUND)
};

export default initialState;
