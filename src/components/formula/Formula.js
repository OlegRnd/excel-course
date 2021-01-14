import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" data-type="input" contenteditable spellcheck="false"></div>
    `
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:enter')
    }
  }

  storeChange({ currentText }) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula:input', text)
  }

  init() {
    super.init()
    this.$formula = this.$root.find('[data-type="input"]')

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value || $cell.text())
    })
  }
}
