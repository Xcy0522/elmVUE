<template>
  <div class="login_warp">
    <headCom :head="head"></headCom>
    <form>
      <!-- 账号 -->
      <section>
        <input type="text" v-model="username" placeholder="账号">
      </section>
      <!-- 密码 -->
      <section>
        <input :type="value2?'text':'password'" v-model="password" placeholder="密码">
        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </section>
      <!-- 验证码 -->
      <section>
        <input type="text" v-model="codeNumber" placeholder="验证码">
        <img :src="code&&code" alt>
        <div class="changeImage" @click="getCode()">
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </section>
    </form>
    <p class="hint">温馨提示:未注册是账号,登录时将自动注册</p>
    <p class="hint">注册过的用户可凭账号密码登录</p>
    <div @click="login()" class="login">登录</div>
    <router-link to="/forget" class="forget">重置密码?</router-link>
    <!-- 弹框 -->
    <div class="alert" v-if="isshow">
      <span class="iconfont icon-jinggao"></span>
      <p>{{erro}}</p>
      <div @click="isshow = !isshow; getCode() ">确认</div>
    </div>
    <!-- <alert :erro="erro" :boolean="isshow"></alert> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>密码登录</span>",
        right: ""
      },

      value2: true,
      username: "",
      password: "",
      codeNumber: "",
      code: "",
      erro: "",
      isshow: false
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      const urlGetCode = "https://elm.cangdu.org/v1/captchas";
      this.$http({
        method: "post",
        url: urlGetCode,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log(res);
        this.code = res.data.code;
      });
    },
    login() {
      if (this.username == "") {
        this.isshow = true;
        this.erro = "请输入账号";
      } else if (this.password == "") {
        this.isshow = true;
        this.erro = "请输入密码";
      } else if (this.codeNumber == "") {
        this.isshow = true;
        this.erro = "请输入验证码";
      } else {
        const urlLogin = "https://elm.cangdu.org/v2/login";
        this.$http({
          method: "post",
          url: urlLogin,
          data: {
            username: this.username,
            password: this.password,
            captcha_code: this.codeNumber
          },
          //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
          withCredentials: true
        }).then(res => {
          console.log(res);
          if (!res.data.message) {
            // this.$store.state.username = res.data.username;
            // let username = res.data.username;
            
            localStorage.setItem("username" , res.data.username)
            localStorage.setItem("userId" , res.data.user_id)

            this.$router.go(-1);
            // this.$router.push({
            //   name: "home",
            //   params: { id: res.data.user_id }
            // });
          } else {            
            this.isshow = true;
            this.erro = res.data.message;
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login_warp {
  form {
    margin-top: 0.55rem;
    background-color: #fff;
  }
  section {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0.19rem;
    border-bottom: 1px solid #f1f1f1;
    input {
      font-size: 0.16rem;
      outline: none;
    }
    img {
      width: 0.82rem;
      height: 0.35rem;
      margin-right: 0.04rem;
    }
  }
  .hint {
    font-size: 0.12rem;
    color: red;
    padding: 0.1rem 0.14rem;
    line-height: 0.11rem;
  }
  .login {
    margin: 0 0.12rem 0.23rem;
    font-size: 0.18rem;
    color: #fff;
    background-color: #4cd964;
    padding: 0.12rem 0;
    border: 1px;
    border-radius: 0.06rem;
    text-align: center;
  }
  .forget {
    float: right;
    font-size: 0.14rem;
    color: #3b95e9;
    margin-right: 0.07rem;
  }
  .changeImage {
    // display: flex;
    // flex-wrap: wrap;
    width: 0.48rem;
    height: 0.37rem;
    justify-content: center;
    p:first-child {
      width: 0.39rem;
      font-size: 0.13rem;
      color: #666;
    }
    p:last-child {
      color: #3b95e9;
      margin-top: 0.04rem;
      font-size: 0.13rem;
    }
  }
  .alert {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.3rem;
    margin-left: -1.4rem;
    width: 2.81rem;
    height: 1.71rem;
    animation: tipMove 0.4s;
    background-color: #fff;
    padding-top: 0.3rem;
    border: 0.01rem;
    border-radius: 0.05rem;
    text-align: center;
    border-top-left-radius: 0.02rem;
    border-top-right-radius: 0.02rem;

    .icon-jinggao {
      font-size: 0.65rem;
      color: #f8cb86;
    }
    p {
      font-size: 0.14rem;
      color: #333;
      width: 0.82rem;
      height: 0.21rem;
      line-height: 0.21rem;
      text-align: center;
      margin: 0.19rem auto 0;
      padding: 0 0.1rem;
    }
    div {
      font-size: 0.14rem;
      color: #fff;
      font-weight: 700;
      margin-top: 0.19rem;
      background-color: #4cd964;
      width: 100%;
      text-align: center;
      line-height: 0.42rem;
      border: 1px;
      border-bottom-left-radius: 0.05rem;
      border-bottom-right-radius: 0.05rem;
    }
  }
}
</style>
