import axios from 'axios'
import { Toast } from 'mint-ui'
import { getToken } from '@/common/js/utils'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000 // request timeout
})

// 请求拦截器
service.interceptors.request.use (
  config => {
    // 设置请求头
    if (getToken()) {
      // 让每个请求携带token
      config.headers['Authorization'] = getToken()
    }

    // 对全局参数做过滤，把不存在的参数删除
    // if (config.method === 'get') {
    //   for (let key in config.params) {
    //     if (!config.params[key] && config.params[key] !== 0) {
    //       delete config.params[key]
    //     }
    //   }
    // }

    // config.method === 'get'
    //       ? config.data = qs.stringify({...config.data})
    //       : config.params = {...config.params}
    // config.data = qs.stringify({...config.data})
    // if (config.method === 'get' && config.data != null) {
    //   config.url = config.url + `?` + qs.stringify({ ...config.data })
    // }

    // 全局去前后空格
    function dataTrim(data) {
      if (Array.isArray(data)) {
        for (let item of data) {
          if (typeof item === 'object') {
            dataTrim(item)
          } else if (typeof item === 'string') {
            item = item.trim()
          }
        }
      } else if (typeof data === 'object') {
        for (let key in data) {
          if (typeof data[key] === 'object') {
            dataTrim(data[key])
          } else if (typeof data[key] === 'string') {
            data[key] = data[key].trim()
          }
        }
      }
    }
    // dataTrim(config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      Toast({
        message: res.msg,
        iconClass: 'icon icon-error'
      })
      // return Promise.reject('error')
    } else {
      let data = response.data
      // 对全局的初始时间过滤
      if (data.content && data.content.data) {
        if (Array.isArray(data.content.data)) {
          data.content.data.forEach(item => {
            for (let key in item) {
              if (item[key] === '1900-01-01T00:00:00') {
                item[key] = ''
              }
            }
          })
        } else {
          for (let key in data.content.data) {
            if (data.content.data[key] === '1900-01-01T00:00:00') {
              data.content.data[key] = ''
            }
          }
        }
      }
      return data
    }
  },
  error => {
    console.log(error) // for debug
    // let message = error.response
    //   ? globalFn.requestError(error.response.status)
    //   : '请求超时'
    // return Promise.reject(error)
  }
)

export default service
