<template>
  <div>
    <div>
      <!-- 导航条 -->
      <headCom :head="head"></headCom>
      <div class="top_on">
        <p>食品安全监督公示</p>
      </div>
      <div class="con_on">
        <p>监督检查结果: {{$store.state.shopInfo.rating&&$store.state.shopInfo.rating||4.7}}</p>
        <p class="p_bot">检查日期:</p>
      </div>
    </div>
    <div class="con_bottom">
      <div class="con_text">
        <p>工商登记信息</p>
        <div class="con_text_on">
          <div>企业名称</div>
          <div>工商执照注册号</div>
          <div>注册资本</div>
          <div>注册地址</div>
          <div>属地监管所</div>
          <div>法定代表人</div>
          <div>经营范围</div>
        </div>
      </div>
    </div>
    <div class="bot_on">
      <div class="bot_top">
        <p>餐饮许可证</p>
        <div class="bot_bottom">
          <p>营业范围</p>
          <p>许可证有效期</p>
          <p>许可证号</p>
          <p>发证时间</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "食品监督安全公示",
        right: "<a href='/'></a>"
      }
    };
  },
  methods: {
    food_list() {
        console.log(this.$store.state.shopInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.top_on,
.con_on {
  background: white;
}
.top_on {
  height: 0.43rem;
  line-height: 0.43rem;
  margin-top: 0.5rem;
  border: 0.01rem solid #f1f1f1;
  // background: white;
  p {
    margin: 0 0.1rem;
  }
}
.con_on {
  height: 0.6rem;
  padding: 0.2rem;
  line-height: 0.3rem;
  font-size: 0.13rem;
  color: #666;
}
.con_bottom {
  margin-top: 0.13rem;
  height: 2.8rem;
  background: white;
  .con_text {
    height: 0.43rem;
    line-height: 0.43rem;
    border: 0.01rem solid #f1f1f1;
    p {
      margin: 0 0.1rem;
      font-size: 0.17rem;
    }
    .con_text_on {
      height: 2.37rem;
      line-height: 0.33rem;
      margin: 0 0.2rem;
      // background: red;
      div {
        font-size: 0.1rem;
        color: #333;
      }
    }
  }
}
.bot_on {
  margin-top: 0.13rem;
  height: 1.8rem;
  background: white;
  .bot_top {
    height: 0.43rem;
    line-height: 0.43rem;
    border: 0.01rem solid #f1f1f1;
    p {
      margin: 0 0.1rem;
      font-size: 0.17rem;
    }
    .bot_bottom {
      line-height: 0.33rem;
      p {
        font-size: 0.1rem;
        color: #333;
      }
    }
  }
}
</style>