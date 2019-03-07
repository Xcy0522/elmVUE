<template>
  <div class="vipDescription">
    <headCom :head="head"></headCom>
    <section class="markdown">
      <h3>Q1,什么是商家代金券</h3>
      <ul>
        <li>商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。</li>
      </ul>
      <h3>Q2,怎么获得商家代金券？</h3>
      <ul>
        <li>进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。</li>   
        <li>「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。</li>   
      </ul>
      <h3>Q3,使用说明</h3>
      <ul>
        <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>
        <li>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</li>
        <li>更多特权，敬请期待！</li>
      </ul>
      <h3>Q4,温馨提示</h3>
      <ul>
        <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>
        <li>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</li>
      </ul>
   
    </section>
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
        cont: "<span>代金券说明</span>",
        right: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.markdown {
  background-color: #fff;
  z-index: 202;
  // padding-top: 1.95rem;
  overflow-y: auto;
  color: #999;
  font-size: 0.6rem;
  padding: 0.45rem 0.164rem 0;
  overflow-y: auto;
  blockquote {
    margin: 0.14rem 0.4rem;
    p {
      border: none;
      color: #333;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: .2rem;
    }
  }
  h3 {
    height: 0.21rem;
    line-height: 0.21rem;
    margin: 0.16rem 0 0.046rem;
    font-size: 0.18rem;
    font-weight: 600;
    color: #333;
  }
  li {
    color: #666;
    margin-bottom: .046rem;
    font-weight: 400;
    font-size: .14rem;
    line-height: .2rem;
  }
}
</style>