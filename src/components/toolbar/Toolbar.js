import { ExcelStateComponent } from '../../core/ExcelStateComponent'
import { createToolbar } from './toolbar.template.js'
import { $ } from '@core/dom'
import { defaultStyles } from '../../constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChange(changes) {
    this.setState(changes.currentStyles)
  }
}
