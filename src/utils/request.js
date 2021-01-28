// 对axios进行二次封装，封装网络请求工作对象
// 引入axios
import axios from 'axios'
const ajax = axios.create({
  // 生成自定义Ajax对象
  //   所有的网络请求都会拼接在这个地址
  baseURL: 'http://api-toutiao-web.itheima.net'
})
// 导出ajax
export default ajax
