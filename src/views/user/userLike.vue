<template>
  <div class="container-main">
    <div class="pageMain">
      <h3>音乐列表</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/util/require'

// 用户喜欢的音乐列表
let userLikeList = ref([])

// 获取用户喜欢的音乐列表
function getUserLikeList() {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log(userInfo.id)
  axios({
    url: '/likelist',
    params: {
      uid: userInfo.id
    }
  }).then(res => {
    console.log(res)
  })
}
create: {
  getUserLikeList()
}
</script>

<style lang="scss" scoped>
.pageMain {
  padding: 20px;
  border: 1px solid #ccc;
  width: 100%;
  height: calc(100vh - 20px);
}
</style>