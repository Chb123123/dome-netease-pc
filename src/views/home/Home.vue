<template>
	<div class="container-main main">
		<div class="tableBox">
			<div class="tableItem" v-for="item in tableList" :key="item.id">
				<img :src="item.iconUrl" alt="">
				{{ item.name }}
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from '@/util/require'
import { ElMessage } from 'element-plus'
	let tableList = ref([])

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
				console.log(tableList)
			} else {
				open()
				// console.log(123)
			}
		})
	}
	create: {
		getTableList()
	}
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
	}
	.tableBox {
		min-width: 300px;
		border: 1px solid #ccc;
		// background-color: #666;
	}
	.tableItem {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		width: 100%;
		text-align: center;
		line-height: 60px;
		border: 1px solid #ccc;
		> img {
			width: 30px;
			height: 30px;
		}
	}
</style>