import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/dom'
import { tableResizeHandler } from './table.resizeHandler'
import { moveSelector, shouldResize } from './table.functions'
import { isCell } from './table.functions'
import { matrix } from './table.functions'

import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }
  prepare() {
    this.tableSelection = new TableSelection(this.$root)
  }

  init() {
    super.init()
    const $startCell = this.$root.find('[data-id="0:0"]')
    this.tableSelection.select($startCell)
    this.selectCell($startCell)

    this.$on('formula:input', (text) => {
      this.tableSelection.current.text(text)
    })
    this.$on('formula:enter', () => {
      this.tableSelection.current.focus()
    })
  }
  selectCell($cell, ctrlKey = false, shiftKey = false) {
    if ($cell.exists()) {
      this.tableSelection.select($cell, ctrlKey, shiftKey)
      this.$emit('table:select', $cell)
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]

    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.tableSelection.current.parseId()
      const next = moveSelector(key, id)

      const $newTarget = this.$root.find(`[data-id="${next.row}:${next.col}"]`)
      this.selectCell($newTarget)
    }
  }

  onInput(event) {
    this.$emit('table:input', this.tableSelection.current.text())
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix(
          $target.parseId(),
          this.tableSelection.current.parseId()
        ).map((id) => this.$root.find(`[data-id="${id}"]`))

        this.tableSelection.selectGroup($cells, event.ctrlKey, $target)
      } else {
        this.selectCell($target, event.ctrlKey)
      }
    }
  }

  toHTML() {
    return createTable(15)
  }
}
