const SELECTED_CLASS = 'selected'

export class TableSelection {
  static className = SELECTED_CLASS

  constructor(tableRoot) {
    // пока не понятно зачем tableRoot он тут, но точно будет нужен
    this.$root = tableRoot
    this.group = []
    this.current = null
  }

  addToGroup($el) {
    this.group[$el.id] = $el
    return $el.id
  }

  deleteFromGroup($el) {
    return delete this.group[$el.id]
  }

  get selectedIds() {
    return Object.keys(this.group)
  }

  getSelection() {
    return this.group
  }

  isSelected($target) {
    let result = false
    Object.keys(this.group).forEach((key) => {
      if (key === $target.id) {
        result = true
        return
      }
    })
    return result
  }

  // $target == instance of Dom
  select($target, isCtrl = false, isShift = false) {
    if (!isCtrl) {
      this.clearSelection()
      $target.addClass(SELECTED_CLASS)
      this.addToGroup($target)
    } else {
      if (this.isSelected($target)) {
        this.reject($target)
      } else {
        $target.addClass(SELECTED_CLASS)
        this.addToGroup($target)
      }
    }
    this.current = $target
    $target.focus()
  }

  selectGroup(group = [], isCtrl = false, $target = null) {
    if (!isCtrl) this.clearSelection()
    group.forEach((cell) => {
      this.select(cell, true)
    })
    this.current = $target
  }

  reject($target) {
    $target.removeClass(SELECTED_CLASS)
    this.deleteFromGroup($target)
  }

  clearSelection() {
    Object.keys(this.group).forEach((key) => {
      this.reject(this.group[key])
    })
  }

  applyStyle(style) {
    Object.keys(this.group).forEach((key) => {
      this.group[key].css(style)
    })
  }
}
