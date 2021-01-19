export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.state = this.rootReducer(initialState, { type: '__INIT__' })
    this.listeners = []
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach((fn) => fn(this.state))
  }

  subscribe(fn) {
    this.listeners.push(fn)
    const unsubscribe = () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
    return { unsubscribe }
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
