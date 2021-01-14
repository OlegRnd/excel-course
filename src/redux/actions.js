import {
  APPLY_STYLE,
  CHANGE_STYLE,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT,
  TABLE_RESIZE,
} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data, // id ячейки, value - текст ячейки
  }
}

//data: value, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLE,
    data,
  }
}

export function changeTableName(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data,
  }
}
