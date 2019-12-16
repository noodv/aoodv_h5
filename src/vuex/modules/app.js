import * as types from '../types'
import request from '@/common/js/request'

// let base = 'http://47.75.158.224/api'  // 因为要经过nginx转发，所以添加api
let base = 'http://localhost:8081/bbs'

/**
 * App通用配置
 */
const state = {
    loading: false,         //暂时只开发这一个 
    showToast: false,
    leftNavStatus: false,
    showSuccess: true,
	showFail: false,
}
const getters = {
    loading: state => state.loading,
    showToast: state => state.showToast,
    showAlert: state => state.showAlert
}
const mutations = {
    [types.COM_LOADING_STATUS](state, status) {
        state.loading = status
    },
}
const actions = {
  setLoadingState({ commit }, status) {
      commit(types.COM_LOADING_STATUS, status)
  },
  findTopicList({ commit }, data) {
    return request({
      url: `${base}/topic/findTopicList`,
      method: 'post',
      data
    })
  }
}

export default {
    state,
    actions,
    getters,
    mutations
}