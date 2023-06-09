// const version = new Date().getTime()
module.exports = {
  publicPath: '/', //DEV
  transpileDependencies: []
  // chainWebpack: config => {
  //   const devFlag = process.env.NODE_ENV === 'development'
  //   config.plugin('html').tap(args => {
  //     args[0].title = '一抹多UI'
  //     return args
  //   })
  //   config.when(!devFlag, config => {
  //     config.optimization.minimizer('terser').tap(args => {
  //       // 注释console.*
  //       args[0].terserOptions.compress.drop_console = true
  //       // remove debugger
  //       args[0].terserOptions.compress.drop_debugger = true
  //       // 移除 console.log
  //       args[0].terserOptions.compress.pure_funcs = ['console.log']
  //       // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
  //       args[0].terserOptions.output = {
  //         comments: false
  //       }
  //       return args
  //     })
  //   })
  // }
  // configureWebpack: {
  //   // 在moudle.exports 中新增
  //   output: {
  //     // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
  //     filename: `js/[name].${version}.js`,
  //     chunkFilename: `js/[name].${version}.js`
  //   }
  // }
}
