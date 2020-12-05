import { capitalize } from '@core/utils'

export class DomListeneer {
  constructor(root, listeners = []) {
    // корневой элемент DOM, на который будут вешаться прослушиватели
    // событий
    if (!root) {
      throw new Error('No root provided for DOMListener')
    }
    this.$root = root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        )
      }
      this[method] = this[method].bind(this)

      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        )
      }

      this.$root.off(listener, this[method])
    })
  }
}

// event => "on"+Event
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
