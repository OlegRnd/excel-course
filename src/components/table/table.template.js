const CODES = {
  A: 65,
  Z: 90,
}

function createRow(columns = '', info = '') {
  return `
    <div class="row">
      <div class="row-info">${info}</div>
      <div class="row-data">
      ${columns}
      </div>
    </div>
  `
}

function toColumn(content = '') {
  return `
    <div class="column"> ${content}</div>
  `
}

function toCell(content = '') {
  return `
    <div class="cell" contenteditable="true">${content}</div>
  `
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 17) {
  const colsCount = CODES.Z - CODES.A + 1

  const rows = new Array(rowsCount)

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cols = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(cols, i + 1))
  }

  return rows.join('')
}
