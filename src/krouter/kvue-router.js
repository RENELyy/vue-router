let Vue
// 声明一个路由器类Vue-Router
// 它是一个Vue插件：必须实现一个install方法
class VueRouter {
  constructor(options) {
    // 1. 解析 route 选项
    this.$options = options

    // 创建一个 current 保存最新 hash
    // 创建一个响应式数据
    // 只有这样，在 current 变化的时候，重新 render
    // defineReactive 给一个对象定义响应式属性
    // 给路由器实例，定义一个响应式的属性 current
    // 这样所有引用了 current 属性的组件，当 current 变化时，他们都会重新 render
    Vue.util.defineReactive(this, 'current', '/')
    this.current = '/'
    // 2. 监控 hash 改变
    window.addEventListener('hashchange', () => {
      console.log(window.location.hash)
      // 只要 # 后面的部分
      this.current = window.location.hash.slice(1)
    })

    // 3. 响应 hash 变化
  }
}

// install 方法接受 Vue 构造函数
VueRouter.install = function (_Vue) {
  Vue = _Vue

  // 挂载 $router
  // 因为 main.js 导入的 router 先于 new Vue() 执行
  // 所以如何拿到路由器实例就是个问题？
  // 利用 Vue 混入，相当于把挂载推迟到了new Vue()后，也就是App.vue创建时
  Vue.mixin({
    beforeCreate() {
      // 仅仅在 Vue 实例化的时候执行一次
      if (this.$options.router) {
        // 挂载之后，所有组件均可通过 this.$router 访问路由器实例
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 注册全局组件 router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      }
    },
    render(h) {
      // <router-link to="/about">xxx</router-link>
      // 支持JSX，但是有兼容性问题，不推荐
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
      return h('a', { attrs: { href: "#" + this.to } }, this.$slots.default)
    }
  })

  // 注册全局组件 router-view
  Vue.component('router-view', {
    render(h) {
      let comp = null
      // 根据 router 的 current，找到 route 选项里面与之对应的那个组件
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      )
      if (route) {
        comp = route.component
      }
      return h(comp)
    }
  })
}

export default VueRouter