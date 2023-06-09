/*
 * @Description: eslint 规则配置
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': 'off',
    'no-unreachable': 'off',
    'no-alert': 2,
    'comma-dangle': [0, 'never'],
    // 关闭换行校验
    'linebreak-style': 0
  }
}
