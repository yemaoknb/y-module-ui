import YSearch from './src/main'

YSearch.install = function (Vue) {
  Vue.component(YSearch.name, YSearch)
}

export default YSearch
