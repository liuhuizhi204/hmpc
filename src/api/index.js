// api/index.js 管理网络请求接口方法
// 每个方法对应一个接口

import request from '@/utils/request.js'

// 每次调用api结尾的方法，都会得到一个promis对象
// 用户登录接口
export const loginAPI = function (data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
  //   console.log(PromiseObj)
  //   return PromiseObj
}
