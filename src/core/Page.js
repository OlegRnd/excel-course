export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Page::getRoot needed!')
  }

  afterRender() {}

  destroy() {}
}
