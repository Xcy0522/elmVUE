<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <div class="top">
      <div class="top_on">&nbsp;&nbsp;活动与属性</div>
      <ul class="true">
        <li v-for="(con, index) in num" :key="index">
          <span
            class="true_left"
            :class="con.icon_name=='减'?'red_on':con.icon_name=='准'?'blue_on':'true_left'"
          >{{con.icon_name}}</span>
          <span class="true_right">{{con.description}}&nbsp;(APP专享)</span>
        </li>
      </ul>
    </div>
    <section class="content_c">
      <div @click="$router.push({name: 'shopSafe'})" class="food_on">
        <span class="food_on_left">食品监督安全公示</span>
        <span class="food_on_right">企业认证详情 ></span>
      </div>
      <section class="content_food_on">
        <p>
          监督检查结果:
          <span>&nbsp;&nbsp;{{$store.state.shopInfo.rating&&$store.state.shopInfo.rating}}</span>
        </p>
        <p>检查日期:</p>
      </section>
    </section>
    <section class="merchant_message">
      <div class="merchant_">商家信息</div>
      <div class="merchant_text">效果展示</div>
      <div class="merchant_site">地址:  <span>{{shopInfo.address}}</span></div>
      <div class="merchant_time">营业时间:  <span>{{shopInfo.opening_hours&&shopInfo.opening_hours}}</span></div>
      <div class="merchant_license"><span>营业执照</span><span class="iconfont icon-you"></span></div>
      <div class="merchant_food"><span>餐饮服务许可证</span><span class="iconfont icon-you"></span></div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: [],
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "商家详情",
        right: "<a href='/'></a>"
      },
      shopInfo:{}
    };
  },
  created() {
    this.food_list();
  },
  methods: {
    food_list() {
      // console.log(this.$route);
      const url =
        "https://elm.cangdu.org/shopping/restaurant/"+(this.$route.params.id||1);
      this.$http({
        methods: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        // console.log(res);
        this.num = res.data.supports;
        this.$set(this,"shopInfo",res.data)
        this.$store.state.shopInfo = res.data;
        // console.log(this.$store.state.shopInfo,"啊啊啊啊");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 2rem;
  margin-top: 0.6rem;
  margin-bottom: 0.12rem;
  padding-bottom: 0.15rem;
  background: white;
  //
  .top_on {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    border-bottom: 0.01rem solid #f1f1f1;
    font-size: 0.2rem;
  }
  .true {
    margin: 0.1rem;
    height: 0.25rem;
    line-height: 0.3rem;
    font-size: 0.13rem;
  }
  .true_left {
    color: white;
    margin-right: 0.1rem;
    border: 0.01rem solid rgb(153, 153, 153);
    border-radius: 25%;
    background: rgb(153, 153, 153);
  }
  .red_on {
    color: white;
    margin-right: 0.1rem;
    border: 0.01rem solid rgb(240, 115, 115);
    border-radius: 25%;
    background: rgb(240, 115, 115);
  }
  .blue_on {
    color: white;
    margin-right: 0.1rem;
    border: 0.01rem solid rgb(87, 169, 255);
    border-radius: 25%;
    background: rgb(87, 169, 255);
  }
  .true_right {
    color: #666;
  }
}
.content_c {
  margin-top: 0.1rem;
  background: white;
  .food_on {
    padding: 0 0.15rem;
    line-height: 0.4rem;
    border-bottom: 0.01rem solid #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .food_on_left {
      font-size: 0.18rem;
    }
    .food_on_right {
      font-size: 0.17rem;
      color: #bbb;
    }
  }
  .content_food_on {
    padding: 0.15rem;
    line-height: 0.4rem;
    font-size: 0.15rem;
    p {
      span {
        color: #7ed321;
      }
    }
  }
}
.merchant_message {
  margin-top: 0.1rem;
  background: white;
  .merchant_ {
    font-size: 0.2rem;
    padding: 0.15rem;
    border-bottom: 0.01rem solid #f1f1f1;
  }
  .merchant_text, .merchant_site, .merchant_time, .merchant_license, .merchant_food {
    font-size: 0.13rem;
    color: #666;
    margin-left: 0.15rem;
    padding: 0.15rem 0.15rem 0.15rem 0;
    border-bottom: 0.01rem solid #f1f1f1;
  }
  .merchant_license, .merchant_food {
    display: flex;
    justify-content: space-between;
    line-height: 0.2rem;
    .iconfont {
      font-size: 0.3rem;
    }
  }
  
}
</style>
