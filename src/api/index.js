import axios from 'axios'
import request from '@/common/js/request'
import {} from '@/common/js/utils'

// let base = 'http://47.75.158.224/api'  // 因为要经过nginx转发，所以添加api
let base = 'http://localhost:8081/bbs'

export function getBaseUrl() {
  return `${base}`
}

export function requestLogin(data) {
    return request({
        url: `${base}/auth/login`,
        method: 'post',
        data
    })
}

export const getUserList = params => {                    //获取用户信息
    return axios.get(`${base}/api/userData`, { params: params }).then(res => {
        return res.data
    }, err => {
        reject(err)
    }).catch((error) => {
        reject(error)
    })
}
export const getRecommend = params => {                 //获取主页中推荐页面信息
    return axios.get(`${base}/api/getrecommend`, { params: params }).then(res => {
        return res.data
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    })
}
export const getClassic = params => {                   //获取主页中经典课程信息
    return axios.get(`${base}/api/getclassic`, { params: params }).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};
export const getExpert = params => {                    //获取主页中行家信息
    return axios.get(`${base}/api/getexpert`, { params: params }).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};

export const getClassify = params => {                  //获取课程分类信息
    return axios.get(`${base}/api/getclassify`, { params: params }).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
}

export const findCourseById = params => {               //通过id查找课程
    return axios.post(`${base}/api/findcoursebyid`, params).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};
//查询问答帖子
export const getForumThread = params => {
    return axios.get(`/api/admin/forumthreads/read`, { params: params }).then(res => {
        return res.data
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};
// axios.get('/api/admin/forumposts/read?tid=' + this.$route.params.tid + '&currentPage=' + this.$data.page.currentPage + '&pageSize=' + this.$data.page.pageSize).then(response => {
//     this.postList = response.data
//   }).catch(function(error) {
//     console.log(error)
//   })
// 查看帖子详细
export const getForumView = params => {
    return axios.get('/api/admin/forumposts/read', { params: params }).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
}
//查询博客
export const getBlogThread = params => {
    return axios.get(`/api/admin/blogThreads/read?fid=&current=1`, { params: params }).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
}
// 查询单条博客
export function findBlogPost(data) {
  return request({
      url: `${base}/blogpost/findBlogPost`,
      method: 'post',
      data
  })
}
// 添加博客
export function saveBlogPost(data) {
  return request({
      url: `${base}/blogpost/saveBlogPost`,
      method: 'post',
      data
  })
}
// 查询博客详情
export const getBlogView = params => {
    // tid
    // currentPage
    return axios.get('/api/admin/blogPosts/read', { params: params }).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
}

// 查询单条问答
export function findForumPost(data) {
  return request({
    url: `${base}/forumpost/findForumPost`,
    method: 'post',
    data
  })
}

// 新增问答
export function addForumPost(data) {
  return request({
    url: `${base}/forumpost/addForumPost`,
    method: 'post',
    data
  })
}

// 查询单条话题
export const findTopic = params => {
  return axios.post(`${base}/topic/findTopic`, params).then(res => {
      return res.data
  })
}

// 添加话题
export function saveTopic(data) {
  return request({
    url: `${base}/topic/saveTopic`,
    method: 'post',
    data
  })
}

// 获取验证码
export function getVerify() {
  // eslint-disable-next-line prefer-const
  let newDate = new Date().getTime()
  return process.env.VUE_APP_BASE_API + '/common/verifyCode?romdonCode=' + newDate
}

// 获取短信验证码
export function sendVerfyCode(data) {
  return request({
    url: `${base}/user/sendVerfyCode`,
    method: 'post',
    data
  })
}
