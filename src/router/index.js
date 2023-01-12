import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    { path: '/', redirect: '/home', component: () => import('@/views/home/Home.vue') },
    {
      path: '/home', 
      redirect: '/home/homePage',
      component: () => import('@/views/home/Home.vue'), 
      children: [
        {
          path: 'homePage',
          component: () => import('@/views/home/mainView/index.vue')
        },
        {
          path: 'discover',
          component: () => import('@/views/home/discover/index.vue')
        },
        // 用户喜欢的音乐列表
        {
          path: 'userLike', 
          component: () => import('@/views/user/userLike.vue') 
        },
        {
          path: 'rankingList',
          component: () => import('@/views/home/rankingList/rankingList.vue')
        }
      ]
    },
    // 登入页
    { 
      path: '/login', 
      component: () => import('@/views/login') 
    },
    // 歌单详情页
    { 
      path: '/playListAbout', 
      component: () => import('@/views/playListAbout/playListAbout.vue') 
    },
    // 榜单详情页
    {
      path: '/topListAbout',
      component: () => import('@/views/topList/topListAbout.vue')
    }
    
  ]

})

// 导航守卫
router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if(to.path !== '/login' && !userInfo) {
    return next('/login')
  }
  next()
})

export default router
