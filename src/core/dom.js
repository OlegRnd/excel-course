class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }

    return this.$el.outerHTML.trim()
  }
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    } else {
      return this.$el.textContent.trim()
    }
  }
  append(element) {
    if (element instanceof Dom) {
      element = element.$el
    }

    if (Element.prototype.append) {
      this.$el.append(element)
    } else {
      this.$el.appendChild(element)
    }

    return this
  }

  exists() {
    return this.$el !== null
  }

  focus() {
    this.$el.focus()
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  get height() {
    return this.$el.clientHeight
  }

  get width() {
    return this.$el.clientWidth
  }
  get id() {
    return this.$el.dataset.id
  }
  parseId() {
    const parsed = this.id.split(':')
    return { row: +parsed[0], col: +parsed[1] }
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key]
    })
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }
  containsClass(className) {
    return this.$el.classList.contains(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
