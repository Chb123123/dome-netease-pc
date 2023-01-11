<template>
	<div class="container-main main">
		<div class="tableBox">
			<router-link :class="checkItemId === item.id? 'tableItem checkTable':'tableItem'" v-for="item in tableList" :key="item.id" @click="checkItem(item.id)" :to="item.linkTo">
				<!-- <img :src="item.iconUrl" alt=""> -->
				{{ item.text }}
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from '@/util/require'
import { ElMessage } from 'element-plus'
	// let tableList = ref([])
	let tableList = ref([
		{ id: 0, text: '首页', icon: '', linkTo: '/home/homePage'},
		{ id: 1, text: '发现', icon: '', linkTo: '/home/discover' },
		{ id: 2, text: '我喜欢', icon: '', linkTo: '/home/userLike' },
	])
	let checkItemId = ref(0)
	function open(title) {
		ElMessage(title ? title:'获取数据失败！！')
	}
	function getTableList() {
		axios({
			url: 'homepage/dragon/ball'
		}).then(res => {
			// console.log(res.data.data)
			if(res.data.code === 200) {
				tableList.value = res.data.data
			} else {
				open()
				// console.log(123)
			}
		})
	}
	function checkItem(id) {
		checkItemId.value = id
		sessionStorage.removeItem('checkItemId')
		sessionStorage.setItem('checkItemId', id)
	}
	create: {
		// getTableList()
		// 获取选中的标签 ID
		let checkItem = sessionStorage.getItem('checkItemId')
		if(!checkItem) {
			sessionStorage.setItem('checkItemId', 0)
			checkItemId.value = 0
		} else {
			checkItemId.value = parseInt(sessionStorage.getItem('checkItemId'))
		}
		console.log(checkItemId)
	}
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
	}
	.tableBox {
		display: flex;
		flex-direction: column;
		min-width: 300px;
		background-color: #F5F5F7;
		height: calc(100vh - 20px);
	}
	.tableItem {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		width: 100%;
		text-align: center;
		line-height: 60px;
		transition: all 0.5s;
		// border: 1px solid #ccc;
		color: #676767;
		cursor: pointer;
		> img {
			width: 30px;
			height: 30px;
		}
	}
	// 选中的table项
	.checkTable {
		background-color: #E6E7EB;
		color: #292A2B;
		font-weight: 800;
		transition: all 0.5s;
	}
</style>