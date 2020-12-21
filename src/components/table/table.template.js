const CODES = {
  A: 65,
  Z: 90,
}

function createRow(columns = '', info = 0) {
  const resize = info
    ? `<div class="row-resize" data-resize="row">
    <div class="col-resize-horizontal-bar" data-type="horizontal-bar"></div>  
  </div>`
    : ``

  return `
    <div class="row" data-type="resizable">
      <div class="row-info" >
        ${info || ''}
        ${resize}
      </div> 
      <div class="row-data" data-row-number="${info}">
      ${columns}
      </div>
    </div>
  `
}

function toColumn(content = '', col) {
  return `
    <div class="column" data-type="resizable" data-col="${col}"> 
      ${content}
      <div class="col-resize" data-resize="col">
        <div class="col-resize-vertical-bar" data-type="vertical-bar"></div>
      </div>
    </div>
  `
}

function toCell(row) {
  //eslint-disable-next-line
  return function (content = '', col) {
    return `
        <div class="cell" 
          contenteditable="true"
          tabindex="1" 
          data-col="${col}"
          data-type="cell"
          data-id="${row}:${col}"
        >
            ${content}
        </div>
      `
  }
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 17) {
  const colsCount = CODES.Z - CODES.A + 1

  const rows = new Array(rowsCount)

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cols = new Array(colsCount).fill('').map(toCell(row)).join('')
    rows.push(createRow(cols, row + 1))
  }

  return rows.join('')
}
