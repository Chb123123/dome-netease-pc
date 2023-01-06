<template>
	<div>
		<el-button @click="getLogin">点击</el-button>
		<el-input v-model="input" placeholder="Please input" />
		<el-button @click="getVerificationCode">获取验证码</el-button>
		<el-button type="primary" round>登入</el-button>
	</div>
</template>

<script>
import { ElMessage } from "element-plus";
import { ref } from "vue";
export default {
	setup() {
		let input = ref("");
		return {
			input,
		};
	},
	methods: {
		getLogin() {
			this.$http({
				method: "POST",
				url: "/captcha/verify",
				data: {
					phone: 18296638530,
					captcha: 4663,
				},
			}).then((res) => {
				console.log(res.data);
				if (res.data.code === 200) {
					this.$router.push("/");
				}
			});
		},
		getUserInfo() {
			this.$http({
				url: "login/status",
			}).then((res) => {
				if (res.data.data.code === 200) {
					console.log(res.data.data.account);
					localStorage.setItem(
						"userInfo",
						JSON.stringify(res.data.data.account)
					);
				} else {
					this.open2();
					localStorage.removeItem("userInfo");
				}
			});
		},
		open2() {
			ElMessage.error("Oops, this is a error message.");
		},
		// 获取验证码
		getVerificationCode() {
			console.log(this.input);
			this.$http({
				url: "/captcha/sent",
				params: {
					phone: this.input,
				},
			}).then((res) => {
				console.log(res);
			});
		},
	},
	created() {
		this.getUserInfo();
	},
};
</script>

<style></style>
