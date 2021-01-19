import { defaultStyles } from '../constants'
import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLE,
  APPLY_STYLE,
  CHANGE_TABLE_NAME,
} from './types'

export function rootReducer(state, action) {
  let field
  let style
  let val

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return { ...state, [field]: value(state, field, action) }
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      }
    case CHANGE_TABLE_NAME:
      field = 'tableName'
      return { ...state, [field]: action.data.value.trim() }
    case CHANGE_STYLE:
      // вот здесь в action.data прилетает только назначенный стиль из ячейки
      // и соответственно в currentStyles попадает только назначенный стиль
      // а остальные стили остаются пустыми
      // поэтому тулбар и отрисывывает только назначенный стиль
      style = action.data || defaultStyles
      Object.keys(style).forEach((key) => {
        style[key] = style[key] === '' ? defaultStyles[key] : style[key]
      })
      return { ...state, currentStyles: style }
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || defaultStyles
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value }
      })
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      }

    default:
      return { ...state, lastOpen: new Date().toLocaleString() }
  }
}

function value(state, field, action) {
  const val = { ...state[field] } || {}
  val[action.data.id] = action.data.value
  return val
}
