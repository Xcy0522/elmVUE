<template>
  <div class="info">
    <headCom :head="head"></headCom>
    <section class="top2">
      <label class="ui_button" for="xFile">
        <div class="headPhoto">
          <h2>头像</h2>
          <i class="el-icon-arrow-right"></i>
          <span class="iconfont icon-face"></span>
        </div>
      </label>
      <form>
        <input type="file" id="xFile" style="position:absolute;clip:rect(0 0 0 0);">
      </form>
    </section>
    <router-link :to="{name:'setusername'}">
      <section class="infoCommon">
        <h2>用户名</h2>
        <i class="el-icon-arrow-right"></i>
        <p class="username">{{username}}</p>
      </section>
    </router-link>
    <router-link :to="{name:'address'}">
      <section class="infoCommon">
        <h2>收货地址</h2>
        <i class="el-icon-arrow-right"></i>
      </section>
    </router-link>
    <section class="wordCommon">
      <h2>账号绑定</h2>
    </section>
    <section class="infoCommon">
      <i class="el-icon-mobile-phone"></i>
      <h2>手机</h2>
      <i class="el-icon-arrow-right"></i>
    </section>
    <section class="wordCommon">
      <h2>安全设置</h2>
    </section>
    <router-link :to="{name:'forget'}">
      <section class="infoCommon password">
        <h2>密码登录</h2>
        <i class="el-icon-arrow-right"></i>
        <p>修改</p>
      </section>
    </router-link>
    <section class="exit" @click="exit()">退出登录</section>
    <!-- 弹窗 -->
    <div class="alert" v-if="isshow">
      <span class="iconfont icon-jinggao"></span>
      <p>是否退出登录</p>
      <div @click="isshow = !isshow; $router.push({name:'info'})" class="wait">在等等</div>
      <div @click="exit2()"  class="exit">退出登录</div>
    </div>
    <footGuide></footGuide>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>账户信息</span>",
        right: "",
      },
      isshow: false,
      erro: "",
       username: localStorage.getItem("username") ,
    };
  },
  created() {},
  methods: {
    exit() {
      this.isshow = true;

      const exitUrl = "https://elm.cangdu.org/v2/signout";
      this.$http({
        method: "get",
        url: exitUrl
      }).then(res => {
        // console.log(res);
      });
    },
    exit2(){
      this.isshow = !this.isshow;
      this.$router.push({name:'profile'});
      localStorage.removeItem("username");
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  .top2 {
    padding-top: 0.45rem;
    // height: .2rem;
    .headPhoto {
      height: 0.5rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
      padding: 0.12rem 0.1rem;
      border-top: 0.01rem solid #ddd;
      background: #fff;
      overflow: hidden;
      h2 {
        font-size: 0.16rem;
        color: #333;
        font-weight: 500;
        float: left;
      }
      .el-icon-arrow-right {
        float: right;
        font-size: 0.2rem;
        margin-top: 0.17rem;
        margin-left: 0.03rem;
      }
      span {
        font-size: 0.5rem;
        color: aqua;
        float: right;
      }
    }
  }

  .infoCommon {
    height: 0.328rem;
    line-height: 0.328rem;
    padding: 0.07rem 0.0937rem;
    border-top: 0.01rem solid #ddd;
    background: #fff;
    overflow: hidden;
    h2 {
      font-size: 0.16rem;
      color: #333;
      font-weight: 500;
      float: left;
    }
    .username {
      height: 0.33rem;
      line-height: 0.33rem;
      margin-right: 0.05rem;
      float: right;
    }
    .el-icon-mobile-phone {
      float: left;
      font-size: 0.2rem;
      margin-top: 0.24em;
      background-color: aqua;
      margin-right: 0.04rem;
    }
    .el-icon-arrow-right {
      float: right;
      font-size: 0.2rem;
      margin-top: 0.24em;
      margin-left: 0.03rem;
    }
    span {
      font-size: 0.5rem;
      color: aqua;
      float: right;
    }
  }
  .wordCommon {
    padding: 0.09375rem;
    height: 0.16rem;
    line-height: 0.16rem;
    border-top: 0.01rem solid #ddd;
    h2 {
      font-size: 0.14rem;
      color: #333;
      font-weight: 500;
    }
  }
  .password {
    border-bottom: 0.01rem solid #ddd;
    p {
      text-align: left;
      float: right;
      line-height: 0.33rem;
      font-size: 0.16rem;
      color: #999;
      margin-right: 0.05rem;
      font-weight: 100;
      font-family: Arial;
    }
  }
  .exit {
    width: 96%;
    margin: 0.304rem auto 0;
    height: 0.35rem;
    line-height: 0.35rem;
    border-radius: 0.04rem;
    text-align: center;
    background: #d8584a;
    font-size: 0.15rem;
    color: #fff;
  }

  .alert {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.5rem;
    margin-left: -1.4rem;
    width: 2.81rem;
    // height: 1.71rem;
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
      font-size: 0.2rem;
      color: #333;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      margin: 0.25rem auto 0;
      padding: 0 0.1rem;
    }
    .wait {
      font-size: 0.14rem;
      color: #fff;
      font-weight: 700;
      margin: 0.1rem .2rem .2rem;
      float: left;
      background-color: #4cd964;
      width: 30%;
      text-align: center;
      height: .35rem;
      line-height: 0.35rem;
      border: 1px;
      border-radius: 0.05rem;
    }
    .exit {
      font-size: 0.14rem;
      color: #fff;
      font-weight: 700;
      float: right;
      margin: 0.1rem .2rem .2rem;
      background-color: red;
      width: 30%;
      text-align: center;
      height: .35rem;
      line-height: 0.35rem;
      border: 1px;
      border-radius: 0.05rem;
    }
  }
}
</style>