<template>
  <div class="wrap_on">
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <section class="account">
      <input v-model="username" type="text" placeholder="账号">
    </section>
    <section class="password_old">
      <input v-model="oldpassword" type="password" placeholder="旧密码">
    </section>
    <section class="password_new">
      <input v-model="newpassword" type="password" placeholder="请输入新密码">
    </section>
    <section class="password_Y">
      <input v-model="confirmpassword" type="password" placeholder="请确认密码">
    </section>
    <!-- verify: 验证码 -->
    <section class="verify">
      <div class="verify_left">
        <input v-model="captcha_code" type="text" placeholder="验证码">
      </div>
      <div class="verify_right">
        <img :src="code&&code" alt>
        <button>
          <p>看不清</p>
          <p @click="getCode()" style="color:#3b95e9">换一张</p>
        </button>
      </div>
    </section>
    <!-- register: 确认修改 -->
    <section @click="judge()" class="register">
      <input type="submit" value="确认修改">
    </section>
    <div class="warn" v-if="exists">
      <div class="warn_on">
        <span class="span_on"></span>
        <span class="span_on1">{{text_on}}</span>
      </div>
      <div @click="exists=!exists" class="warn_bot">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 创建空数组储存数据
      // content_on: [],
      exists: false,
      code: "",
      username: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      captcha_code: "",
      text_on:"",
      // 导航条
      head: {
        left: "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></a>",
        cont: "<a href=''>重置密码</a>",
        right: ""
      }
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    // 创建方法， 做判断
    judge() {
      //
      if (this.username == "" || !this.username) {
        this.exists = true;
        this.text_on = "请输入正确的账号 !";
      } else if (this.oldpassword == "") {
        this.exists = true;
        this.text_on = "请输入旧密码 !";
      }  else if (this.newpassword == "") {
        this.exists = true;
        this.text_on = "请输入新密码 !";
      } else if (this.confirmpassword == "") {
        this.exists = true;
        this.text_on = "请输入确认密码";
        }else if (this.confirmpassword != this.newpassword) {
        this.exists = true;
        this.text_on = "两次输入密码不一致 !";
      } else if (this.captcha_code == "") {
        this.exists = true;
        this.text_on = "请输入验证码 !";
      } else {
        this.user_on();
      }
    },
    user_on() {
      // 请求修改密码端口
      const pass_on = "https://elm.cangdu.org/v2/changepassword";
      // 请求
      this.$http({
        method: "post",
        url: pass_on,
        withCredentials: true,
        data: {
          username: this.username,
          oldpassWord: this.oldpassword,
          newpassword: this.newpassword,
          confirmpassword: this.confirmpassword,
          captcha_code: this.captcha_code
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 0 ) {
          this.exists = true;
          this.text_on = res.data.message;
        }else if (res.data.status == 1) {
          this.exists = true;
          this.text_on = res.data.success;
        } 
      });
    },
    // 验证码请求
    getCode() {
      const api = "https://elm.cangdu.org/v1/captchas";
      this.$http({
        method: "post",
        url: api,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log("tap", res);
        this.code = res.data.code;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap_on input {
  outline: none;
  font-size: 0.18rem;
}
.account {
  margin-top: 0.6rem;
  padding: 0 0.2rem;
  height: 0.36rem;
  background: white;
  line-height: 0.36rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.password_old,
.password_new,
.password_Y,
.verify {
  padding: 0.1rem 0.2rem;
  height: 0.4rem;
  background: white;
  line-height: 0.4rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.verify {
  .verify input {
    margin-top: 0.2;
  }
  .verify_left {
    float: left;
    width: 0.5rem;
  }
  .verify_right {
    float: right;
    line-height: 0.2rem;
    button {
      float: right;
      background: #fff;
      border: none;
      outline: none;
    }
  }
}

.register {
  margin-top: 0.2rem;
  padding: 0.1rem 0.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  input {
    width: 100%;
    height: 100%;
    text-align: center;
    border: 0.01rem solid #4cd964;
    border-radius: 0.05rem;
    background: #4cd964;
  }
}
.warn {
  position: absolute;
  width: 2.9rem;
  height: 2rem;
  margin-top: -1.9rem;
  margin-left: 0.4rem;
  text-align: center;
  border: 0.01rem solid white;
  border-radius: 5%;
  overflow: hidden;
  .warn_on {
    width: 100%;
    height: 1.5rem;
    background: white;
    
  }
  .warn_bot {
    width: 100%;
    height: 0.5rem;
    background: #4cd964;
    color: white;
    line-height: 0.5rem;
    font-size: 0.18rem;
    font-weight: bold;
  }
}
</style>
