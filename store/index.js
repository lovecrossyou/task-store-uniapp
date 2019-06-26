import Vue from 'vue'
import Vuex from 'vuex'

import api from "@/util/api.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: ""
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		updateLoginState(state,hasLogin){
			state.hasLogin = hasLogin;
		}
	},
	actions: {
		async wx_login({
			commit,
			state
		},data) {
			console.log('loigin data ',data);
			const res = await api.login(data);
			commit('updateLoginState',true);
		},
		async tryLogin({
			commit,
			state
		},data){
			const cookie = uni.getStorageSync('cookieKey');
			commit('updateLoginState',cookie.length!=0);
		}
	}
})

export default store
