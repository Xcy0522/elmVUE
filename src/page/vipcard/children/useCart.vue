<template>
  <div class="useCard">
    <headCom :head="head"></headCom>
    <p class="change">
      成功兑换后将关联到当前账号:
      <span>{{username}}</span>
    </p>
    <form>
      <input type="text" v-model="cardNum" maxlength="10" placeholder="请输入10位卡号">
      <br>
      <input type="text" v-model="password" maxlength="6" placeholder="请输入6位卡密">
    </form>
    <button class="changButton" :class="{'green': buttonColor}" :disabled="!buttonColor" @click="buttonChange()">兑换</button>
    <footer>
      <h3>--温馨提示--</h3>
      <p>新兑换的会员服务,权益以「会员说明」为准</p>
      <p>月卡: 30次减免配送费。</p>
      <p>季卡: 90次减免配送费。</p>
      <p>年卡: 360次减免配送费。</p>
      <p>*仅限蜂鸟专送订单,每日最多减免3单,每单最高减免4元(一个月按31天计算)</p>
    </footer>
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
      msg: "我是使用卡号页面..",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>兑换会员</span>",
        right: ""
      },
      username: localStorage.getItem("username"),
      cardNum:"",
      password:"",
      isshow: false,
      erro: "",
    };
  },
  created() {},
  watch: {

  },
  methods: {
   buttonChange(){
     this.isshow = true;
     this.erro = "无效的卡号"
   }
  },
  computed: {
    buttonColor(){
      return this.cardNum.length == 10 && this.password.length == 6;
    }
  },
};
</script>

<style lang="scss" scoped>
.useCard {
  
  .change {
    padding-top: 0.45rem;
    height: 0.46rem;
    line-height: 0.46rem;
    padding-left: 0.164rem;
    font-size: 0.14rem;
    text-align: center;
    span {
      color: #333;
      font-weight: bold;
    }
  }
  form {
    height: 0.9375rem;
    background-color: #fff;
    input {
      padding-left: 0.1604rem;
      border-bottom: 0.01rem solid #f5f5f5;
      height: 0.4588rem;
      line-height: 0.4588rem;
      font-size: 0.14rem;
      color: #999;
      outline:none;
    }
  }
  .changButton {
    margin: 0.164rem 0.164rem 0;
    height: 0.42rem;
    width: 3.42rem;
    outline: none;
    border:none;
    line-height: 0.42rem;
    font-size: 0.16rem;
    background-color: #ccc;
    color: #fff;
    text-align: center;
    font-weight: 700;
    border-radius: 0.2rem;
  }
  footer {
    margin-top: .1rem;
    height: 1.42rem;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
  }
  .green {
    background-color: #4cd964;
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