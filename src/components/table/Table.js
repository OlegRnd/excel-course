import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/dom'
import { tableResizeHandler } from './table.resizeHandler'
import { moveSelector, shouldResize } from './table.functions'
import { isCell } from './table.functions'
import { matrix } from './table.functions'

import { TableSelection } from './TableSelection'
import * as actions from '@/redux/actions'
import { defaultStyles } from '../../constants'

import { parse } from '@core/parse'

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

    this.$on('formula:input', (value) => {
      this.tableSelection.current.attr('data-value', value).text(parse(value))

      this.updateTextInStore(value)
    })
    this.$on('formula:enter', () => {
      this.tableSelection.current.focus()
    })
    this.$on('toolbar:applyStyle', (value) => {
      this.tableSelection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.tableSelection.selectedIds,
        })
      )
    })
  }

  selectCell($cell, ctrlKey = false, shiftKey = false) {
    if ($cell.exists()) {
      this.tableSelection.select($cell, ctrlKey, shiftKey)
      this.$emit('table:select', $cell)

      const styles = $cell.getStyles(Object.keys(defaultStyles))
      this.$dispatch(actions.changeStyles(styles))
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

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.tableSelection.current.id,
        value,
      })
    )
  }

  onInput(event) {
    this.updateTextInStore(this.tableSelection.current.text())
  }

  async tableResize(event) {
    try {
      const data = await tableResizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event)
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
    return createTable(15, this.store.getState())
  }
}
