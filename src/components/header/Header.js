import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '@core/dom'
import * as actions from '@/redux/actions'
import { tableName } from '../../constants'
import { debounce } from '../../core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(
      actions.changeTableName({
        value: $target.text() || tableName,
      })
    )
  }

  createHeader(state) {
    return `
      <input type="text" class="input" value="${state.tableName}" />

      <div>
        <div class="button">
          <span class="material-icons"> delete </span>
        </div>

        <div class="button">
          <span class="material-icons"> exit_to_app </span>
        </div>
      </div>
    `
  }

  toHTML() {
    return this.createHeader(this.store.getState())
  }
}
