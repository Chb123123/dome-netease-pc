<template>
  <div class="container-main">
    <div class="pageMain">
      <!-- <audio controls ref="audio" class="aud">
        <source src="http://m8.music.126.net/20230112170559/25b91b201720c7eee797873dabb6f5e8/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3" />
        </audio> -->
      {{ topListObj.name }}
      <div class="muiscContent">
        <div :class="checkMusicId === item.id ?'musicItem checkMusic':'musicItem'" v-for="item in topListDate" :key="item.id" @click="playMusic(item)">
          {{ item.name }}
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from '@/util/require'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'

// 榜单详情
let topListObj = reactive({})
// 榜单数据
let topListDate = ref([])
// 选中的音乐 id
let checkMusicId = ref()
// 当前音乐的url
let newMusicUrl = ref()

let audio = document.querySelector('.audio')
const $router = useRouter()  // 实现路由跳转

// 初始化榜单数据
function infoTopListDate() {
  axios({
    method: 'get',
    url: '/playlist/detail',
    params: {
      id: topListObj.id
    }
  }).then(res => {
    if(res.data.code === 200) {
      // 榜单排行数据
      topListDate.value = res.data.playlist.tracks
    } else {
      ElMessage({
        type: 'error',
        message: '获取榜单数据失败,请稍后重试!'
      })
    }
  })
}
// 点击播放音乐
function playMusic(obj) {
  audio.play()
  checkMusicId.value = obj.id
  axios({
    url: 'song/url',
    params: {
      id: obj.id
    }
  }).then(res => {
    if(res.data.code === 200) {
      if(!res.data.data[0].url) {
        ElMessage({
          type: 'info',
          message: '当前音乐的播放地址不存在，请切换其他音乐'
        })
      } else {
        newMusicUrl.value = res.data.data[0].url
        console.log(newMusicUrl)
      }
    } else {
      ElMessage({
        type: 'error',
        message: '当前数据不存在，请稍后重试！'
      })
    }
  })
}
// 获取存储在本地的榜单详情
function getTopListInfo() {
  topListObj = JSON.parse(sessionStorage.getItem('topListInfo'))
}
create: {
  getTopListInfo()
  infoTopListDate()
}

</script>

<style lang="scss" scoped>
.muiscContent {
  width: 100%;
  height: 90%;
  overflow: auto;
  .musicItem {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    color: #777;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #0ff;
    }
  }
  .checkMusic {
    color: #0ff;
  }
}
</style>