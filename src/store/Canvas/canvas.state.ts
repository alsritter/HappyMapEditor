import Constants from '../../core/util/Constants';

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
  size: Constants.DEFAULT_SIZE
};

export const initialState = {
  canvasSize,
  initPoint
};

export type CanvasState = typeof initialState;

export default initialState;
