<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <section class="top_img">
      <img data-v-9106692e src="//elm.cangdu.org/img/164ad0b6a3917599.jpg">
      <p class="top_con_p">等待支付</p>
      <p class="top_bot_p">再来一单</p>
    </section>
    <section class="details_con">
      <div class="details_t">
        <p class="text_">
          <img data-v-9106692e src="//elm.cangdu.org/img/164ad0b6a3917599.jpg">
          <span>效果展示</span>
        </p>
        <span class="iconfont icon-you"></span>
      </div>
      <div class="details_c">
        <p>下单后的食品名称</p>
        <p class="details_c_r">
          <span class="text_color">x 下单数量</span>
          <span>￥单价</span>
        </p>
      </div>
      <div class="money_con">
        <span>配送费</span>
        <span>4</span>
      </div>
      <div class="money_bot">实付 how money</div>
    </section>
    <!-- 最下方 -->
    <section class="distribution_bot">
      <p class="distribution_t_t">配送信息</p>
      <div class="distribution_t_c">
        <p>送达时间: 尽快送达</p>
        <div>
          <p>送货地址: 哈哈</p>
          <p class="on_p">32</p>
        </div>
        <p>配送方式: 蜂鸟专送</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      con: [],
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "订单详情",
        right: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.top_img {
  margin-top: 0.5rem;
  text-align: center;
  background: white;
  padding: 0.2rem;
  img {
    width: 0.7rem;
    height: 0.7rem;
    // margin-top: 0.2rem;
    border: 0.01rem solid #3190e8;
    border-radius: 50%;
    overflow: hidden;
  }
  p {
    margin-top: 0.1rem;
  }
  .top_con_p {
    font-size: 0.2rem;
    font-weight: 700;
  }
  .top_bot_p {
    color: #3190e8;
    margin: 0.1rem auto;
    border: 0.01rem solid #3190e8;
    border-radius: 0.05rem;
    line-height: 0.25rem;
    width: 0.7rem;
    font-size: 0.15rem;
  }
}
// 中间
.details_con {
  margin-top: 0.1rem;
  background: white;
  .details_t {
    padding: 0.03rem 0.06rem;
    border-bottom: 0.01rem solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text_ {
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
      span {
        font-size: 0.2rem;
        font-weight: 700;
      }
    }
  }
  .details_c {
    line-height: 0.46rem;
    padding: 0 0.15rem;
    font-size: 0.13rem;
    color: #666;
    border-bottom: 0.01rem solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .details_c_r {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text_color {
        color: #ccc;
      }
    }
  }
  .money_con {
    padding: 0 0.15rem;
    line-height: 0.46rem;
    border-bottom: 0.01rem solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.13rem;
    color: #666;
  }
  .money_bot {
    font-size: 0.13rem;
    color: #fb6b23;
    border-top: 0.01rem solid #f5f5f5;
    font-weight: 700;
    line-height: 0.46rem;
    text-align: right;
    padding-right: 0.15rem;
  }
}
.distribution_bot {
  margin-top: 0.1rem;
  background: white;
  .distribution_t_t {
    line-height: 0.46rem;
    padding: 0 0.15rem;
    font-size: 0.2rem;
    border-bottom: 0.01rem solid #f5f5f5;
  }
  .distribution_t_c {
    font-size: 0.15rem;
    color: #666;
    p {
      padding: 0.15rem;
    }
    div {
        padding: 0.15rem;
        line-height: 0.2rem;
      p {
          padding: 0;
      }
      .on_p {
        margin-left: 0.7rem;
      }
    }
  }
}
</style>
