<template>
	<div>
		<el-button @click="getLogin">点击</el-button>
		<el-input v-model="input" placeholder="Please input" />
		<el-button @click="getVerificationCode">获取验证码</el-button>
		<el-button type="primary" round>登入</el-button>
	</div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, getCurrentInstance } from "vue";
import axios from "@/util/require";
let input = ref("");
const instance = getCurrentInstance();
function getLogin() {
	axios({
		method: "POST",
		url: "/captcha/verify",
		data: {
			phone: 18296638530,
			captcha: 4752, // captcha 表示手机接收到的验证码
		},
	}).then((res) => {
		console.log(res.data);
		if (res.data.code === 200) {
			if (instance !== null) {
				const _this = instance.appContext.config.globalProperties;
				_this.$router.push("/");
			}
		}
	});
}
function getUserInfo() {
	axios({
		url: "login/status",
	}).then((res) => {
		if (res.data.data.code === 200) {
			console.log(res.data.data.account);
			localStorage.setItem("userInfo", JSON.stringify(res.data.data.account));
		} else {
			open2();
			localStorage.removeItem("userInfo");
		}
	});
}
function open2() {
	ElMessage.error("Oops, this is a error message.");
}
// 获取验证码
function getVerificationCode() {
	console.log(input.value);
	axios({
		url: "/captcha/sent",
		params: {
			phone: input.value,
		},
	}).then((res) => {
		console.log(res);
	});
}
created: {
	// console.log(instance.appContext.config.globalProperties.$router.push('/'))
	getUserInfo();
}
</script>

<style></style>
