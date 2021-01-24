import { $ } from '../dom.js'
import { ActiveRoute } from './ActiveRoute'
export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.page = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler(event) {
    if (this.page) {
      this.page.destroy()
    }
    const defaultPage = 'dashboard'

    this.$placeholder.clear()
    const param = ActiveRoute.param[0]
    const Page = this.routes[param] || this.routes[defaultPage]
    this.page = new Page(ActiveRoute.param.splice(1))

    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
