import { storage } from '@core/utils.js'
import { defaultStyles, tableName } from '../constants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: tableName,
}

function normalize(state) {
  return { ...state, currentStyles: defaultStyles, currentText: '' }
}

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
