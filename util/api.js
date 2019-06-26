import request from './request'
import Fly from 'flyio/dist/npm/wx'
import {baseURL} from './request.js'
const uploadBaseUrl = "http://47.94.169.143:8004"
const searchBaseUrl = "http://47.94.169.143:8004"
const api = {
	// 微信授权登录
	login: data => request.post("/user/login_wx", data, 'POST'),
	// 订单列表
	orderList: data => request.get("/merchant/orders", data),
	//上传
	uploader: (file, cb) => {
		uni.uploadFile({
			url: baseURL + '/v1/addimg/shop',
			filePath: file,
			name: 'file',
			success: (result) => {
				const data = JSON.parse(result.data);
				cb(data);
			}
		});
	}

}
export default api
