// 定时自动登出功能, 启用后一段时间无用户操作, 则自动登出. 需在项目 config 中配置
import Vue from 'vue'
// import Config from '@/config'
import store from '@/store'
const Config = {
  stagnateTime: 1 * 60 * 60 * 1000, // 无操作停滞时间  默认1小时
  openAutoJumpOut: true // 是否开启无操作跳出
}

// 放到 api和路由监听即可 Vue.prototype.$_jump
const Plugin = {
  install(vue) {
    vue.prototype.$_jump = () => {
      if (!Config.openAutoJumpOut) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        store.dispatch('user/logout') // 调取退出登录操作
        const { origin } = window.location
        window.location.href = origin
      }, Config.stagnateTime)
    }
  }
}

Vue.use(Plugin)

export default Plugin