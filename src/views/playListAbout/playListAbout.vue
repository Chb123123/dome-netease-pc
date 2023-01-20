<template>
	<el-space direction="vertical" alignment="flex-start">
		<div></div>
		<el-skeleton
			style="width: 240px"
			:loading="loading"
			animated
			:throttle="0"
		>
			<!-- 骨架框样式 -->
			<template #template>
				<div class="mainView">
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
									:class="musicDetails.id === item.al.id ? 'musicItem checkMusic':'musicItem'"
									@click="getMusicDetails(item, index)"
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
									:src="playListAbout.uiElement.image.imageUrl"
									alt=""
									style="border-radius: 20px;"
								/>
								<div style="margin-top: 20px;">{{ playListAbout.uiElement.mainTitle.title }}</div>
							</div>
						</div>
						<!-- 音乐列表模块结束，播放音乐模块开始 -->
						<div class="playMusicMoudle" v-if="musicAbout">
							<div class="leftAbout">
								<img :src="musicAbout ? musicAbout.al.picUrl: ''" alt="">
								<div class="musicAuthorAbout">
									<span style="margin-bottom: 20px;">{{ musicAbout ? musicAbout.al.name:'暂无歌曲播放' }}</span>
									<span v-if="musicAbout">{{ musicAbout.ar[0].name }}</span>
								</div>
							</div>
							<!-- 中间播放模块 -->
							<div class="playMoudel">
								<div class="PlayIcons">
									<!-- 循环播放 -->
									<el-icon><Refresh /></el-icon>
									<!-- 切换上一首 -->
									<el-icon style="margin: 20px;" @click="changeUp"><CaretLeft /></el-icon>
									<el-icon style="margin: 20px;" v-if="isPlayMusic" @click="playMusicBtn"><VideoPlay /></el-icon>
									<el-icon style="margin: 20px;" v-else @click="pauseMusic"><VideoPause /></el-icon>
									<!-- 切换下一首 -->
									<el-icon style="margin: 20px;" @click="changeDown"><CaretRight /></el-icon>
									<!-- 收藏 -->
									<el-icon v-if="!newMusicCollect" @click="collectBtn"><Star /></el-icon>
									<!-- 取消收藏 -->
									<el-icon v-else @click="canceltBtn" style="color: yellow;"><StarFilled /></el-icon>
								</div>
								<div class="progressBar">
									播放进度条
								</div>
							</div>
						</div>
						<div  class="playMusicMoudle notMusicABout" v-else style="font-size: 24px; color: white;">
							请选择音乐
						</div>
					</div> 
				</div>
			</template>
		</el-skeleton>
	</el-space>
</template>

<script setup>
import { ref, getCurrentInstance, reactive } from "vue";
import axios from "@/util/require";
import { ElMessage } from "element-plus";

let playList = ref([]);
// 获取全局变量
const instance = getCurrentInstance();
let loading = ref(true);
let playListAbout = ref({});
// 接收点击获取的音乐详情
let musicDetails = ref({});
// 是否加载完成图片
let isWhetherLoad = ref(true)
// 播放当前音乐地址的 URL
let newPlayMusicUrl = ref('')
// 点击的音乐详情(单纯的音乐详情)
let musicAbout = ref()
// 判断当前是否在播放音乐
let isPlayMusic = ref(true)
// 当前音乐是否收藏
let newMusicCollect = ref(false)
// 当前音乐是否有效
let isNewMusicURL = ref(false)
// 当前音乐的序号
let newMusicIndex = ref()

function getPlayList() {
	loading.value = true;
	axios({
		url: "/playlist/track/all",
		params: {
			id: playListAbout.creativeId,
		},
	}).then((res) => {
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
function getMusicDetails(obj, index) {
	newMusicIndex.value = index
	musicAbout.value = obj
	newMusicCollect.value = false
		// console.log(obj.al.id)
	if(isWhetherLoad) {
		isWhetherLoad.value = false
		musicDetails.value = obj.al;
		// 判断点击的音乐是否在收藏列表内
		if(sessionStorage.getItem('collectList')) {
			// list 为当前收藏的音乐列表
			let list = JSON.parse(sessionStorage.getItem('collectList'))
			// list.some(item => {
			// 	console.log(obj.al.id, item._value.al.id)
			// 	if(obj.al.id === item._value.al.id) {
			// 		newMusicCollect.value = true
			// 		return true
			// 	}
			// })
			for (let i = 0; i < list.length; i++) {
				if(list[i].id === obj.al.id) {
					newMusicCollect.value = true
				}
			}
		}
		// 获取音乐的 播放地址
		axios({
			url: '/song/url',
			params: {
				id: obj.al.id,
			}
		}).then(res => {
			if(res.data.code === 200) {
				if(res.data.data[0].url) {
					// console.log(res.data.data[0].url)
					newPlayMusicUrl.value = res.data.data[0].url
					isNewMusicURL.value = true
				} else {
					isNewMusicURL.value = false
					open('当前歌曲暂未有有效URL,请切换其他歌曲')
				}
			} else {
				open()
			}
			isWhetherLoad.value = true
		})
	} else {
		open('点击过快，请稍后重试!')
	}
}
// 点击播放音乐
function playMusicBtn() {
	if(isNewMusicURL.value) {
		console.log('点击播放音乐')
		isPlayMusic.value = false
	} else {
		ElMessage({
			type: 'info',
			message: '当前音乐的播放地址不存在'
		})
	}
}
// 点击暂停音乐
function pauseMusic() {
	console.log('暂停音乐')
	isPlayMusic.value = true
}
// 切换上一首
function changeUp() {
	if(newMusicIndex.value || newMusicIndex.value == 0) {
		if(newMusicIndex.value === 0) {
			musicAbout.value = playList.value[playList.value.length - 1]
			newMusicIndex.value = playList.value.length - 1
			musicDetails.value = musicAbout.value.al
			getMusicDetails(musicAbout.value, newMusicIndex.value)
			return
		}
		newMusicIndex.value -= 1
		musicAbout.value = playList.value[newMusicIndex.value]
		musicDetails.value = musicAbout.value.al
		getMusicDetails(musicAbout.value, newMusicIndex.value)
		return
	} else {
		ElMessage({
			type: 'info',
			message: '请选择歌曲！'
		})
	}
}
// 切换下一首
function changeDown() {
	if(newMusicIndex.value || newMusicIndex.value == 0) {
		if(newMusicIndex.value === playList.value.length) {
			musicAbout.value = playList.value[0]
			musicDetails.value = musicAbout.value.al
			getMusicDetails(musicAbout.value, newMusicIndex.value)
			return
		}
		newMusicIndex.value += 1
		musicAbout.value = playList.value[newMusicIndex.value]
		musicDetails.value = musicAbout.value.al
		getMusicDetails(musicAbout.value, newMusicIndex.value)
		return
	} else {
		ElMessage({
			type: 'info',
			message: '请选择歌曲！'
		})
	}
}
// 点击收藏
function collectBtn() {
	if(!musicAbout.value) {
		ElMessage({
			type: 'error',
			message: '请选择音乐!'
		})
	} else {
		// 判断本地是否有保存收藏列表
		// 如果有收藏列表，将收藏列表更新
		if(sessionStorage.getItem('collectList')) {
			let collectList = JSON.parse(sessionStorage.getItem('collectList'))
			collectList.push(musicAbout._value.al)
			console.log(collectList)
			sessionStorage.removeItem('collectList')
			// 将更新的音乐列表保存在本地
			sessionStorage.setItem('collectList', JSON.stringify(collectList))
			
		} else { // 如果没有收藏列表，新建一个收藏列表，将点击收藏的音乐保存在本地
			let list = []
			list.unshift(musicAbout._value.al)
			sessionStorage.setItem('collectList', JSON.stringify(list))
		}
		newMusicCollect.value = true
		// 动态提示用户音乐收藏完成
		ElMessage({
			type: 'success',
			message: '收藏成功'
		})
	}
}
// 点击取消收藏
function canceltBtn() {
	newMusicCollect.value = false
	let list = JSON.parse(sessionStorage.getItem('collectList'))
	list.some((item, index) => {
		if(item.id === musicAbout._value.al.id) {
			list.splice(index, 1)
			return true
		}
	})
	sessionStorage.removeItem('collectList')
	sessionStorage.setItem('collectList', JSON.stringify(list))
	ElMessage({
		type: 'info',
		message: '取消收藏'
	})
}
create: {
	playListAbout = JSON.parse(localStorage.getItem("playListAbout"));
	getPlayList();
	console.log(musicAbout.value)
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
	-webkit-filter: blur(150px);
	filter: blur(150px);
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
		padding-bottom: 20px;
		overflow: hidden;
		// 音乐详情模块
		.musicAbout {
			flex: 0.4;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// flex-direction: column;
			color: white;
			font-size: 24px;
			justify-content: center;
			> img {
				width: 200px;
				height: 200px;
				margin-bottom: 30px;
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
				transition: all 0.3s;
				&:hover {
					color: #0ff;
				}
			}
			// 选中的音乐
			.checkMusic {
				// background-color: #ccc;
				color: #0ff;
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
	// 音乐播放模块
	.playMusicMoudle {
		display: flex;
		align-items: center;
		width: 100%;
		height: 15%;
		border-top: 1px solid #ccc;
		.leftAbout {
			padding: 20px;
			display: flex;
			align-items: center;
			width: 20%;
			height: 100%;
			// border: 1px solid #ccc;
			> img {
				width: 100px;
				height: 100%;
				border-radius: 10px;
			}
			.musicAuthorAbout{
				display: flex;
				flex: 1;
				height: 100%;
				padding: 10px 0 10px 20px;
				flex-direction: column;
				justify-content: space-between;
				// background-color: red;
				color: white;
			}
		}
		// 播放进度条
		.playMoudel {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 60%;
			height: 100%;
			// border: 1px solid #ccc;
			.PlayIcons{
				flex: 1;
				display: flex;
				width: 100%;
				// border: 1px solid #ccc;
				align-items: center;
				justify-content: center;
				color: white;
				font-size: 40px;
			}
			.progressBar {
				flex: 1;
				display: flex;
				width: 100%;
				// border: 1px solid #ccc;
				align-items: center;
				justify-content: center;
			}
		}
	}
	// 当前为选择音乐的样式
	.notMusicABout {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
