// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // 规则
  'rules': {
    'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
    'no-spaced-func': 0, // 函数调用时 函数名与()之间不能有空格
    'generator-star-spacing': 0, // 生成器函数*的前后空格
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止使用debugger
    'semi': 0, // 语句强制分号结尾
    'space-before-function-paren': 0, //函数定义时括号前面要不要有空格
    'eol-last': 0, // 文件以单一的换行符结束
    'no-new': 0, // 禁止在使用new构造一个实例后不赋值
    'no-constant-condition': process.env.NODE_ENV === 'production' ? 2 : 0,// 禁止在条件中使用常量表达式 if(true) if(1)
    'no-else-return': 0, // 如果if语句里面有return,后面不能跟else语句
    'no-unreachable': 0, // 不能有无法执行的代码
    'space-infix-op': 0 // 中缀操作符周围要不要有空格
    // 'no-invalid-regexp': 0 // 禁止无效的正则表达式
  }
}
