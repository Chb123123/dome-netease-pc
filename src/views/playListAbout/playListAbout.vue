<template>
	<el-space direction="vertical" alignment="flex-start">
		<div></div>
		<el-skeleton
			style="width: 240px"
			:loading="loading"
			animated
			:throttle="600"
		>
			<!-- 骨架框样式 -->
			<template #template>
				<div class="mainView">
					<el-skeleton-item
						variant="image"
						style="width: 100%; height: 240px"
					/>
					<div style="margin-top: 20px">
						<el-skeleton :rows="8" />
					</div>
				</div>
			</template>
			<!-- 渲染部分 -->
			<template #default>
				<div class="container-main">
					<!-- 背景页 -->
					<div
						class="pageBackground"
						:style="{
							background: 'url(' + playListAbout.uiElement.image.imageUrl + ')',
							backgroundSize: '100% 100% ',
						}"
					></div>
					<div class="mainView">
						<el-button type="primary" @click="backViewBtn">返回</el-button>
						<!-- 音乐详情 -->
						<div class="musicCount">
							<div class="musicList">
								<!-- 音乐样式 -->
								<div
									v-for="(item, index) in playList"
									:key="item.id"
									class="musicItem"
									@click="getMusicDetails(item)"
								>
									<!-- 歌曲列表序号 -->
									<span class="indexStyle">{{ index + 1 }}</span>
									<!-- 歌曲名称 -->
									<span class="musicName"
										>{{ item.name
										}}{{ item.alia[0] ? " - " + item.alia[0] : "" }}</span
									>
									<!-- 歌手名称 -->
									<span class="musicAuthor">{{ item.ar[0].name }}</span>
									<!-- 歌曲简介 -->
									<span class="songIntroduction">{{ item.al.name }}</span>
								</div>
							</div>
							<div class="musicAbout">
								<img
									:src="musicDetails !== {} ? musicDetails.picUrl : ''"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</template>
		</el-skeleton>
	</el-space>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import axios from "@/util/require";
import { ElMessage } from "element-plus";

let playList = ref([]);
// 获取全局变量
const instance = getCurrentInstance();
let loading = ref(true);
let playListAbout = ref({});
// 接收点击获取的音乐详情
let musicDetails = ref({});

function getPlayList() {
	loading.value = true;
	console.log(playListAbout);
	axios({
		url: "/playlist/track/all",
		params: {
			id: playListAbout.creativeId,
		},
	}).then((res) => {
		console.log(res.data.songs);
		if (res.data.code === 200) {
			playList.value = res.data.songs;
		} else {
			open();
		}
		loading.value = false;
	});
}
// 回退视图按钮
function backViewBtn() {
	if (instance !== null) {
		const _this = instance.appContext.config.globalProperties;
		_this.$router.back();
	}
}
// 提示框函数
function open(title) {
	ElMessage(title ? title : "获取数据失败，请稍后重试！");
}
// 点击音乐
function getMusicDetails(obj) {
	console.log(obj.al);
	musicDetails.value = obj.al;
}
create: {
	playListAbout = JSON.parse(localStorage.getItem("playListAbout"));
	console.log(playListAbout.uiElement.image.imageUrl);
	getPlayList();
}
</script>

<style lang="scss" scoped>
.pageBackground {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: calc(100vh - 20px);
	background-size: auto;
	-webkit-filter: blur(50px);
	filter: blur(50px);
}
.mainView {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: calc(100vh - 20px);
	// border: 1px solid #ccc;
	padding: 20px;
	z-index: 10;
	.musicCount {
		display: flex;
		width: 100%;
		height: 85%;
		overflow: hidden;
		// 音乐详情模块
		.musicAbout {
			flex: 0.4;
			display: flex;
			justify-content: center;
			> img {
				width: 200px;
				height: 200px;
			}
		}
		// 音乐列表模块
		.musicList {
			flex: 0.6;
			overflow: auto;
			.musicItem {
				cursor: pointer;
				display: flex;
				height: 50px;
				line-height: 50px;
				align-items: center;
				color: white;
				font-size: 16px;
			}
			.indexStyle {
				width: 10%;
				text-align: center;
			}
			.musicName {
				width: 40%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.musicAuthor {
				width: 30%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			// 歌曲简介
			.songIntroduction {
				width: 30%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		/*滚动条样式*/
		.musicList::-webkit-scrollbar {
			width: 5px;
		}
		.musicList::-webkit-scrollbar-thumb {
			border-radius: 10px;
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: rgba(0, 0, 0, 0.2);
		}
		.musicList::-webkit-scrollbar-track {
			box-shadow: inset 0 0 5px #fff;
			border-radius: 30px;
			background: transparent;
		}
	}
}
</style>
