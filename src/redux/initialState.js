import { defaultStyles, tableName } from '../constants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: tableName,
  lastOpen: new Date().toLocaleString(),
}

function normalize(state) {
  return { ...state, currentStyles: defaultStyles, currentText: '' }
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : { ...defaultState }
}
