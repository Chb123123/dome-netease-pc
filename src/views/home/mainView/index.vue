<template>
	<div class="container-main">
		<div class="pageMain">
			<el-space direction="vertical" alignment="flex-start">
				<div></div>
				<el-skeleton :loading="loading" animated>
					<template #template>
						<el-skeleton-item
							variant="image"
							style="width: 100%; height: 300px"
						/>
						<div style="padding: 14px">
							<el-skeleton-item
								variant="h3"
								style="width: 30%; height: 20px"
								:throttle="1000"
							/>
							<div
								style="
									display: flex;
									align-items: center;
									justify-items: space-between;
									margin-top: 16px;
									height: 16px;
								"
							>
								<el-skeleton-item
									variant="h3"
									style="margin-right: 16px"
									:throttle="1000"
								/>
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
								<el-skeleton-item
									variant="h3"
									style="margin-right: 16px"
									:throttle="1000"
								/>
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
								<el-skeleton-item
									variant="h3"
									style="margin-right: 16px"
									:throttle="1000"
								/>
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
										style="width: 100%; height: 100%; border-radius: 10px"
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
									<div
										class="functionItem"
										v-for="item in recommendPlayList"
										:key="item.creativeId"
										@click="gotoPlayListAbout(item)"
									>
										<img :src="item.uiElement.image.imageUrl" alt="" />
										<div class="lineHeightOverFrom">
											{{ item.uiElement.mainTitle.title }}
										</div>
									</div>
								</div>
							</div>
							<!-- 排行榜 -->
							<div class="functionModule">
								<h3 class="titleStyle">
									排行榜
									<router-link class="moreBtn" to="">
										更多
										<el-icon><ArrowRight /></el-icon>
									</router-link>
								</h3>
								<div class="moduleBox">
									<div
										class="functionItem"
										v-for="(item, index) in recommendPlayList"
										:key="index"
									>
										<img :src="item.uiElement.image.imageUrl" alt="" />
										<div class="lineHeightOverFrom">
											{{ item.uiElement.mainTitle.title }}
										</div>
									</div>
								</div>
							</div>
							<!-- 为你精选的宝藏歌曲 -->
							<div class="functionModule">
								<h3 class="titleStyle">
									{{ treasureMusic.uiElement.subTitle.title }}
									<router-link class="moreBtn" to="">
										更多
										<el-icon><ArrowRight /></el-icon>
									</router-link>
								</h3>
								<div class="treasureBox">
									<div
										class="treasureMusicModule"
										v-for="item in treasureMusic.creatives"
										:key="item.creativeId"
									>
										<div
											class="treasureItem"
											v-for="(i, index) in item.resources"
											:key="index"
										>
											<img
												:src="i.uiElement.image.imageUrl"
												:alt="i.uiElement.mainTitle.title"
											/>
											<div class="textStyle">
												<span class="textNotWarp">{{
													i.uiElement.mainTitle.title
												}}</span>
												<span class="textNotWarp">{{
													i.uiElement.mainTitle.title
												}}</span>
											</div>
										</div>
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
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import http from "@/util/require";
import { useRouter } from 'vue-router'

const $router = useRouter() // 跳转路由
// 首页轮播图列表
let imageList = ref([]);
// 推荐歌单
let recommendPlayList = ref([]);
// 为你精选的宝藏歌曲
let treasureMusic = ref([]);
// 是否显示加载动画
let loading = ref(true);
// 排行榜数据
let musicRankingList = ref([]);
// 获取首页数据
const getHomeDate = function () {
	loading.value = true;
	http({
		url: "/homepage/block/page",
	}).then((res) => {
		if (res.data.code === 200) {
			// console.log(res.data.data.blocks);
			// 首页轮播图
			imageList.value = res.data.data.blocks[0].extInfo.banners;
			// 推荐歌单
			recommendPlayList.value = res.data.data.blocks[1].creatives;
			// 宝藏歌曲
			treasureMusic.value = res.data.data.blocks[2];
			// console.log(
			// 	treasureMusic.value.creatives[1].resources[1].uiElement.subTitle.title
			// );
			// 排行榜
			musicRankingList.value = res.data.data.blocks[3].creatives
			// console.log(musicRankingList)
		} else {
			open("获取数据失败！！");
		}
		loading.value = false;
	});
};
// 获取每日歌单列表
function getPlayLiat() {
	http({
		url: "/program/recommend",
	}).then((res) => {
		if (res.data.code === 200) {
			// everyPlayList.value = res.data.result;
			// console.log(res);
		} else {
			open("获取推荐歌单失败!!");
		}
	});
}

// 消息弹窗
const open = (title) => {
	ElMessage(title ? title : "请求数据失败！！");
};

// 将传入的歌单信息保存在本地
function gotoPlayListAbout(obj) {
	console.log(obj);
	localStorage.removeItem("playListAbout");
	localStorage.setItem("playListAbout", JSON.stringify(obj));
	$router.push("/playListAbout")
}
// 生命周期
create: {
	getHomeDate();
	// getPlayLiat();
}
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
	height: 100vh;
	width: 100%;
	// border: 1px solid #ccc;
	overflow: auto;
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
		color: #3d403f;
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
// 获取宝藏歌曲列表模块
.treasureBox {
	overflow: hidden;
	width: 100%;
	.treasureMusicModule {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 80px;
		flex-wrap: wrap;
		margin-bottom: 20px;
		.treasureItem {
			flex: 0.3;
			display: flex;
			height: 80px;
			// border: 1px solid #ccc;
			cursor: pointer;
			> img {
				height: 100%;
				width: 80px;
				margin-right: 10px;
				border-radius: 10px;
			}
			.textStyle {
				flex: 1;
				border-bottom: 1px solid #ccc;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 5px 0 5px 20px;
			}
		}
	}
}
</style>
