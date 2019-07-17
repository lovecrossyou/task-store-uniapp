<template>
	<view class="bannerView">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-active-color="indicatoractivecolor" :autoplay="autoplay"
					 :interval="interval" :duration="duration">
						<block v-for="(item,index) in moments_banner" :key="index">
							<swiper-item class="swiper-item">
								<view class="swiper-item uni-bg-red">
									<image class="img" :src="item"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				indicatoractivecolor: "#FF594B",
				moments_banner: [
					"/static/banner/libai.jpg",
					"/static/banner/luban.jpg",
					"/static/banner/nezha.jpg",
					"/static/banner/xiaoqiao.jpg",
					"/static/banner/zhenji.jpg"
				]
			}
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style scoped>
	.swiper {
		width: 100%;
		height: 380upx;
	}

	.img {
		width: 100%;
		height: 380upx;
	}
</style>
