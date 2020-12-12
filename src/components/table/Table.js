import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
// import { $ } from '@core/dom'
import { tableResizeHandler } from './table.resizeHandler'
import { shouldResize } from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(event, this.$root)
    }
  }

  onMousemove(event) {}

  onMouseup(event) {}

  toHTML() {
    return createTable(15)
  }
}
