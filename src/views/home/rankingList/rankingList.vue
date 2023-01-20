<template>
  <div class="container-main">
    <div class="topListContent">
      <div class="topListItem" v-for="item in topList" :key="item.id" @click="getTopListAbout(item)">
        <img :src="item.coverImgUrl" alt="">
        <div class="titleStyle">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import axios from '@/util/require'
import { ElMessage } from 'element-plus'

const instance = getCurrentInstance()
// 榜单列表
let topList = ref([])
// 初始化页面数据
function infoDate() {
  axios({
    method: 'get',
    url: 'toplist'
  }).then(res => {
    if(res.data.code === 200) {
      console.log(res.data.list)
      topList.value = res.data.list
    } else {
      ElMessage({
        type: 'error',
        message: '获取排行榜数据失败!'
      })
    }
  })
}

// 点击榜单前往表单详情
function getTopListAbout(obj) {
  console.log(obj)
  // 将榜单的详情存储在本地
  if(sessionStorage.getItem('topListInfo')) {
    sessionStorage.removeItem('topListInfo')
  }
  sessionStorage.setItem('topListInfo', JSON.stringify(obj))
  instance.appContext.config.globalProperties.$router.push('/topListAbout')
}
cerate: {
  infoDate()
}
</script>

<style lang="scss" scoped>
.topListContent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
  width: 100%;
  height: 100vh;
  padding: 20px;
  .topListItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 250px;
    width: 19%;
    min-width: 200px;
    // border: 1px solid #ccc;
    margin-bottom: 20px;
    > img {
      width: 100%;
      height: 200px;
      margin-bottom: 10px;
    }
    .titleStyle {
      padding: 0 10px;
      height: 40px;
      line-height: 20px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break:break-all ;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;  
    } 
  }
}
// 隐藏滚动条
// .topListContent::-webkit-scrollbar {
// 	width: 0px;
// }
// .topListContent::-webkit-scrollbar-thumb {
// 	border-radius: 10px;
// 	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
// 	background: rgba(0, 0, 0, 0.2);
// }
// .topListContent::-webkit-scrollbar-track {
// 	box-shadow: inset 0 0 5px #fff;
// 	border-radius: 30px;
// 	background: transparent;
// }
</style>