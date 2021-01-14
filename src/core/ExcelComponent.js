import { DomListeneer } from './DomListener'

export class ExcelComponent extends DomListeneer {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []

    this.prepare()
  }
  // настраиваем наш компонент до init()
  prepare() {}

  //  Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // инициализация компонента
  // DOM слушатели
  // Подписчики событий
  init() {
    this.initDOMListeners()
  }
  // Фасад для события emit
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // фасад для события subscribe
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  storeChange(changes) {}

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
