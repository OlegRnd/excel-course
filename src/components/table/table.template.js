import { toInlineStyles } from '@core/utils'

import { parse } from '@core/parse'

const CODES = {
  A: 65,
  Z: 90,
}

function createRow(columns = '', index = 0, state = {}) {
  const height = index ? getHeight(state, index) : ''

  const resize = index
    ? `<div class="row-resize" data-resize="row">
    <div class="col-resize-horizontal-bar" data-type="horizontal-bar"></div>  
  </div>`
    : ``

  return `
    <div class="row" ${height} data-type="resizable" data-row="${index}">
      <div class="row-info" >
        ${index || ''}
        ${resize}
      </div> 
      <div class="row-data" data-row-number="${index}">
      ${columns}
      </div>
    </div>
  `
}

function getWidth(state, index) {
  if (!state) return ''
  const width = state[index] || null
  return width !== null ? `width: ${width}px` : ''
}

function getHeight(state, index) {
  if (!state) return ''
  const height = state[index] || null
  return height !== null ? `style="height:${height}px"` : ''
}

function toColumn(state) {
  //eslint-disable-next-line
  return function (content = '', index) {
    const width = getWidth(state, index)
      ? `style="${getWidth(state, index)}"`
      : ''
    return `
      <div class="column" ${width} data-type="resizable" data-col="${index}"> 
        ${content}
        <div class="col-resize" data-resize="col">
          <div class="col-resize-vertical-bar" data-type="vertical-bar"></div>
        </div>
      </div>
    `
  }
}

function toCell(state, row) {
  //eslint-disable-next-line
  return function (_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]

    //const cellStyle = { ...defaultStyles, ...state.stylesState[id] }
    const styles = toInlineStyles(state.stylesState[id] || {})

    return `
        <div class="cell" 
          contenteditable="true"
          data-col="${col}"
          data-type="cell"
          data-value="${data || ''}"
          data-id="${row}:${col}"
          style="${styles}; ${width}"
        >
            ${parse(data) || ''}
        </div>
      `
  }
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 17, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1

  const rows = new Array(rowsCount)

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(state.colState))
    .join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cols = new Array(colsCount).fill('').map(toCell(state, row)).join('')
    rows.push(createRow(cols, row + 1, state.rowState))
  }

  return rows.join('')
}
