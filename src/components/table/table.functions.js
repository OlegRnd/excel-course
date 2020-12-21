import { range } from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type == 'cell'
}

export function matrix(targetId, currentId) {
  const cols = range(currentId.col, targetId.col)
  const rows = range(currentId.row, targetId.row)

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])

  return ids
}

export function moveSelector(key, { row, col }) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'ArrowUp':
      row = row > MIN_VALUE ? row - 1 : row
      break
    case 'ArrowLeft':
      col = col > MIN_VALUE ? col - 1 : col
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    default:
      return false
  }
  return { row, col }
}
