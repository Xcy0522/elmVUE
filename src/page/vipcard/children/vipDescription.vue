<template>
  <div class="vipDescription">
    <headCom :head="head"></headCom>
    <section class="markdown">
      <blockquote>
        <p>
          尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化：
          购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。
          注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。
        </p>
      </blockquote>
      <h3>Q1,特权介绍</h3>
      <ul>
        <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>
        <li>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</li>
        <li>更多特权，敬请期待！</li>
      </ul>
      <h3>Q2,资费介绍</h3>
      <ul>
        <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>     
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
        cont: "<span>我的优惠</span>",
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
  //     position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
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