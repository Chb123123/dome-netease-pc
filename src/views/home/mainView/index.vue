<template>
	<div class="container-main">
		<div class="pageMain">
			<el-space direction="vertical" alignment="flex-start">
				<div></div>
				<el-skeleton :loading="loading" animated :throttle="1000">
					<template #template>
						<el-skeleton-item
							variant="image"
							style="width: 100%; height: 300px"
						/>
						<div style="padding: 14px">
							<el-skeleton-item variant="h3" style="width: 30%; height: 20px" :throttle="1000"/>
							<div
								style="
									display: flex;
									align-items: center;
									justify-items: space-between;
									margin-top: 16px;
									height: 16px;
								"
							>
								<el-skeleton-item variant="h3" style="margin-right: 16px" :throttle="1000"/>
							</div>
							<div
								style="
									display: flex;
									align-items: center;
									justify-items: space-between;
									margin-top: 16px;
									height: 16px;
								"
							>
								<el-skeleton-item variant="h3" style="margin-right: 16px" :throttle="1000"/>
							</div>
							<div
								style="
									display: flex;
									align-items: center;
									justify-items: space-between;
									margin-top: 16px;
									height: 16px;
								"
							>
								<el-skeleton-item variant="h3" style="margin-right: 16px" :throttle="1000"/>
							</div>
						</div>
					</template>
					<template #default>
						<div style="width: calc(100vw - 350px)">
							<el-carousel
								:interval="4000"
								type="card"
								height="300px"
								style="width: calc(100vw- 350px)"
							>
								<el-carousel-item
									v-for="item in imageList"
									:key="item.bannerId"
								>
									<img
										:src="item.pic"
										alt=""
										style="width: 100%; height: 100%"
									/>
								</el-carousel-item>
							</el-carousel>
							<!-- 首页轮播图结束 -->
							
							<!-- 推荐歌单 -->
							<div class="functionModule">
								<h3 class="titleStyle">
									推荐歌单
									<router-link class="moreBtn" to="">
										更多
										<el-icon><ArrowRight /></el-icon>
									</router-link>
								</h3>
								<div class="moduleBox">
									<div class="functionItem" v-for="item in recommendPlayList" :key="item.creativeId" @click="gotoPlayListAbout(item)">
											<img
												:src="item.uiElement.image.imageUrl"
												alt=""
											/>
										<div class="lineHeightOverFrom">{{ item.uiElement.mainTitle.title }}</div>
									</div>
								</div>
							</div>
							<!-- 排行榜 -->
							<!-- 推荐歌单 -->
							<div class="functionModule">
								<h3 class="titleStyle">
									排行榜
									<router-link class="moreBtn" to="">
										更多
										<el-icon><ArrowRight /></el-icon>
									</router-link>
								</h3>
								<div class="moduleBox">
									<div class="functionItem" v-for="item in recommendPlayList" :key="item.creativeId" @click="gotoPlayListAbout(item)">
											<img
												:src="item.uiElement.image.imageUrl"
												alt=""
											/>
										<div class="lineHeightOverFrom">{{ item.uiElement.mainTitle.title }}</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</el-skeleton>
			</el-space>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import http from "@/util/require";
import axios from "@/util/require";

// 首页轮播图列表
let imageList = ref([]);
// 推荐歌单
let recommendPlayList = ref([]);
// 是否显示加载动画
let loading = ref(true);
const instance = getCurrentInstance()
// 排行榜数据
let musicRankingList = ref([])
// 获取首页数据
const getHomeDate = function () {
	loading.value = true;
	http({
		url: "/homepage/block/page",
	})
		.then((res) => {
			if (res.data.code === 200) {
				// console.log(res.data.data.blocks);
				// 首页轮播图
				imageList.value = res.data.data.blocks[0].extInfo.banners;
				// 推荐歌单
				recommendPlayList.value = res.data.data.blocks[1].creatives
				// 排行榜
				musicRankingList.value = res.data.data.blocks[3].creatives
				console.log(musicRankingList)
			} else {
				open("获取数据失败！！");
			}
			loading.value = false;
		})
		.catch((err) => {
			open(err);
			loading.value = false;
		});
};
// 获取每日歌单列表
function getPlayLiat() {
	http({
		url: "/program/recommend",
	})
	.then((res) => {
		if (res.data.code === 200) {
			// everyPlayList.value = res.data.result;
			console.log(res);
		} else {
			open("获取推荐歌单失败!!");
		}
	})
}

// 消息弹窗
const open = (title) => {
	ElMessage(title ? title : "请求数据失败！！");
};
// 将传入的歌单信息保存在本地
function gotoPlayListAbout(obj) {
	console.log(obj)
	localStorage.removeItem('playListAbout')
	localStorage.setItem('playListAbout', JSON.stringify(obj))
	if (instance !== null) {
		const _this = instance.appContext.config.globalProperties;
		_this.$router.push("/playListAbout");
	}
}
// 生命周期
create: {
	getHomeDate();
	// getPlayLiat();
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
.el-skeleton {
	width: calc(100vw - 350px);
}
.el-space {
	width: 100%;
}
.pageMain {
	height: calc(100vh - 20px);
	width: 100%;
	// border: 1px solid #ccc;
	padding: 20px;
	box-sizing: border-box;
}
// 功能模块
.functionModule {
	// border: 1px solid #ccc;
	align-items: center;
	padding-bottom: 20px;
	.titleStyle {
		position: relative;
		color: #3D403F;
		font-size: 24px;
		font-weight: 800;
		margin-bottom: 20px;
		.moreBtn {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translateY(-50%);
			font-size: 16px;
			color: #969696;
		}
	}
	.moduleBox {
		display: flex;
		justify-content: space-between;
		.functionItem {
			cursor: pointer;
			flex: 1;
			margin-left: 20px;
			// border-radius: 20px;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			// align-items: center;
			// min-width: 100px;
			height: 260px;
			// border: 1px solid #ccc;
			// margin-right: 20px;
			color: #6a6a6a;
			font-weight: 600;
			> img {
				width: 100%;
				height: 200px;
				margin-bottom: 10px;
			}
			.lineHeightOverFrom {
				height: 40px;
				padding: 0 10px;
				display: -webkit-box;
				overflow: hidden;
				font-size: 16px;
				color: #777;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
		.functionItem:first-of-type {
			margin-left: 0;
		}
	}
}
</style>
