<template>
  <!-- 自己写的样式名login-container -->
  <div class="login-container">
    <!-- 登录窗口 -->
    <div class="login-form-wrap">
      <!-- 第一行: logo -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- element-ui组件-form表单 -->
      <!-- ref相当于id是组件里起的名 -->
      <!-- model是表单绑定书店对象（值是onject类型） -->
      <el-form class="login-form" ref="form" :model="form" :rules="rules">
        <!-- 第一行: 手机号 -->
        <el-form-item prop='mobile'>
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>

        <!-- 第二行: 验证码 -->
        <el-form-item  prop='code'>

            <el-input placeholder="请输入验证码" v-model="form.code"></el-input>

        </el-form-item>

        <!-- 第三行: 协议 -->
        <el-form-item prop='check'>
          <el-checkbox-group v-model="form.check">
             <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
           </el-checkbox-group>

        </el-form-item>

        <!-- 第四行: 登录按钮  -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginFn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { loginAPI } from '@/api/index.js'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false
      },
      rules: {
        mobile: [{
          pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
          required: true,
          message: '手机号格式不正确',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          len: 6,
          message: '请输入六位数密码',
          trigger: 'change'
        }],
        check: [
          { // 正则只能判断字符串, 不能判断布尔类型
          // rule: 规则对象
          // value: 绑定标签要检验的值
            validator: (rule, value, callback) => {
              if (value === false) {
                callback(new Error('请勾选协议')) // 返回一个错误提示(类似于message的值)
              } else {
                callback()
              }
            },
            trigger: 'change' // checkbox只能写change事件
          }
        ]
      }

    }
  },
  methods: {
    loginFn () {
      // this.$refs是固定的属性用来查找标签里ref属性值为form的那个标签对象
      // 然后调用validate方法走一遍表单所有的检验规则
      this.$refs.form.validate(async valid => { // valid返回检验的所有结果(如果有一个不符合直接返回false)
        if (valid === false) return // 阻止代码往下走
        const res = await loginAPI(this.form) // await可以把回调函数干掉(不用then了) - await只能等待Promise成功的结果(await 会把then(res=>{})里的res 提取留在原地)
        console.log(res)
      })
    }
  }
}

</script>

<style scoped lang="less">
// 铺满整屏和表单的额外样式
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
