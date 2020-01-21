import * as types from '../types'
import request from '@/common/js/request'

let base = 'http://47.240.37.37/80'  // 因为要经过nginx转发，所以添加api
// let base = 'http://localhost:8000'

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
  // 查询话题列表
  findTopicList({ commit }, data) {
    return request({
      url: `${base}/app/findTopicList`,
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
  },
  // 查询问答下向滚动
  findAskNexts({ commit }, data) {
    return request({
      url: `${base}/forumpost/findAskNexts`,
      method: 'post',
      data
    })
  },
  // 查询博客向下滚动
  findBlogNexts({ commit }, data) {
    return request({
      url: `${base}/blogpost/findBlogNexts`,
      method: 'post',
      data
    })
  },
  // 查询首页面博客新闻
  findAppBlogPostList({ commit }, data) {
    return request({
      url: `${base}/app/findBlogList`,
      method: 'post',
      data
    })
  },
  // 查询问答
  findAskList({ commit }, data) {
    return request({
      url: `${base}/app/findAskList`,
      method: 'post',
      data
    })
  },
  // 量询文章分类
  findTechTypeList({ commit }, data) {
    return request({
      url: `${base}/app/findTechTypeList`,
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