<template>
  <div class="container-main">
    <div class="pageMain">
      123
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/util/require.js'
import { ElMessage } from 'element-plus'

// 用户喜欢的音乐列表
let userLikeList = ref([])

// 获取用户喜欢的音乐列表
function getUserLikeList() {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log(userInfo.userId)
  axios({
    url: '/likelist?uid=' + userInfo.userId,
  }).then(res => {
    console.log(res)
    if(res.data.code === 200) {
      userLikeList.value = res.data
    } else {
      ElMessage({
        type: 'error',
        message: '获取用户列表失败!'
      })
    }
  })
}
create: {
  // getUserLikeList()
}
</script>

<style lang="scss" scoped>
.pageMain {
  padding: 20px;
  // border: 1px solid #ccc;
  width: 100%;
  height: calc(100vh - 20px);
}
</style>