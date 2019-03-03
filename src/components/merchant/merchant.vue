<template>
  <!-- 附近商家 -->
  <div class="merchant">
    <!-- 商家列表 -->
    <ul class="merchant_list">
      <li v-for="(con, index) in content_on" :key="index">
        <!-- 引路由 -->
        <div @click="gotoApprance(con.id,con.latitude,con.longitude)">
          <img :src="'http://elm.cangdu.org/img/'+con.image_path" alt>
          <div class="brand">
            <span class="brand_on">品牌</span>
            <span class="brand_t">{{con.name}}</span>
            <p>
              <span class="span">保</span>
              <span class="span">准</span>
              <span class="span">票</span>
            </p>
            <!-- 评分 -->
            <div class="grade">
              <el-rate
                style="display:inline-block"
                v-model="con.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <span style="color: grey">&nbsp;&nbsp;月售</span>
              <span>{{con.recent_order_num}}</span>
              <span
                style="color: grey"
              >单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="grade_on">蜂鸟专送</span>
              <span class="grade_right">准时达</span>
            </div>
            <div class="price_bot">
              <!-- <p class="bot_left"> -->
              <span
                style="color: grey"
              >&nbsp;&nbsp;￥{{con.float_minimum_order_amount}}起送/配送费约{{con.float_delivery_fee}}元</span>
              <!-- </p> -->
              <p class="bot_right">
                <span style="color: grey">{{con.distance}}/</span>
                <span style="color: #3190e8;">{{con.order_lead_time}}</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   商铺列表
      content_on: []
    };
  },
  created() {
    this.shoop_list();
  },
  methods: {
    shoop_list() {
      const url =
        "https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762";
      this.$http({
        method: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        console.log("111", res);
        this.content_on = res.data;
      });
    },
    gotoApprance(id, latitude, longitude) {
      localStorage.setItem("storeId", "id");
      this.$router.push({
        name: "shop",
        query: {
          id: id,
          geohash: latitude + "," + longitude
        }
      });
    }
  }
};
</script>
<style lang="scss">
.merchant {
/* 商家列表css样式 */
.merchant_list li img {
  vertical-align: top;
  width: 0, 67rem;
  height: 0.67rem;
  margin-bottom: 0.21rem;
  float: left;
}
.merchant_list {
  margin-bottom: 0.5rem;
}
.brand {
  width: 2.84rem;
  height: 0.66rem;
  top: 0rem;
  display: inline-block;
  font-size: 0.12rem;
  font-weight: 900;
  padding: 0.01rem;
  /* background: greenyellow; */
}
.brand_on {
  background: #ffd930;
  border: 0.01rem solid #ffd930;
  border-radius: 15%;
  margin-left: 0.08rem;
}
.brand_t {
  color: #333;
  font-size: 0.16rem;
  font-weight: 700;
}
.span {
  border: 0.01rem solid #e4e4e4;
  border-radius: 15%;
  margin-right: 0.02rem;
  font-size: 0.01rem;
  color: grey;
}
.brand p {
  float: right;
  right: 0rem;

  /* margin-left: 0.5rem; */
}
/* 评分 */
.grade {
  width: 4rem;
  float: left;
  margin: 0.05rem -0.43rem;
  transform: scale(0.7);
}
.grade_on {
  border: 0.01rem solid #3190e8;
  border-radius: 5%;
  background: #3190e8;
  color: white;
  /* margin-le */
}
.grade_right {
  border: 0.01rem solid #3190e8;
  color: #3190e8;
  border-radius: 5%;
}
.price_bot p {
  display: inline-block;
  /* font-size: 0.12rem; */
  /* background: red; */
}
.bot_left {
  float: left;
  background: blue;
}
.bot_right {
  float: right;
}
}
</style>