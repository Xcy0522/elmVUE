<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <div class="top">
      <div class="top_on">&nbsp;&nbsp;活动与属性</div>
      <ul class="true">
          <li v-for="(con, index) in num" :key="index">
              <span class="true_left" :class="con.icon_name=='减'?'red_on':con.icon_name=='准'?'blue_on':'true_left'">{{con.icon_name}}</span>
              <span class="true_right">{{con.description}}&nbsp;(APP专享)</span>
          </li>
      </ul>
    </div>
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
      }
    };
  },
  created() {
      this.food_list();
  },
  methods: {
      food_list(){
          const url = "https://elm.cangdu.org/shopping/restaurant/"+this.$route.params.id;
          this.$http({
              methods: "get",
              url: url,
              withCredentials: true
          }).then((res) => {
              console.log(res);
              this.num = res.data.supports;
          });
      }
  },
};
</script>

<style lang="scss">
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
</style>