import { $ } from '@core/dom'

export function tableResizeHandler(event, $root) {
  const $resizer = $(event.target)
  if ($resizer.data.resize == 'col') {
    const $vertResizer = $resizer.find('[data-type="vertical-bar"]')
    const tableHeight = $root.height - $resizer.height - 2

    $vertResizer.css({ height: tableHeight + 'px', opacity: 1 })
  } else {
    const $horResizer = $resizer.find('[data-type="horizontal-bar"]')
    const tableWidth = $root.width - $resizer.width - 2

    $horResizer.css({ width: tableWidth + 'px', opacity: 1 })
  }

  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()

  let value
  document.onmousemove = (e) => {
    if ($resizer.data.resize == 'col') {
      value = coords.width + e.pageX - coords.right
      $resizer.css({ left: value + 'px' })
    } else {
      value = coords.height + e.pageY - coords.bottom
      $resizer.css({ top: value + 'px' })
    }
  }

  document.onmouseup = (e) => {
    if ($resizer.data.resize == 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`).forEach((col) => {
        $(col).css({ width: value + 'px' })
      })
    } else {
      $parent.css({ height: value + 'px' })
    }
    $resizer.css({ top: '', opacity: 0, left: '' })

    document.onmousemove = null
    document.onmouseup = null
  }
}
