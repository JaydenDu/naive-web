const prefixKey = 'btcx-pool_'

class Storage {
  constructor(option) {
    this.storage = option.storage
    this.prefixKey = option.prefixKey
  }

  getKey(key) {
    return `${this.prefixKey}${key}`.toLowerCase()
  }

  set(key, value, expire) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire ? new Date().getTime() + expire * 1000 : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get(key) {
    const { value } = this.getItem(key, {})
    return value
  }

  getItem(key, def = null) {
    const val = this.storage.getItem(this.getKey(key))
    if (!val) return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      this.remove(key)
      return def
    } catch (error) {
      this.remove(key)
      return def
    }
  }

  remove(key) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}

const createStorage = ({ prefixKey = '', storage = sessionStorage }) => {
  return new Storage({ prefixKey, storage })
}

const createLocalStorage = (option = {}) => {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: localStorage,
  })
}

const createSessionStorage = (option = {}) => {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage,
  })
}

export const lStorage = createLocalStorage({ prefixKey })

export const sStorage = createSessionStorage({ prefixKey })
