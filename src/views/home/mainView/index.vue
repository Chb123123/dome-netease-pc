<template>
	<div class="container-main">
		<div class="pageMain">
			<el-carousel :interval="4000" type="card" height="300px">
				<el-carousel-item v-for="item in imageList" :key="item.bannerId">
					<img :src="item.pic" alt="" style="width: 100%; height: 100%" />
				</el-carousel-item>
			</el-carousel>
			<el-skeleton :rows="5" animated />
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import http from "@/util/require";

// 首页轮播图列表
let imageList = ref([]);
let iconList = ref([])
// 获取首页数据
const getHomeDate = function () {
	http({
		url: "/homepage/block/page",
	})
		.then((res) => {
			if (res.data.code === 200) {
				// 首页轮播图
				imageList.value = res.data.data.blocks[0].extInfo.banners;	
			} else {
				open("获取数据失败！！");
			}
		})
		.catch((err) => {
			open(err);
		});
};
// 获取首页图标
function getHomeIcons () {
  http({
    url: '/homepage/dragon/ball'
  }).then(res => {
    if(res.data.code === 200) {
      iconList = res.data.data
    } else {
      open('获取图标数据失败!!')
    }
  }).catch(err => {
    open(err)
  })
}

// 消息弹窗
const open = (title) => {
	ElMessage(title ? title : "请求数据失败！！");
};

// 生命周期
create: {
	getHomeDate();
  getHomeIcons()
}
// onMounted: {
//   console.log(13)
// }
// 数据监听
// watch(num, (newVal, oldVal) => {
// 	console.log(newVal, oldVal);
// });
</script>

<style lang="scss" scoped>
.el-carousel__item img {
	width: 100%;
	height: 100%;
}
.pageMain {
	height: calc(100vh - 20px);
	width: 100%;
	// border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}
</style>
