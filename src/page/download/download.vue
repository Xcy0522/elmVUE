<template>
  <div class="service">
    <headCom :head="head"></headCom>
    <section class="download_warp">
      <div class="img">
        <img :src="elm" alt>
      </div>
      <p>下载饿了吗APP</p>
      <div class="download" @click="alert()">下载</div>
      <div class="alert" v-if="isshow">
        <span class="iconfont icon-jinggao"></span>
        <p>ios用户请前往AppStore下载</p>
        <div @click="isshow = !isshow">确认</div>
      </div>
    </section>
  </div>
</template>

<script>
let elm = require("../../images/elm.jpg");
export default {
  name: "service",
  data() {
    return {
      msg: "我是download页面..",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>下载</span>",
        right: ""
      },
      elm,
      isshow:false,
    };
  },
  created() {},
  methods: {
    alert(){
        this.isshow = true ;
    }
  }
};
</script>

<style lang="scss" scoped>
section.download_warp {
  padding-top: 0.45rem;
  text-align: center;
  .img {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0.24rem auto 0.05rem;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  p {
    font-size: 0.2rem;
    color: #666;
    margin-bottom: 0.23rem;
  }
  .download {
    background-color: #4cd964;
    font-size: 0.16rem;
    color: #fff;
    text-align: center;
    margin: 0.12rem 0.16rem 0;
    line-height: 0.42rem;
    border-radius: 0.05rem;
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
      font-size: 0.16rem;
      color: #333;
      width: 80%;
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