import * as types from '../types'
import request from '@/common/js/request'

// let base = 'http://47.75.158.224/api'  // 因为要经过nginx转发，所以添加api
let base = 'http://localhost:8081/bbs'

/**
 * App通用配置
 */
const state = {
  selectedModel: '1' 
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
      url: `${base}/topicapp/findTopicList`,
      method: 'post',
      data
    })
  },
  // 查询话题滚动加载的几条数据
  findNexts({ commit }, data) {
    return request({
      url: `${base}/topicapp/findNexts`,
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