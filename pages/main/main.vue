<template>
	<view class="main">
		<banner></banner>
		<view class="tabWrapper">
			<view class="task">
				<image class="img" src="../../static/main/money.png"></image>
				<view class="text">任务大厅</view>
			</view>
			<view class="resource">
				<image class="img" src="../../static/main/money.png"></image>
				<view class="text">人才市场</view>
			</view>
			<view class="rank">
				<image class="img" src="../../static/main/money.png"></image>
				<view class="text">Top榜</view>
			</view>
			<view class="sign">
				<image class="img" src="../../static/main/money.png"></image>
				<view class="text">任务大厅</view>
			</view>
		</view>
		<view class="invite">
			<view class="inviteText">邀请好友，立赠100豆</view>
		</view>
		<view>推荐任务</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import banner from '../../components/banner.vue'

	export default {
		components:{
			banner
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.main{
		width: 100%;
		height: 100%;
		position: absolute;
		
		.tabWrapper{
			display: flex;
			align-items: center;
			width: 100%;
			height: 120upx;
			padding-top: 20upx;
			
			.task{
				width: 25%;
				height: 100%;
				text-align: center;
				
				.img{
					width: 60upx;
					height: 60upx;
				}
				
				.text{
					font-size:25upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:25upx;
				}
			}
			
			.resource{
				width: 25%;
				height: 100%;
				text-align: center;
				
				.img{
					width: 60upx;
					height: 60upx;
				}
				
				.text{
					font-size:25upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:25upx;
				}
			}
			
			.rank{
				width: 25%;
				height: 100%;
				text-align: center;
				
				.img{
					width: 60upx;
					height: 60upx;
				}
				
				.text{
					font-size:25upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:25upx;
				}
			}
			
			.sign{
				width: 25%;
				height: 100%;
				text-align: center;
				
				.img{
					width: 60upx;
					height: 60upx;
				}
				
				.text{
					font-size:25upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:25upx;
				}
			}
		}
		
		.invite{
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100upx;
			
			.inviteText{
				width: 95%;
				height: 100upx;
				background:rgba(255,82,85,1);
				border-radius: 45upx;
				line-height: 100upx;
				text-align: center;
			}
		}
	}
</style>
