import { Loader } from '../../components/Loader.js'
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
    this.loader = new Loader()
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler(event) {
    if (this.page) {
      this.page.destroy()
    }
    const defaultPage = 'dashboard'

    this.$placeholder.clear().append(this.loader)
    const param = ActiveRoute.param[0]
    const Page = this.routes[param] || this.routes[defaultPage]
    this.page = new Page(ActiveRoute.param.splice(1))

    const root = await this.page.getRoot()
    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
