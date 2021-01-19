import { storage } from '@core/utils'

function getExcelStateId(key) {
  key = key.split(':')
  return key[1]
}

function toHTML(key, index) {
  const data = storage(key)
  key = getExcelStateId(key)

  return `
    <li class="db__record">
      <a href="#excel/${key}">${data.tableName}</a> <strong>${data.lastOpen}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return '<p>Записей нет!</p>'
  }

  return `
    <div class="db__list-header">
      <span>Название таблицы</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
