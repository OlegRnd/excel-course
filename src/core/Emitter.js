export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // подписываемся на событие, в результате которого должна быть вызвана
  // функция fn
  // event - произвольное название события.
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        listener !== fn
      })
    }
  }

  // вызов функций с параметрами args, подписанных на событие "event"
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })

    return true
  }
}

// const emitter = new Emitter()

// const unsub = emitter.subscribe('event1', (data, data1) => {
//   console.log(data, data1)
// })
// emitter.emit('event1', 42, 43)

// unsub('event1')
// console.log('---------------')
// emitter.emit('event1', 42, 43)
