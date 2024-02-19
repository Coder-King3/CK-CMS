/*
  区分不同坏境：在开发中我们需要不同的坏境设置不同的坏境变量 常见的有三种
  1.开发坏境：development
  2.生产坏境:production
  3.测试坏境：test
*/

// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.DEV) {
  // 开发环境
  BASE_URL = 'http://localhost:3600'
  // BASE_URL = 'https://king-cms.onrender.com/'
} else if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'https://cms-server-3mw0.onrender.com/'
}

console.log('BASE_URL', BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
