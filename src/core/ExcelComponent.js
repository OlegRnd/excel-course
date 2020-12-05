import { DomListeneer } from './DomListener'

export class ExcelComponent extends DomListeneer {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
  }
  //  Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
