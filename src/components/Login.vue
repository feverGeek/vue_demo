<template>
    <div id="login">
      <h1>欢迎您登录</h1>
      <div class="info">
        <div>
  
          <el-input placeholder="请输入账号" v-model="account"></el-input>
        </div>
        <div>
          
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
      </div>
      <div class="tool">
        <div class="btn">
          <el-button style="width:500px;height: 40px;margin-top: 10px;" @click="login" type="primary">登录</el-button>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'Login',
    created() {
      this.isLogin()
    },
    data() {
      return {
        account: '',
        password: '',
        loading: null,
      }
    },
    methods: {
      isLogin() {
        this.openLoading()
        this.$axios.post("/api/islogin")
          .then(res => {
            console.log(res)
            if (res.data.code == 200) {
                this.$router.push("/admin/index")
            }
            this.closeLoading()
          })
          .catch(err => {
            console.log(err)
            this.closeLoading()
          })
      },
      openLoading(text = "加载...") {
        this.loading = this.$loading({
          lock: true,
          text: text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      closeLoading() {
        if (this.loading) {
          this.loading.close()
        }
      },
      login() {
        if (!this.account) {
          this.$message({
            message: '请输入您的账号',
            type: 'warning'
          });
          return
        } else if (!this.password) {
          this.$message({
            message: '请输入您的密码',
            type: 'warning'
          });
          return
        }
        this.openLoading("登录中...")
        this.$axios.post("/api/login", { account: this.account, password: this.password })
          .then(res => {
            this.closeLoading()
            if (res.data.code == 200) {
                this.$router.push("/admin/index")
            } else {
              this.$message.error(res.data.data.info);
            }
            console.log(res)
          })
          .catch(err => {
            console.log(err)
            this.closeLoading()
          })
      }
    }
  }
  
  </script>
  <style scoped="">
  #login {
    width: 80%;
    height: 100%;
    margin: 100px auto;
  }
  
  #login h1 {
    width: 200px;
    margin: 10px auto;
  }
  #login .info {
    width: 60%;
    margin: 0 auto;
  }
  
  #login .info input {
    margin-top: 20px;
  }
  #login .tool{
    width: 50%;
    margin: 10px auto;
  }
  #login .tool .btn{
    display: flex;
    justify-content: space-around;
  }
  
  </style>
  