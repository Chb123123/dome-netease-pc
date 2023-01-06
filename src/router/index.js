import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
      { path: '/', redirect: '/home', component: () => import('@/views/home/Home.vue') },
      { path: '/home', component: () => import('@/views/home/Home.vue') },
      { path: '/login', component: () => import('@/views/login') }
  ]

})
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(userInfo)
// 导航守卫
router.beforeEach((from, to) => {
  console.log(from.path, to.fullPath)
  if(to.path !== '/login' && !userInfo) {
    return '/login'
  }
})

export default router
