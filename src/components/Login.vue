<!--  -->
<template>
  <div class='login-box'>
    <el-button class="show-account"
               type="text"
               @click="accountTip">提示帐号信息</el-button>
    <el-form :model="ruleForm2"
             :rules="rules2"
             ref="ruleForm2"
             label-position="left"
             label-width="70px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username"
                    label="账号">
        <el-input type="text"
                  v-model="ruleForm2.username"
                  auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password"
                    label="密码">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"
                   checked
                   class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   @click.native.prevent="handleSubmit2"
                   :loading="logining">登录</el-button>
        <el-button @click.native.prevent="handleReset2">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  //import { requestLogin } from '../../api/api.js';
  import { login } from '../api/User'
  import { setCookie, getCookie, delCookie } from '../utils/util'
  export default {
    name: "Login",
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data () {
      //这里存放数据
      return {
        logining: false,
        ruleForm2: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: false
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合

    methods: {
      getuserpwd() {
        if (getCookie('user') != '' && getCookie('pwd') != '') {
          this.ruleForm2.username = getCookie('user')
          this.ruleForm2.password = getCookie('pwd')
          this.checked = true
        }
      },

      handleReset2 () {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2 (ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm2.username, password: this.ruleForm2.password };
            login(loginParams).then(res =>{
              this.logining = false;
              console.log(res)
              if(res.status==200){
                if (this.checked) {
                        //保存帐号到cookie，有效期7天
                        setCookie('user', this.ruleForm2.username, 7)
                        //保存密码到cookie，有效期7天
                        setCookie('pwd', this.ruleForm2.password, 7)
                      } else {
                        delCookie('user')
                        delCookie('pwd')
                      }
                this.$message({
                        message: '登录成功',
                        type: 'success'
                      });
                this.$store.commit("login",res.data.token);
                this.$router.push({ path: '/test/test' });
              }else{
                this.$message({
                  message: "登录失败",
                  type: "error"
                });
              }

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      accountTip () {
        this.$notify({
          title: '账号：admin',
          dangerouslyUseHTMLString: true,
          message: '<strong>密码：<i>admin</i></strong>',
          type: 'success',
          position: 'bottom-left'
        })
      }

    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created () {
      this.getuserpwd()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted () {
      this.accountTip()
    },
    //生命周期 - 创建之前
    beforeCreate () { },
    //生命周期 - 挂载之前
    beforeMount () { },
    //生命周期 - 更新之前
    beforeUpdate () { },
    //生命周期 - 更新之后
    updated () { },
    //生命周期 - 销毁之前
    beforeDestroy () { },
    //生命周期 - 销毁完成
    destroyed () { },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated () { },
  }
</script>
<style scoped>
  /* @import url(); 引入公共css类 */
  .login-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .show-account {
    position: absolute;
    left: 15px;
    bottom: 20px;
    color: red;
  }
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    left: 50%;
    margin-top: -177px;
    margin-left: -170px;
    top: 50%;
  }
  .title {
    margin: 0px auto 36px auto;
    text-align: center;
    color: #505458;
    font-size: 18px;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
