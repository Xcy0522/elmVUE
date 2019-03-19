<template>
  <div class="msite">
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <!-- 轮播图 -->
    <div class="scroll_on">
      <swiper v-if="title_on.length>0" :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <!-- 第一张轮播 -->
          <ul class="scroll_left">
            <li
              v-for="(con, index) in title_on.slice(0, 8)"
              :key="index"
              @click="gofood(geohash,con.title,con.id)"
            >
              <img :src="'https://fuss10.elemecdn.com' +con.image_url" alt>
              <p>{{con.title}}</p>
            </li>
          </ul>
        </swiper-slide>
        <swiper-slide>
          <!-- 第二张轮播 -->
          <ul class="scroll_right">
            <li v-for="(con, index) in title_on.slice(8, 16)" :key="index">
              <img :src="'https://fuss10.elemecdn.com' +con.image_url" alt>
              <p>{{con.title}}</p>
            </li>
          </ul>
          <!-- </div> -->
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="merchant_title">
      <span class="iconfont icon-fangzi"></span>
      附近商家
    </div>
    <merchant></merchant>
    <footGuide></footGuide>
  </div>
</template>

<script>
export default {
  name: "msite",
  data() {
    return {
      // 食品分类
      title_on: [],
      // 商铺评分
      // value5: this.con.tating,
      //  头部
      head: {
        left: "<a href='#/search'><i class='el-icon-search'></i></a>",
        cont: "<a href='#/home'>" + this.$store.state.city.name + "</a>",
        right: "<a href='#/login'><span>登录/注册</span></a>"
      },

      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true
      },
      geohash: localStorage.getItem("geohash")
    };
  },
  created() {
    console.log(
      localStorage.getItem("name"),
      localStorage.getItem("address"),
      localStorage.getItem("geohash")
    );
    this.shoop();
    if (localStorage.getItem("username")) {
      this.head.right =
        "<a href='#/profile' class='iconfont icon-zhaomugongyingshangshangji'></a>";
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper && this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    this.swiper && this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    shoop() {
      // 请求端口
      const url = "https://elm.cangdu.org/v2/index_entry";
      this.$http({
        method: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        this.title_on = res.data;
      });
    },
    gofood(geohash, title, restaurant_category_id) {
      this.$router.push({
        name: "food",
        query: { geohash, title, restaurant_category_id }
      });
    }
  }
};
</script>

<style lang="scss" >
.msite {
  width: 100%;
  background: #e4e4e4;

  .scroll_on {
    width: 100%;
    height: 1.85rem;
    margin-top: 0.5rem;
    text-align: center;
    background: white;
  }
  .scroll_left {
    display: flex;
    flex-wrap: wrap;
    /* border:1px solid black; */
  }
  .scroll_left li {
    width: 25%;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .scroll_right {
    display: flex;
    flex-wrap: wrap;
  }
  .scroll_right li {
    width: 25%;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  /* .scroll_on */
  .scroll_on img {
    width: 0.45rem;
    height: 0.45rem;
  }
  .scroll_on p {
    margin-top: 0.05rem;
    color: grey;
  }
  .swiper-container-horizontal .swiper-pagination {
    bottom: 0.01rem;
  }
  /* 附近商家 */
  .merchant {
    width: 100%;
    margin-top: 0.06rem;
    height: 100%;
    background: white;
  }
  .merchant_title {
    height: 0.4rem;

    line-height: 0.4rem;
    color: grey;
    background: white;
  }
  .merchant_title span {
    margin-left: 0.15rem;
  }
  .merchant_title span {
    font-size: 0.18rem;
    font-weight: bold;
  }
  .merchant_list li {
    height: 0.7rem;
    margin: 0 0.1rem;
    padding: 0.15rem 0;
    /* margin: 0.15rem 0; */
    border-bottom: 0.01rem solid #e4e4e4;
  }
}
</style>
