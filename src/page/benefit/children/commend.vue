<template>
  <div class="commend">
    <headCom :head="head"></headCom>
    <section class="activeImg">
      <img :src="activeImg" alt>
    </section>
    <section class="style">
      <div class="styleLeft" @touchend="isshow = !isshow;">
        <img :src="weixin" alt>
        <p>邀请微信好友</p>
      </div>
      <div class="styleConter" @touchend="isshow = !isshow;">
        <img :src="QQ" alt>
        <p>邀请QQ好友</p>
      </div>
      <div class="styleRight" @touchend="isshow = !isshow;">
        <img :src="erweima" alt>
        <p>面对面邀请</p>
      </div>
    </section>
    <section class="userMessage">
      <div class="left">
        <p>累计收益</p>
        <p>
          <span>0</span> 元
        </p>
      </div>
      <div class="right">
        <p>成功邀请</p>
        <p>
          <span class="gray">0</span> 人
        </p>
      </div>
    </section>
    <p class="moneyDetail">-收益明细-</p>
    <section class="money">
      <img :src="money" alt>
      <p>还不赶紧去邀请好友</p>
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
let activeImg = require("../../../images/activity.png");
let erweima = require("../../../images/erweima.png");
let money = require("../../../images/money.png");
let QQ = require("../../../images/QQ.png");
let weixin = require("../../../images/weixin.png");
export default {
  name: "city",
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>推荐有奖</span>",
        right: ""
      },
      activeImg,
      erweima,
      money,
      QQ,
      weixin,
      isshow: false,
      erro: "请在饿了吗APP中打开"
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.commend {
  .activeImg {
    padding-top: 0.45rem;
    img {
      width: 3.75rem;
    }
  }
  .style {
    display: flex;
    padding: 0.234rem 0;
    background-color: #fff;
    div {
      flex: 1;
      text-align: center;
      img {
        width: 0.59rem;
      }
      p {
        font-size: 0.14rem;
        line-height: 0.16rem;
        color: #333;
      }
    }
  }
  .userMessage {
    display: flex;
    margin-top: 0.23rem;
    font-size: 0.14rem;
    color: #666;
    .left {
      border-right: 0.01rem solid #666;
    }
    div {
      flex: 1;
      text-align: center;
      p {
        color: #666;
        line-height: 0.16rem;
        span {
          font-size: 0.16rem;
          color: #ff5633;
          font-weight: 700;
        }
        .gray {
          color: #666;
        }
      }
    }
  }
  .moneyDetail {
    text-align: center;
    margin-top: 0.234rem;
    font-size: 0.14rem;
    color: #666;
  }
  .money {
    text-align: center;
    margin-top: 0.234rem;
    img {
      width: 0.3rem;
    }
    p {
      font-size: 0.14rem;
      line-height: 0.16rem;
      color: #999;
    }
  }
  // 弹框
  .alert {
    @keyframes tipMove {
      0% {
        transform: scale(1);
      }
      35% {
        transform: scale(0.8);
      }
      70% {
        transform: scale(1.1);
      }
      to {
        transform: scale(1);
      }
    }
    translate: all tipMove;
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