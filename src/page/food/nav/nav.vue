<template>
  <div class="food_nav" :class="{'nav_warp':isopenkind||isopensort||isopenscreen}">
    <div class="nav_title_warp">
      <div
        class="nav_title"
        @click="clickOpen('isopenkind','kind',kind)"
        :class="isopenkind&&'color_rev'"
      >
        <span v-text="kind">分类</span>
        <span :class="isopenkind&&'icon_rev'" class="iconfont icon-arrDown"></span>
      </div>
      <div
        class="nav_title"
        @click="clickOpen('isopensort','sort',sort)"
        :class="isopensort&&'color_rev'"
      >
        <span v-text="sort">排序</span>
        <span class="iconfont icon-arrDown" :class="isopensort&&'icon_rev'"></span>
      </div>
      <div
        class="nav_title"
        @click="clickOpen('isopenscreen','screen',screen)"
        :class="isopenscreen&&'color_rev'"
      >
        <span v-text="screen">筛选</span>
        <span class="iconfont icon-arrDown" :class="isopenscreen&&'icon_rev'"></span>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="nav_kind" v-show="isopenkind">
        <div class="nav_kind_left">
          <ul>
            <li
              v-for="(v,i) in StoreList"
              :key="i"
              @click="listOpen(v.sub_categories,i)"
              :class="openList==i&&'list_bag'"
            >
              <img :src="setUrl(v.image_url)" class="float_left">
              <span class="float_left">{{v.name}}</span>
              <span class="float_right">
                <b>{{v.count}}</b>
                <span class="iconfont icon-you"></span>
              </span>
            </li>
          </ul>
        </div>
        <div class="nav_kind_right">
          <ul>
            <li v-for="(v,i) in StoreListTwo" :key="i" @click="setKind(v.id,v.name)">
              <span class="float_left">{{v.name&&v.name}}</span>
              <span class="float_right">{{v.count&&v.count}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div>
      <transition name="slide-fade">
      <div class="nav_sort_right" v-show="isopensort">
        <ul>
          <li v-for="(v,i) in sortList" :key="i" @click="setSort(v)">
            <span class="iconfont" :class="v[1]"></span>
            <span>{{v[0]}}</span>
          </li>
        </ul>
      </div>
      </transition>
    </div>
    <transition name="slide-fade">
    <div class="nav_scren" v-if="isopenscreen">
      <div class="biao">
        <b>配送方式:</b>
        <div @click="optScreen2(1)">
          <span class="iconfont icon-dui" v-if="delivery_mode.indexOf(1)>-1">蜂鸟专送</span>
          <span class="iconfont icon-fengniao" v-else>蜂鸟专送</span>
        </div>
      </div>
      <div class="tq">
        <b>商家属性 ( 可以多选 )</b>
        <br>
        <span class="sty_border" @click="optScreen(8)">
          <span class="iconfont icon-dui" v-if="support_ids.indexOf(8)>-1"></span>
          <span class="sty_a" v-else>品</span>
          <span>品牌专家</span>
        </span>
        <span class="sty_border" @click="optScreen(7)">
          <span class="iconfont icon-dui" v-if="support_ids.indexOf(7)>-1"></span>
          <span class="sty_b" v-else>保</span>
          <span>外卖保</span>
        </span>
        <span class="sty_border" @click="optScreen(9)">
          <span class="iconfont icon-dui" v-if="support_ids.indexOf(9)>-1"></span>
          <span class="sty_a" v-else>准</span>
          <span>准时达</span>
        </span>
        <br>
        <span class="sty_border" @click="optScreen(5)">
          <span class="iconfont icon-dui" v-if="support_ids.indexOf(5)>-1"></span>
          <span class="sty_c" v-else>新</span>
          <span>新店</span>
        </span>
        <span class="sty_border" @click="optScreen(3)">
          <span class="iconfont icon-dui" v-if="support_ids.indexOf(3)>-1"></span>
          <span class="sty_c" v-else>付</span>
          <span>在线支付</span>
        </span>
        <span class="sty_border" @click="optScreen(4)">
          <span class="iconfont icon-dui" v-if="support_ids.indexOf(4)>-1"></span>
          <span class="sty_b" v-else>票</span>
          <span>开发票</span>
        </span>
      </div>
      <div class="bot">
        <span @click="clearScreen">清空</span>
        <span @click="setScreen()">
          确定
          <i
            v-if="delivery_mode.length+support_ids.length"
          >({{delivery_mode.length+support_ids.length}})</i>
        </span>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "foodnav",
  props: ["getList"],
  data() {
    return {
      kind: "分类",
      sort: "排序",
      screen: "筛选",
      isopenkind: false,
      isopensort: false,
      isopenscreen: false,
      StoreList: {},
      StoreListTwo: {},
      sortList: [
        ["智能排序(默认)", "icon-icon091", 4],
        ["距离最近", "icon-dizhi", 5],
        ["销量最高", "icon-huomiao", 6],
        ["起送价", "icon-qian1", 1],
        ["配送速度", "icon-biao", 2],
        ["评分", "icon-pingfen", 3]
      ],
      order_by: 4,
      openList: 8,
      delivery_mode: [],
      support_ids: [],
      restaurant_category_ids: [],
      offset: 0
    };
  },
  created() {
    this.getStoreList({
      latitude: this.$route.query.geohash.split(",")[0],
      longitude: this.$route.query.geohash.split(",")[1]
    });
    this.getList(this.setquery);
  },
  computed: {
    // 计算属性的 getter
    setquery() {
      // `this` 指向 vm 实例
      return {
        support_ids: this.support_ids,
        delivery_mode: this.delivery_mode,
        order_by: this.order_by,
        offset: this.offset,
        restaurant_category_ids: this.restaurant_category_ids,
        restaurant_category_id: this.$route.query.restaurant_category_id,
        latitude: this.$route.query.geohash.split(",")[0],
        longitude: this.$route.query.geohash.split(",")[1]
      };
    }
  },
  methods: {
    clickOpen(open, name, value) {
      this[name] = value;
      if (this[open]) {
        this[open] = !this[open];
      } else {
        this.isopenkind = false;
        this.isopensort = false;
        this.isopenscreen = false;
        this[open] = !this[open];
      }
    },
    listOpen(openIndex, index) {
      this.StoreListTwo = openIndex;
      this.openList = index;
    },
    getStoreList(query) {
      let url = "https://elm.cangdu.org/shopping/v2/restaurant/category";
      this.$http({
        method: "get",
        url,
        params: {
          longitude: this.$route.query.geohash.split(",")[1],
          latitude: this.$route.query.geohash.split(",")[0]
        }
      }).then(response => {
        //这里使用了ES6的语法
        // console.log(response); //请求成功返回的数据;

        this.$set(this, "StoreList", response.data);
        this.$set(
          this,
          "StoreListTwo",
          response.data[this.openList].sub_categories
        );
      });
    },
    setUrl(urlText) {
      if (urlText) {
        let url = "https://fuss10.elemecdn.com/";
        url =
          url +
          urlText.slice(0, 1) +
          "/" +
          urlText.slice(1, 3) +
          "/" +
          urlText.slice(3);
        if (urlText.slice(-3) == "png") {
          url += ".png";
        } else {
          url += ".jpeg";
        }
        return url;
      } else {
        return "http://elm.cangdu.org/img/default.jpg";
      }
    },
    clearScreen() {
      this.delivery_mode = [];
      this.support_ids = [];
      this.getList(this.setquery);
    },
    optScreen(v) {
      if (this.support_ids.indexOf(v) > -1) {
        this.support_ids.splice(this.support_ids.indexOf(v), 1);
      } else {
        this.support_ids.push(v);
      }
    },
    optScreen2(v) {
      if (this.delivery_mode.indexOf(v) > -1) {
        this.delivery_mode.splice(this.delivery_mode.indexOf(v), 1);
      } else {
        this.delivery_mode.push(v);
      }
    },
    setSort(id) {
      this.order_by = id[2];
      this.sort = id[0];
      if (id[0] == "智能排序(默认)") {
        this.sort = "排序";
      }
      this.getList(this.setquery);
      this.isopenkind = false;
      this.isopensort = false;
      this.isopenscreen = false;
    },
    setKind(id, name) {
      this.kind = name;
      this.restaurant_category_ids.splice(0, 1, id);
      this.getList(this.setquery);
      this.isopenkind = false;
      this.isopensort = false;
      this.isopenscreen = false;
    },
    setScreen() {
      this.getList(this.setquery);
      this.isopenkind = false;
      this.isopensort = false;
      this.isopenscreen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.food_nav.nav_warp {
  height:100%;
  background-color:rgba(0,0,0,0.3);
}
.food_nav {
  position: fixed;
  top: 0.45rem;
  z-index: 10;
  width: 100%;
  height:0.4rem;
  background-color: #fff;
  line-height: 0.235rem;
  overflow: hidden;
  .nav_title_warp{
    border-bottom: 1px solid #f1f1f1;
    background-color: #fff;
    height:0.38rem;
    border-top: 1px solid #f1f1f1;
  }
  .nav_title {
    // border-bottom: 1px solid #e4e4e4;
    text-align: center;
    // box-sizing: border-box;
    width: 33%;
    color: #666;
    float: left;
    font-size: 0.16rem;
    margin: 0.07rem 0rem;
    border-right: 1px solid #e4e4e4;
    position: relative;
    .iconfont {
      display: inline-block;
      transition: 0.5s;
      font-size: 0.2rem;
    }
    .icon_rev {
      // color: red;
      transform: rotate(180deg);
    }
    &:nth-child(3) {
      border-right: none;
    }
  }
  .color_rev {
    color: #3190e8;
  }
  .nav_kind {
    height: 3.77rem;
    width:100%;
    clear: both;
    border-top: 1px solid #e4e4e4;
    position: fixed;
    top: 0.85rem;
    left: 0;
    z-index: -1;
    .nav_kind_left {
      float: left;
      width: 50%;
      background-color: #f5f5f5;
      ul {
        li {
          padding: 0 0.1rem;
          clear: both;
          height: 0.42rem;
          line-height: 0.42rem;
          font-size: 0.12rem;
          color: #666;
          img {
            height: 0.18rem;
            vertical-align: middle;
            margin-top: 0.12rem;
            margin-right: 0.08rem;
          }
          span {
            vertical-align: top;
            b {
              display: inline-block;
              border-radius: 0.09rem;
              height: 0.12rem;
              font-size: 0.12rem;
              line-height: 0.12rem;
              padding: 0.03rem;
              background-color: #ccc;
              color: #fff;
              margin-right: 0.05rem;
            }
            .iconfont {
              font-size: 0.22rem;
              line-height: 0.22rem;
              vertical-align: middle;
            }
          }
        }
        .list_bag {
          background-color: #fff;
        }
      }
    }
    .nav_kind_right {
      float: right;
      width: 50%;
      overflow-x: hidden;
      height: 3.78rem;
      overflow-y: scroll;
      background-color:#fff;
      ul {
        padding: 0 0.1rem;
        li {
          clear: both;
          height: 0.41rem;
          line-height: 0.42rem;
          font-size: 0.16rem;
          color: #666;
          border-bottom: 1px solid #e4e4e4;
        }
      }
    }
  }
  .float_left {
    float: left;
  }
  .float_right {
    float: right;
  }
  .nav_sort_right {
    background-color: #fff;
    position: fixed;
    top: 0.85rem;
    left: 0;
    z-index: -1;
    width:100%;
    ul {
      padding: 0 0.1rem;
      li {
        clear: both;
        height: 0.59rem;
        line-height: 0.59rem;
        font-size: 0.2rem;
        color: #666;
        border-bottom: 1px solid #e4e4e4;

        .icon-icon091 {
          color: #3c87c8;
        }

        .icon-dizhi {
          color: #3aa3d6;
        }

        .icon-huomiao {
          color: #f28a8a;
        }
        .icon-qian1 {
          color: #eac13d;
        }

        .icon-biao {
          color: #4fcec0;
        }
        .icon-pingfen {
          color: #efb967;
        }
      }
    }
  }
  .nav_scren {
    border-bottom: 1px solid #666;
    width:100%;
    font-size: 0.12rem;
    line-height: 0.35rem;
    position: fixed;
    top: 0.85rem;
    left: 0;
    z-index: -1;
    background-color: #fff;
    .biao {
      padding-left: 0.1rem;
      font-size: 0.12rem;
      color: #333;
      .iconfont,
      .icon-fengniao {
        font-size: 0.12rem;
        margin: 0.03rem;
        height: 0.32rem;
        line-height: 0.32rem;
        padding: 0 0.3rem 0 0.15rem;
        display: inline-block;
        border: 1px solid #eee;
        border-radius: 0.05rem;
      }
      .icon-dui {
        color: #3190e8;
      }
      .icon-fengniao:before {
        font-size: 0.16rem;
        color: #3c87c8;
        padding-right: 0.05rem;
      }
    }
    .tq {
      padding-left: 0.1rem;
      padding-bottom: 0.1rem;
      span {
        display: inline-block;
        text-align: left;
      }
      .icon-dui {
        color: #3190e8;
      }
      .icon-dui + span {
        color: #3190e8;
      }
      .sty_a:first-letter {
        color: #3c87c8;
        border: 0.01rem solid #3c87c8;
        padding: 0.03rem;
        margin-right: 0.05rem;
        border-radius: 0.05rem;
      }
      .sty_b:first-letter {
        color: rgb(153, 153, 153);
        border: 0.01rem solid rgb(153, 153, 153);
        padding: 0.03rem;
        margin-right: 0.05rem;
        border-radius: 0.05rem;
      }
      .sty_c:first-letter {
        color: rgb(255, 78, 0);
        border: 0.01rem solid rgb(255, 78, 0);
        padding: 0.03rem;
        margin-right: 0.05rem;
        border-radius: 0.05rem;
      }
    }
    .bot {
      height: 0.42rem;
      padding: 0.07rem 0;
      font-size: 0.22rem;
      font-weight: 300;
      font-family: Microsoft Yahei;
      line-height: 0.42rem;
      background-color: #eee;
      text-align: center;
      span {
        display: inline-block;
        width: 1.77rem;
        border: 1px solid #eee;
        border-radius: 0.08rem;
        background-color: #fff;
      }
      span:nth-child(1) {
        color: #333;
      }
      span:nth-child(2) {
        color: #fff;
        background-color: #56d176;
      }
    }
    .sty_border {
      width: 1.1rem;
      // height: 0.32rem;
      box-sizing: border-box;
      font-size: 0.12rem;
      line-height: 0.3rem;
      padding: 0 0.1rem 0;
      display: inline-block;
      border: 1px solid #eee;
      border-radius: 0.05rem;
      margin-bottom: 0.05rem;
      margin-left: 0.05rem;
    }
  }
  //动画
  .slide-fade-enter-active {
    transition: all 0.3s;
  }
  .slide-fade-leave-active {
    transition: all 0.3s;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateY(-100%);
  }
  .cs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -100;
  }
}
</style>
