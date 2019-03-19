<template>
  <div class="exchange">
    <headCom :head="head"></headCom>
    <section class="content">
      <form>
        <input type="text" v-model="exchangeCode" placeholder="请输入兑换码">
        <section class="yanzhengma">
          <input type="text" v-model="captcha" placeholder="验证码">
          <div class="left1">
            <img :src="code&&code" alt>
            <div class="change" @click="getCode()">
              <p>看不清</p>
              <p>换一张</p>
            </div>
          </div>
        </section>
      </form>
      <div class="duihuan" :class="exchangeCode.length != 0 && captcha.length == 4?'blue':''" @click="duihuan()">兑换</div>
    </section>
    <!-- 弹框 -->
    <div class="alert" v-if="isshow">
      <span class="iconfont icon-jinggao"></span>
      <p>{{erro}}</p>
      <div @click="isshow = !isshow">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>兑换红包</span>",
        right: ""
      },
      code: "",
      userId: localStorage.getItem("userId"),
      exchangeCode: "",
      captcha: "",
      erro:'',
      isshow:false,
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
        // console.log(res);
        this.code = res.data.code;
      });
    },
    duihuan() {
      // console.log(this.userId);
      const url =
        "https://elm.cangdu.org/v1/users/" + this.userId + "/hongbao/exchange";
      this.$http({
        method: "post",
        url: url,
        data: {
          exchange_code: this.exchangeCode,
          captcha_code: this.captcha
        }
      }).then(res => {
        // console.log(res);
        if (res.data.message) {
          this.erro = res.data.message;
          this.isshow = true;
        }
        // console.log(this.isshow,this.erro)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.exchange {
  .content {
    padding-top: 0.45rem;
    form {
      margin-top: 0.16rem;
      padding: 0 0.117rem;
      input {
        width: 3.33rem;
        font-size: 0.16rem;
        color: #666;
        padding: 0.14rem 0.093rem;
        border-radius: 0.05rem;
        outline: none;
      }
      .yanzhengma {
        width: 1.88rem;
        height: 0.51rem;
        display: flex;
        margin-top: 0.164rem;
        input {
          width: 1.88rem;
          padding: 0.093rem;
        }
        .left1 {
          display: flex;
          width: 1.34rem;
          align-items: center;
          margin-left: 0.07rem;
          background-color: #fff;
          padding-left: 0.05rem;
          border-radius: 0.05rem;
          img {
            width: 0.8rem;
            height: 0.33rem;
            margin-right: 0.04rem;
          }

          .change {
            display: flex;
            flex-direction: "column";
            flex-wrap: wrap;
            width: 0.44rem;
            justify-content: center;
            p:first-child {
              font-size: 0.12rem;
              line-height: 0.17rem;
              color: #666;
            }
            p:last-child {
              font-size: 0.12rem;
              line-height: 0.17rem;
              color: #3b95e9;
              margin-top: 0.04rem;
            }
          }
        }
      }
    }
    .duihuan {
      background-color: #ccc;
      font-size: 0.16rem;
      color: #fff;
      text-align: center;
      margin: 0.164rem 0.164rem 0;
      line-height: 0.42rem;
      border-radius: 0.05rem;
    }
    .blue {
      background-color: #4cd964;
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