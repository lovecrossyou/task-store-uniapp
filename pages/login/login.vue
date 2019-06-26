<template>
	<view class="content">
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<button class="login_btn" open-type="getUserInfo" @getuserinfo="oauth('weixin')">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapActions(['wx_login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			oauth(value) {
				let that = this;
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								const params = {
									code: res.code,
									avatarurl: infoRes.userInfo.avatarUrl,
									gender: infoRes.userInfo.gender,
									nickname: infoRes.userInfo.nickName
								}
								that.toMain(params);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			toMain(params) {
				this.wx_login(params);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* position: absolute; */
		/* top: 0;
        left: 0; */
		width: 100%;
	}

	.oauth-image {
		width: 140upx;
		/* height: 140upx; */
		/* border: 1upx solid #dddddd; */
		/* border-radius: 140upx; */
		/* margin: 0 40upx; */
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 90upx;
		height: 90upx;
		margin: auto;
	}
</style>
