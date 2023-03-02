<template>
	<div class="container-main">
		<div class="pageMain">
			<div class="loginContent">
				<h2 class="titleStyle">登入</h2>
				<div class="inputStyle">
					<span style="flex: 0.2; text-align: right; margin-right: 20px;">输入手机号:</span>
					<el-input v-model="userPhone" placeholder="请输入手机号" />
					<el-button @click="getVerificationCode" style="flex: 0.2;" :disabled="btnIsUsable">{{ btnValue }}</el-button>
				</div>
				<div class="inputStyle">
					<el-input v-model="captcha" placeholder="输入验证码" />
					<el-button @click="getVerificationCode">获取验证码</el-button>
				</div>
				<el-button type="primary" round @click="getLogin">点击登入</el-button>
				<el-button type="primary" round @click="visitorLogin">游客登入</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import axios from "@/util/require";
import { useRouter } from 'vue-router'
// 用户手机号
let userPhone = ref("");
// 通过手机号获取的验证码
let captcha = ref('')
// 发送验证码按钮是否可用
let btnIsUsable = ref(false)
let btnValue = ref('获取验证码')

const $router = useRouter()
function getLogin() {
	if(captcha !== '' && userPhone !== '') {
		axios({
			method: "POST",
			url: "/captcha/verify",
			data: {
				phone: userPhone,
				captcha: captcha, // captcha 表示手机接收到的验证码
			},
		}).then((res) => {
			console.log(res.data);
			if (res.data.code === 200) {
				$router.push('/')
			} else {
				open2('验证失败,请重新输入')
			}
		});
	} else {
		open2('手机号或验证码不能为空!')
	}
}
function getUserInfo() {
	axios({
		url: "login/status",
	}).then((res) => {
		if (res.data.data.code === 200) {
			console.log(res.data.data.account);
			// 将获取到用户信息保存到本地
			localStorage.setItem("userInfo", JSON.stringify(res.data.data.account));
		} else {
			open2();
			// 当请求接口返回的状态码不为 200 时,删除本地存储的用户信息
			localStorage.removeItem("userInfo");
		}
	});
}
function open2() {
	ElMessage.error("Oops, this is a error message.");
}
// 获取验证码
function getVerificationCode() {
	if(userPhone !== "") {
		axios({
			url: "/captcha/sent?phone=" + userPhone,
			// params: {
			// 	phone: parseInt(userPhone),
			// },
		}).then((res) => {
			console.log(res.data);
			console.log(userPhone)
			if(res.data.code === 200) {
				btnIsUsable.value = true
				let num = 60
				let timer = setInterval(() => {
					num --
					btnValue.value = num + '秒后重试'
					if(num === 0) {
						btnIsUsable.value = false
						clearInterval(timer)
					}
				}, 1000)
				ElMessage({
					type: 'success',
					message: '发送验证码成功,注意查收!'
				})
			} else {
				ElMessage({
					type: 'error',
					message: '发送验证码失败,请稍后重试!'
				})
			}
		});
	} else {
		open2('请输入手机号!')
	}
}
// 游客登入
function visitorLogin () {
	axios({
		method: 'get',
		url: '/register/anonimous'
	}).then(res => {
		if(res.data.code === 200) {
			let userInfo = {
				userId: res.data.userId,
				cookie: res.data.cookie
			}
			if(localStorage.getItem('userInfo')) {
				localStorage.removeItem('userInfo')
				localStorage.setItem('userInfo', JSON.stringify(userInfo))
			} else {
				localStorage.setItem('userInfo', JSON.stringify(userInfo))
			}
			// 跳转到首页
			$router.push('/')
		}
	})
}
// 监测登入状态
function monitorLogin () {
	axios({
		url: '/login/status'
	}).then(res => {
		console.log(res.data.data)
	})
}
created: {
	getUserInfo();
	monitorLogin()
}
</script>

<style lang="scss" scoped>
.pageMain {
	position: relative;
	width: 100vw;
	height: calc(100vh - 20px);
	padding: 20px;
	// 登入样式
	.loginContent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid #ccc;
		width: 600px;
		height: 400px;
		.titleStyle {
			padding: 30px 20px;
			font-weight: 800;
		}
		// 输入框样式
		.inputStyle {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 70px;
			width: 100%;
			padding: 0 30px;
			margin-bottom: 30px;
			.el-input{
				flex: 0.7;
			}
		}
	}
}
</style>
