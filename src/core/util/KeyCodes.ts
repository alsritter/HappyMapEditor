/**
 * 按键表，后面的数字是监听传入的按键码
 * 对应的 KEY CODE 查询
 * https://keycode.info/
 * 这里的常量参考自：
 * https://github.com/kabirbaidhya/keycode-js/blob/master/mod.d.ts
 */
export const keyCodes = {
  KEY_CANCEL: 3,
  KEY_HELP: 6,
  KEY_BACK_SPACE: 8,
  KEY_TAB: 9,
  KEY_CLEAR: 12,
  KEY_RETURN: 13,
  KEY_SHIFT: 16,
  KEY_CONTROL: 17,
  KEY_ALT: 18,
  KEY_PAUSE: 19,
  KEY_CAPS_LOCK: 20,
  KEY_ESCAPE: 27,
  KEY_SPACE: 32,
  KEY_PAGE_UP: 33,
  KEY_PAGE_DOWN: 34,
  KEY_END: 35,
  KEY_HOME: 36,
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
  KEY_PRINTSCREEN: 44,
  KEY_INSERT: 45,
  KEY_DELETE: 46,
  KEY_0: 48,
  KEY_1: 49,
  KEY_2: 50,
  KEY_3: 51,
  KEY_4: 52,
  KEY_5: 53,
  KEY_6: 54,
  KEY_7: 55,
  KEY_8: 56,
  KEY_9: 57,
  KEY_A: 65,
  KEY_B: 66,
  KEY_C: 67,
  KEY_D: 68,
  KEY_E: 69,
  KEY_F: 70,
  KEY_G: 71,
  KEY_H: 72,
  KEY_I: 73,
  KEY_J: 74,
  KEY_K: 75,
  KEY_L: 76,
  KEY_M: 77,
  KEY_N: 78,
  KEY_O: 79,
  KEY_P: 80,
  KEY_Q: 81,
  KEY_R: 82,
  KEY_S: 83,
  KEY_T: 84,
  KEY_U: 85,
  KEY_V: 86,
  KEY_W: 87,
  KEY_X: 88,
  KEY_Y: 89,
  KEY_Z: 90,
  KEY_LEFT_CMD: 91,
  KEY_RIGHT_CMD: 92,
  KEY_CONTEXT_MENU: 93,
  KEY_NUMPAD0: 96,
  KEY_NUMPAD1: 97,
  KEY_NUMPAD2: 98,
  KEY_NUMPAD3: 99,
  KEY_NUMPAD4: 100,
  KEY_NUMPAD5: 101,
  KEY_NUMPAD6: 102,
  KEY_NUMPAD7: 103,
  KEY_NUMPAD8: 104,
  KEY_NUMPAD9: 105,
  KEY_MULTIPLY: 106,
  KEY_ADD: 107,
  KEY_SUBTRACT: 109,
  KEY_DECIMAL: 110,
  KEY_DIVIDE: 111,
  KEY_F1: 112,
  KEY_F2: 113,
  KEY_F3: 114,
  KEY_F4: 115,
  KEY_F5: 116,
  KEY_F6: 117,
  KEY_F7: 118,
  KEY_F8: 119,
  KEY_F9: 120,
  KEY_F10: 121,
  KEY_F11: 122,
  KEY_F12: 123,
  KEY_F13: 124,
  KEY_F14: 125,
  KEY_F15: 126,
  KEY_F16: 127,
  KEY_F17: 128,
  KEY_F18: 129,
  KEY_F19: 130,
  KEY_F20: 131,
  KEY_F21: 132,
  KEY_F22: 133,
  KEY_F23: 134,
  KEY_F24: 135,
  KEY_NUM_LOCK: 144,
  KEY_SCROLL_LOCK: 145,
  KEY_SEMICOLON: 186,
  KEY_EQUALS: 187,
  KEY_COMMA: 188,
  KEY_DASH: 189,
  KEY_PERIOD: 190,
  KEY_SLASH: 191,
  KEY_BACK_QUOTE: 192,
  KEY_OPEN_BRACKET: 219,
  KEY_BACK_SLASH: 220,
  KEY_CLOSE_BRACKET: 221,
  KEY_QUOTE: 222,
  KEY_FIREFOX_ENTER: 14,
  KEY_FIREFOX_SEMICOLON: 59,
  KEY_FIREFOX_EQUALS: 61,
  KEY_FIREFOX_SEPARATOR: 108,
  KEY_FIREFOX_META: 224,
  VALUE_CANCEL: 'Cancel',
  VALUE_HELP: 'Help',
  VALUE_BACK_SPACE: 'Backspace',
  VALUE_TAB: 'Tab',
  VALUE_CLEAR: 'Clear',
  VALUE_ENTER: 'Enter',
  VALUE_RETURN: 'Enter',
  VALUE_SHIFT: 'Shift',
  VALUE_CONTROL: 'Control',
  VALUE_ALT: 'Alt',
  VALUE_PAUSE: 'Pause',
  VALUE_CAPS_LOCK: 'CapsLock',
  VALUE_ESCAPE: 'Escape',
  VALUE_SPACE: ' ',
  VALUE_PAGE_UP: 'PageUp',
  VALUE_PAGE_DOWN: 'PageDown',
  VALUE_END: 'End',
  VALUE_HOME: 'Home',
  VALUE_LEFT: 'ArrowLeft',
  VALUE_UP: 'ArrowUp',
  VALUE_RIGHT: 'ArrowRight',
  VALUE_DOWN: 'ArrowDown',
  VALUE_PRINTSCREEN: 'PrintScreen',
  VALUE_INSERT: 'Insert',
  VALUE_DELETE: 'Delete',
  VALUE_0: '0',
  VALUE_1: '1',
  VALUE_2: '2',
  VALUE_3: '3',
  VALUE_4: '4',
  VALUE_5: '5',
  VALUE_6: '6',
  VALUE_7: '7',
  VALUE_8: '8',
  VALUE_9: '9',
  VALUE_A: 'a',
  VALUE_B: 'b',
  VALUE_C: 'c',
  VALUE_D: 'd',
  VALUE_E: 'e',
  VALUE_F: 'f',
  VALUE_G: 'g',
  VALUE_H: 'h',
  VALUE_I: 'i',
  VALUE_J: 'j',
  VALUE_K: 'k',
  VALUE_L: 'l',
  VALUE_M: 'm',
  VALUE_N: 'n',
  VALUE_O: 'o',
  VALUE_P: 'p',
  VALUE_Q: 'q',
  VALUE_R: 'r',
  VALUE_S: 's',
  VALUE_T: 't',
  VALUE_U: 'u',
  VALUE_V: 'v',
  VALUE_W: 'w',
  VALUE_X: 'x',
  VALUE_Y: 'y',
  VALUE_Z: 'z',
  VALUE_META: 'Meta',
  VALUE_LEFT_CMD: 'Meta',
  VALUE_RIGHT_CMD: 'Meta',
  VALUE_CONTEXT_MENU: 'ContextMenu',
  VALUE_NUMPAD0: '0',
  VALUE_NUMPAD1: '1',
  VALUE_NUMPAD2: '2',
  VALUE_NUMPAD3: '3',
  VALUE_NUMPAD4: '4',
  VALUE_NUMPAD5: '5',
  VALUE_NUMPAD6: '6',
  VALUE_NUMPAD7: '7',
  VALUE_NUMPAD8: '8',
  VALUE_NUMPAD9: '9',
  VALUE_MULTIPLY: '*',
  VALUE_ADD: '+',
  VALUE_SUBTRACT: '-',
  VALUE_DECIMAL: '.',
  VALUE_DIVIDE: '/',
  VALUE_F1: 'F1',
  VALUE_F2: 'F2',
  VALUE_F3: 'F3',
  VALUE_F4: 'F4',
  VALUE_F5: 'F5',
  VALUE_F6: 'F6',
  VALUE_F7: 'F7',
  VALUE_F8: 'F8',
  VALUE_F9: 'F9',
  VALUE_F10: 'F10',
  VALUE_F11: 'F11',
  VALUE_F12: 'F12',
  VALUE_F13: 'F13',
  VALUE_F14: 'F14',
  VALUE_F15: 'F15',
  VALUE_F16: 'F16',
  VALUE_F17: 'F17',
  VALUE_F18: 'F18',
  VALUE_F19: 'F19',
  VALUE_F20: 'F20',
  VALUE_F21: 'F21',
  VALUE_F22: 'F22',
  VALUE_F23: 'F23',
  VALUE_F24: 'F24',
  VALUE_NUM_LOCK: 'NumLock',
  VALUE_SCROLL_LOCK: 'ScrollLock',
  VALUE_SEMICOLON: ',',
  VALUE_EQUALS: ':',
  VALUE_COMMA: ',',
  VALUE_DASH: '-',
  VALUE_PERIOD: '.',
  VALUE_SLASH: '/',
  VALUE_BACK_QUOTE: '`',
  VALUE_OPEN_BRACKET: '[',
  VALUE_BACK_SLASH: '\\',
  VALUE_CLOSE_BRACKET: ']',
  VALUE_QUOTE: "'",
  CODE_UNIDENTIFIED: 'Unidentified',
  CODE_ESCAPE: 'Escape',
  CODE_MINUS: 'Minus',
  CODE_DASH: 'Minus',
  CODE_EQUALS: 'Equal',
  CODE_BACK_SPACE: 'Backspace',
  CODE_TAB: 'Tab',
  CODE_ENTER: 'Enter',
  CODE_RETURN: 'Enter',
  CODE_SHIFT_LEFT: 'ShiftLeft',
  CODE_SHIFT_RIGHT: 'ShiftRight',
  CODE_CONTROL_LEFT: 'ControlLeft',
  CODE_CONTROL_RIGHT: 'ControlRight',
  CODE_ALT_LEFT: 'AltLeft',
  CODE_ALT_RIGHT: 'AltRight',
  CODE_PAUSE: 'Pause',
  CODE_CAPS_LOCK: 'CapsLock',
  CODE_SPACE: 'Space',
  CODE_PAGE_UP: 'PageUp',
  CODE_PAGE_DOWN: 'PageDown',
  CODE_END: 'End',
  CODE_HOME: 'Home',
  CODE_LEFT: 'ArrowLeft',
  CODE_UP: 'ArrowUp',
  CODE_RIGHT: 'ArrowRight',
  CODE_DOWN: 'ArrowDown',
  CODE_PRINTSCREEN: 'PrintScreen',
  CODE_INSERT: 'Insert',
  CODE_DELETE: 'Delete',
  CODE_0: 'Digit0',
  CODE_1: 'Digit1',
  CODE_2: 'Digit2',
  CODE_3: 'Digit3',
  CODE_4: 'Digit4',
  CODE_5: 'Digit5',
  CODE_6: 'Digit6',
  CODE_7: 'Digit7',
  CODE_8: 'Digit8',
  CODE_9: 'Digit9',
  CODE_A: 'KeyA',
  CODE_B: 'KeyB',
  CODE_C: 'KeyC',
  CODE_D: 'KeyD',
  CODE_E: 'KeyE',
  CODE_F: 'KeyF',
  CODE_G: 'KeyG',
  CODE_H: 'KeyH',
  CODE_I: 'KeyI',
  CODE_J: 'KeyJ',
  CODE_K: 'KeyK',
  CODE_L: 'KeyL',
  CODE_M: 'KeyM',
  CODE_N: 'KeyN',
  CODE_O: 'KeyO',
  CODE_P: 'KeyP',
  CODE_Q: 'KeyQ',
  CODE_R: 'KeyR',
  CODE_S: 'KeyS',
  CODE_T: 'KeyT',
  CODE_U: 'KeyU',
  CODE_V: 'KeyV',
  CODE_W: 'KeyW',
  CODE_X: 'KeyX',
  CODE_Y: 'KeyY',
  CODE_Z: 'KeyZ',
  CODE_META_LEFT: 'MetaLeft',
  CODE_OS_LEFT: 'OSLeft',
  CODE_META_RIGHT: 'MetaRight',
  CODE_OS_RIGHT: 'OSRight',
  CODE_CONTEXT_MENU: 'ContextMenu',
  CODE_NUMPAD0: 'Numpad0',
  CODE_NUMPAD1: 'Numpad1',
  CODE_NUMPAD2: 'Numpad2',
  CODE_NUMPAD3: 'Numpad3',
  CODE_NUMPAD4: 'Numpad4',
  CODE_NUMPAD5: 'Numpad5',
  CODE_NUMPAD6: 'Numpad6',
  CODE_NUMPAD7: 'Numpad7',
  CODE_NUMPAD8: 'Numpad8',
  CODE_NUMPAD9: 'Numpad9',
  CODE_NUMPAD_MULTIPLY: 'NumpadMultiply',
  CODE_NUMPAD_ADD: 'NumpadAdd',
  CODE_NUMPAD_SUBTRACT: 'NumpadSubtract',
  CODE_NUMPAD_DECIMAL: 'NumpadDecimal',
  CODE_NUMPAD_DIVIDE: 'NumpadDivide',
  CODE_NUMPAD_ENTER: 'NumpadEnter',
  CODE_F1: 'F1',
  CODE_F2: 'F2',
  CODE_F3: 'F3',
  CODE_F4: 'F4',
  CODE_F5: 'F5',
  CODE_F6: 'F6',
  CODE_F7: 'F7',
  CODE_F8: 'F8',
  CODE_F9: 'F9',
  CODE_F10: 'F10',
  CODE_F11: 'F11',
  CODE_F12: 'F12',
  CODE_F13: 'F13',
  CODE_F14: 'F14',
  CODE_F15: 'F15',
  CODE_F16: 'F16',
  CODE_F17: 'F17',
  CODE_F18: 'F18',
  CODE_F19: 'F19',
  CODE_F20: 'F20',
  CODE_F21: 'F21',
  CODE_F22: 'F22',
  CODE_F23: 'F23',
  CODE_F24: 'F24',
  CODE_NUM_LOCK: 'NumLock',
  CODE_SCROLL_LOCK: 'ScrollLock',
  CODE_SEMICOLON: 'Semicolon',
  CODE_COMMA: 'Comma',
  CODE_PERIOD: 'Period',
  CODE_SLASH: 'Slash',
  CODE_BACK_QUOTE: 'Backquote',
  CODE_OPEN_BRACKET: 'BracketLeft',
  CODE_BACK_SLASH: 'Backslash',
  CODE_CLOSE_BRACKET: 'BracketRight',
  CODE_QUOTE: 'Quote'
};

export default keyCodes;