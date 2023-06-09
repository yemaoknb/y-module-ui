import YButton from '../module/y-button/index'
import YSearch from '../module/y-search/index'
// import YImageUpload from './y-upload/index'
const components = [YButton, YSearch]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install,
  YButton
  // YSearch
  // YImageUpload,
}
