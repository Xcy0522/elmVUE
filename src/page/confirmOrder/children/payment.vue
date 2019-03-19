<template>
  <div class="payment">
    <headCom :head="head"></headCom>
    <section class="remainTime">
      <header>支付剩余时间</header>
      <p>00:{{time.minute +':' + time.second}}</p>
    </section>
    <!-- 支付方式 -->
    <div class="payStyle">选择支付方式</div>
    <section class="payItem">
      <div class="zhifubao">
        <img :src="zhifubaoimg" alt>
      </div>
      <span>支付宝</span>
      <i
        class="el-icon-circle-check"
        :class="{ 'blue': iszhifubao}"
        @click="iszhifubao = !iszhifubao"
      ></i>
    </section>
    <section class="payItem">
      <div class="weixiin">
        <img src alt>
      </div>
      <span>微信</span>
      <i
        class="el-icon-circle-check"
        :class="{ 'blue': !iszhifubao}"
        @click="iszhifubao = !iszhifubao"
      ></i>
    </section>
    <p class="conformPay" @click="conformPay()">确认支付</p>
    <!-- 弹窗 -->
    <div class="alert" v-if="isshow">
      <span class="iconfont icon-jinggao"></span>
      <p>{{erro}}</p>
      <div @click="conform2()">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      msg: "我是付款页页面..",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>在线支付</span>",
        right: ""
      },
      iszhifubao: true,
      time: {
        minute: 15,
        second: "00"
      },
      erro: "",
      isshow: false,
      conform: "",
      zhifubaoimg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAIAAABsNpe/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMjgzMDhGREVFQUIxMUU2OUE4QjgyRUYwMDgxQTc4QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMjgzMDhGRUVFQUIxMUU2OUE4QjgyRUYwMDgxQTc4QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQyODMwOEZCRUVBQjExRTY5QThCODJFRjAwODFBNzhBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQyODMwOEZDRUVBQjExRTY5QThCODJFRjAwODFBNzhBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+i3VM1AAACXJJREFU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"
    };
  },
  created() {
    this.isshow = true;
    this.erro = "暂不开放支付功能";
    this.setTime();
  },
  methods: {
    conformPay() {
      this.isshow = !this.isshow;
      this.erro = "当前环境无法支付,请打开官方APP进行支付";
      this.conform = "conform";
    },
    conform2() {
      this.isshow = !this.isshow;
      if (this.conform == "conform") {
        this.$router.push({ name: "order" });
        this.conform = "";
      }
    },
    setTime() {
      if (this.time.second <= 0 && this.time.minute <= 0) {
        return;
      } else {
        if (this.time.second == 0) {
          this.time.second = 59;
          this.time.minute--;
        } else {
          this.time.second--;
          if (this.time.minute < 10) {
            this.time.minute = this.time.minute - 0;
            this.time.minute = "0" + this.time.minute;
          }
          if (this.time.second < 10) {
            this.time.second = "0" + this.time.second;
          }
        }
        setTimeout(() => {
          this.setTime();
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.payment {
  .blue {
    color: #232b24;
  }
  .remainTime {
    height: 1.15rem;
    padding: 0.61rem 0.164rem 0.164rem;
    text-align: center;
    background-color: #fff;
    header {
      height: 0.19rem;
      margin-top: 0.234rem;
      font-size: 0.14rem;
      color: #666;
    }
    p {
      font-size: 0.3rem;
      color: #333;
      margin: 0.07rem 0 0.234rem;
    }
  }
  .payStyle {
    background-color: #f1f1f1;
    padding: 0 0.164rem;
    font-size: 0.16rem;
    color: #666;
    line-height: 0.42rem;
  }
  .payItem {
    height: 0.6rem;
    padding: 0.09rem 0.16rem;
    border-bottom: 0.01rem solid #f5f5f5;
    background-color: #fff;
    div {
      float: left;
      height: 0.6rem;
      line-height: 0.6rem;
      img {
        width: 0.469rem;
        height: 0.469rem;
        margin-top: 0.05rem;
      }
    }
    span {
      height: 0.6rem;
      line-height: 0.6rem;
      margin-left: 0.05rem;
    }
    .el-icon-circle-check {
      font-size: 0.35rem;
      float: right;
      margin-top: 0.1rem;
    }
  }
  .conformPay {
    background-color: #4cd964;
    font-size: 0.2rem;
    color: #fff;
    text-align: center;
    margin: 0.12rem 0.164rem 0;
    height: 0.42rem;
    line-height: 0.42rem;
    border-radius: 0.04rem;
    font-weight: 700;
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