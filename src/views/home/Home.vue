<template>
  <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in imageList" :key="item.id">
      <img :src="item.url" alt="" style="width: 100%;height: 100%">
      <!-- <img src="@/assets/003519-1615480519ce1a.jpg" alt=""> -->
    </el-carousel-item>
  </el-carousel>
  <div></div>
  <BorderBox1 class="container"> Content </BorderBox1>
</template>

<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
// import { BorderBox1 } from '@dataview/datav-vue3';
export default {
  setup() {
    // 首页轮播图
    let imageList = reactive([
      { id: 1, url: '@/assets/003519-1615480519ce1a.jpg' },
      { id: 2, url: '@/assets/100616-15226347765c8a.jpg' },
      { id: 3, url: '@/assets/175106-15281058660540.jpg' },
      { id: 4, url: '@/assets/232420-1657639460cd51.jpg' }
    ])
    return {
      imageList
    }
  },
  created() {
    // this.getHomeInfo()
    // this.getUserList()
  },
  methods: {
    // 获取首页信息
    getHomeInfo() {
      this.$http({
        url: '/homepage/block/page'
      }).then(res => {
        if(res.data.code === 200) {
          // console.log(res.data.data.blocks)
        } else {
          this.open('数据请求失败')
        }
      })
    },
    getMuis() {
      this.$http({
        method: 'get',
        url: 'lyric?id=33894312'
      }).then(res => {
        // console.log(res)
      })
    },
    open(title) {
      ElMessage.error(title)
    },
    getUserList() {
      let userId = JSON.parse(localStorage.getItem('userInfo'))
      console.log(userId)
      this.$http({
        url: '/likelist',
        params: {
          uid: userId.id
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }

.container {
  width: 500px;
  height: 200px;
}
</style>