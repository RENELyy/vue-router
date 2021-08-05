// 创建一个Store类
// 1. 拥有state属性，是响应式的
// 2. 拥有两个方法commit，dispatch可以执行mutations和actions

let Vue
class Store {
  constructor (options) {
    // Vue.util.defineReactive(this, 'state', options.state)

    // 保存用户传入的mutations
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters

    const computed = {}
    this.getters = {}

    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      const fn = store._wrappedGetters[key]

      computed[key] = function () {
        return fn(store.state)
      }

      Object.defineProperty(store.getters, key, {
        get () {
          return store._vm[key]
        }
      })
    })

    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state () {
    return this._vm.$data.$$state
  }

  set state (val) {
    console.error('不能直接修改state')
  }

  commit (type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('未知的mutations')
    }

    entry(this.state, payload)
  }

  dispatch (type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.log('未知的actions')
    }

    entry(this, payload)
  }
}

function install (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出的对象就是Vuex
export default { Store, install }