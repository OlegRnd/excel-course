import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '@core/dom'
import * as actions from '@/redux/actions'
import { tableName } from '../../constants'
import { debounce, storageDelete } from '../../core/utils'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = $target.data.value
      switch (value) {
        case 'delete':
          storageDelete('excel:' + ActiveRoute.param[1])

        //eslint-disable-next-line
        case 'exit':
          document.location.href = '#'
          break
      }
    }
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
        <div class="button" data-type="button" data-value="delete">
          <span class="material-icons nopointer" data-type="button" data-value="delete"> delete </span>
        </div>

        <div class="button" data-type="button" data-value="exit">
          <span class="material-icons nopointer" data-type="button" data-value="exit"> exit_to_app </span>
        </div>
      </div>
    `
  }

  toHTML() {
    return this.createHeader(this.store.getState())
  }
}
