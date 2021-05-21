const getters = {
  status: (state: any) => state.status,
  selectKeys: (state: any) => state.keys,
  selectPressedKeys: (state: any) =>
    Object.entries(state.keys)
      .filter(([_key, value]) => value)
      .map(item => item[0]),

  isRightDown: (state: any) => state.keys['RIGHT_ARROW'],
  isLeftDown: (state: any) => state.keys['LEFT_ARROW'],
  isUpDown: (state: any) => state.keys['UP_ARROW'],
  isDownDown: (state: any) => state.keys['DOWN_ARROW'],
};

export default getters;
