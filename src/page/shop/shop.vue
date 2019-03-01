<template>
  <div class="shop" ref="shop">
    <el-container class="headered">
      <el-header height="1.50rem">
        <div class="shopinfo">
          <img :src="imgurl + shopInfo.image_path" class="bagImg">
          <div class="shopinfo_warp">
            <img :src="imgurl + shopInfo.image_path">
            <section>
              <p>{{shopInfo.name}}</p>
              <p>
                {{shopInfo.delivery_mode&&shopInfo.delivery_mode.text||"商家配送"}}&nbsp;&nbsp;
                /&nbsp;&nbsp;分钟送达&nbsp;&nbsp;/&nbsp;&nbsp;{{shopInfo.piecewise_agent_fee&&shopInfo.piecewise_agent_fee.tips}}
              </p>
              <p>公告:{{shopInfo.promotion_info}}</p>
            </section>
          </div>
          <a href="javascript:history.back(-1)" class="iconfont icon-zuo"></a>
          <a href="#/shop/shopDetail" class="iconfont icon-you"></a>
        </div>
        <nav class="shop_nav" style="height:0.5rem">
          <p @click="tabPosition='left'" :class="{'nav_active':tabPosition=='left'}">
            <span>商品</span>
          </p>
          <p @click="tabPosition='right'" :class="{'nav_active':tabPosition=='right'}">
            <span>评价</span>
          </p>
        </nav>
      </el-header>
      <el-main ref="main">
        <el-container class="shop_shop">
          <el-aside width="0.9rem">
            <ul
              class="left_warp"
              @scroll="oscroll($event)"
              ref="leftUl"
              @touchmove="touchmove($event)"
            >
              <li
                v-for="(v,i) in shopList"
                @touchstart="optList($event,i)"
                :class="{isopt:isopt==i}"
                @scroll="oscroll($event)"
                :key="i"
              >
                <span>{{v.name}}</span>
                <span class="numball" v-if="ListInfo[v.id]">{{ListInfo[v.id]}}</span>
              </li>
            </ul>
          </el-aside>
          <el-main>
            <ul class="right_warp">
              <li v-for="(v,i) in shopList" :id="'listId' + i" :key="i" class="right_list">
                <h4 class="main_title">
                  {{v.name}}
                  <span>{{v.description}}</span>
                  <!-- <b class="right"> -->
                  <el-popover
                    placement="bottom"
                    trigger="click"
                    class="right"
                    :title="v.name"
                    :content="v.description"
                  >
                    <el-button slot="reference">...</el-button>
                  </el-popover>
                  <!-- </b> -->
                </h4>

                <section class="right_lista" v-for="(va,index) in v.foods" :key="index">
                  <img :src="'http://elm.cangdu.org/img/' + va.image_path" alt>
                  <div class="description_foodname">{{va.name}}</div>
                  <div class="food_description_content">{{va.description}}</div>
                  <div class="food_month_sales">月销{{va.month_sales}}份&nbsp;好评率{{va.satisfy_rate}}%</div>
                  <!-- <div>{{va.activity&&va.activity}}</div> -->
                  <div class="food_activity">
                    <span
                      :style="{color:'#'+(va.activity&&va.activity.image_text_color),
                border:'1px solid #' + (va.activity&&va.activity.icon_color)}"
                    >{{va.activity&&va.activity.image_text}}</span>
                  </div>
                  <div class="nowFood" v-if="va.attributes.length">
                    <span>新品</span>
                  </div>
                  <div
                    class="sign"
                    :style="{color:'#' + (va.attributes.length==2&&va.attributes[1].icon_color),
                borderColor:'#' + (va.attributes.length==2&&va.attributes[1].icon_color)}"
                    v-if="va.attributes.length==2"
                  >
                    <span>{{va.attributes.length==2&&va.attributes[1].icon_name}}</span>
                  </div>
                  <div class="inShoppingCart">
                    <span
                      class="iconfont icon-jian"
                      v-if="cartInfo[v.id]&&cartInfo[v.id][va.specfoods[0].food_id]"
                      @click="LessMove($event,v,va.specfoods[0])"
                    >{{cartInfo[v.id]&&cartInfo[v.id][va.specfoods[0].food_id]}}</span>
                    <span
                      class="iconfont icon-icons_add"
                      @click="addMove($event,v,va.specfoods[0])"
                      v-if="va.specfoods.length==1"
                    ></span>
                    <span class="specification" v-else @click="selectedAdd(v.id,va.specfoods)">选规格</span>
                    
                  </div>
                  <section class="shoppingCart">
                    <span class="iconfont icon-gouwuche1" :class=" !total &&'bagColorh'">
                      <span class="numball" v-if="total">{{total}}</span>
                    </span>
                    <section class="amount" @click="isOpenCart=!isOpenCart">
                      ￥{{(totalmoney).toFixed(2)}}
                      <br>
                      <span>{{va.activity&&va.activity}}</span>
                    </section>
                    <transition name="slide-fade">
                      <div class="bottom_cart_list" v-show="isOpenCart&&total">
                        <header class="cart_title">
                          <span>购物车</span>
                          <span
                            class="iconfont icon-iconfontshanchu2"
                            @click="clearCarts()"
                          >&nbsp;清空</span>
                        </header>
                        <ul class="cart_list">
                          <li v-for="(v,i) in entities" :key="i" v-show="v[0].quantity">
                            <span>{{v[0].name}}</span>
                            <span class="price">￥{{v[0].price}}</span>
                            <div>
                              <i class="iconfont icon-jian" @click="lessCarts(v[0],i)"></i>
                              {{v[0].quantity}}&nbsp;
                              <i
                                class="iconfont icon-icons_add"
                                @click="addCarts(v[0],i)"
                              ></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </transition>
                    <span class="settlement" :class=" !total &&'bagColorh'">去结算</span>
                  </section>
                </section>
              </li>
              <span class="ball" ref="ball"></span>
              <div class="warp" v-show="isOpenCart&&total" @click="isOpenCart=!isOpenCart"></div>
              <div class="selected" v-if="isSelected" @click.self="isSelected=!isSelected">
                <div class="selected_warp">
                  <h4>{{shopInfo.piecewise_agent_fee&&shopInfo.piecewise_agent_fee.tips}}</h4>
                  <p>规格</p>
                  <span v-for="(v,i) in selected.specfoods" :key="i" @click="selected.index=i"
                  :class="{'isSelected':selected.index==i}">
                    {{v.specs_name}}
                  </span>
                  <footer><b>￥<i>{{selected.specfoods[selected.index].price}}</i></b> <button>加入购物车</button></footer>
                </div>
              </div>
            </ul>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left",
      shopInfo: {
        name: "name",
        id: 3269,
        image_path: "169223a3ea727542.jpg",
        latitude: 40.15477,
        longitude: 116.82154,
        delivery_mode: {
          color: "57A9FF",
          id: 1,
          is_solid: true,
          text: "蜂鸟专送"
        },
        foods: [],
        foodSort: {}
      },
      imgurl: "http://elm.cangdu.org/img/",
      shopList: {},
      isopt: 0,
      restaurant_id: this.$route.query.id || 1,
      geohash: this.$route.query.geohash || "23.12497,113.26308,",
      cartInfo: {}, //选中食物记录
      ListInfo: {}, //类中选中食物总个数
      entities: {}, //请求参数entities 详情
      isOpenCart: false, //购物车开关
      selected:{
        id:1,
        index:0,
        specfoods:[],
      },//选择规格储存..
      isSelected:false,//选择规格开关...
    };
  },
  created() {
    this.getShopInfo();
    this.getShopList();
    this.getcarts();
  },
  computed: {
    // 计算属性的 getter
    total() {
      console.log("123");
      // `this` 指向 vm 实例
      let sum = obj => {
        let add = 0;
        for (let v in obj) {
          add += obj[v];
        }
        console.log(obj);
        return add;
      };
      console.log("123", sum(Object.values(this.ListInfo)));
      return sum(Object.values(this.ListInfo));
    },
    totalmoney() {
      let sum = obj => {
        let add = 0;
        for (let v in obj) {
          add += obj[v][0].price * obj[v][0].quantity;
        }
        console.log(obj);
        return add;
      };
      console.log("123", sum(this.entities));
      return sum(this.entities);
    }
  },
  methods: {
    getShopInfo() {
      console.log(this.$route);
      let url =
        "https://elm.cangdu.org/shopping/restaurant/" + this.restaurant_id;
      this.$http({
        method: "get",
        url,
        query: {
          id: 1
        }
      }).then(res => {
        console.log(res);
        this.geohash = res.data.location.join(",");
        this.restaurant_id = res.data.id;
        this.$set(this, "shopInfo", res.data);
      });
    },
    getShopList() {
      let url = "https://elm.cangdu.org/shopping/v2/menu";
      this.$http({
        method: "get",
        url,
        params: {
          restaurant_id: this.restaurant_id
        }
      }).then(res => {
        console.log(res);
        this.$set(this, "shopList", res.data);
      });
    },
    optList(eve, i) {
      this.isopt = i;
      // console.log(eve);
      // this.isopt = Math.round(eve.target.scrollTop/65)
      console.log(this.$refs.leftUl.scrollTop);
      let top = (i - 3) * 65 - this.$refs.leftUl.scrollTop;
      let a = 0;
      let scrollTop = this.$refs.leftUl.scrollTop;
      let Tiner = setInterval(() => {
        this.$refs.leftUl.scrollTop = this.$refs.leftUl.scrollTop + top / 10;
        a++;
        console.log(a, this.$refs.leftUl.scrollTop);
        if (a == 10) {
          clearInterval(Tiner);
        }
      }, 50);
    },
    touchmove($event) {
      let scrollTop = this.$refs.leftUl.scrollTop;
      this.isopt = Math.round(scrollTop / 65 + 3);
    },
    oscroll(eve) {
      console.log(eve);
    },
    addMove(eve, v, va) {
      //小球动画...
      let ball = this.$refs.ball.cloneNode(true);
      ball.style.left = eve.clientX - 20 + "px";
      ball.style.bottom = this.$refs.shop.clientHeight - eve.clientY + "px";
      ball.style.transition =
        "left 0.5s cubic-bezier(1,1,1,1),bottom 0.5s cubic-bezier(.29,1.83,.69,-0.3)";
      eve.target.appendChild(ball);
      ball.style.display = "block";
      setTimeout(() => {
        ball.style.left = "50px";
        ball.style.bottom = "50px";
      }, 10);
      ball.addEventListener(
        "transitionend",
        () => {
          ball.remove();
        },
        false
      );

      //储存..
      //left
      if (this.ListInfo[v.id]) {
        this.ListInfo[v.id]++;
      } else {
        this.$set(this.ListInfo, v.id, 1);
      }

      //right
      if (this.cartInfo[v.id]) {
        if (this.cartInfo[v.id][va.food_id]) {
          this.cartInfo[v.id][va.food_id]++;
        } else {
          this.$set(this.cartInfo[v.id], va.food_id, 1);
        }
      } else {
        this.$set(this.cartInfo, v.id, {});
        this.$set(this.cartInfo[v.id], va.food_id, 1);
      }
      //购物车..

      // 单条数据
      let entities = this.setEntities(v, va, this.cartInfo[v.id][va.food_id]);
      console.log(entities);
      this.$set(this.entities, va.food_id, entities);
      console.log(this.entities, "=====");
      console.log(this.ListInfo, "aaaaa");
      console.log(this.cartInfo, "bbbbb");
      //请求..
      this.getcarts(Object.values(this.entities));
    },
    LessMove(eve, v, va) {
      this.ListInfo[v.id]--;
      this.cartInfo[v.id][va.food_id]--;
      // 单条数据
      let entities = this.setEntities(v, va, this.cartInfo[v.id][va.food_id]);
      console.log(entities);
      this.$set(this.entities, va.food_id, entities);
      console.log(this.entities, "=====");
      //请求..
      this.getcarts(Object.values(this.entities));
    },
    clearCarts() {
      this.entities = {};
      this.ListInfo = {};
      this.cartInfo = {};
      console.log(this.entities, "=====");
      console.log(this.ListInfo, "aaaaa");
      console.log(this.cartInfo, "bbbbb");
    },
    addCarts(v, i) {
      this.ListInfo[v.id]++;
      console.log(
        this.ListInfo[v.id],
        this.cartInfo[v.id][v.sku_id],
        this.entities[i]
      );
      this.cartInfo[v.id][v.sku_id]++;
      this.entities[i][0].quantity++;
    },
    lessCarts(v, i) {
      this.ListInfo[v.id]--;
      this.cartInfo[v.id][v.sku_id]--;
      this.entities[i][0].quantity--;
      console.log(this.ListInfo, this.cartInfo, this.entities);
    },
    getcarts(entities) {
      let url = "https://elm.cangdu.org/v1/carts/checkout";
      this.$http({
        method: "post",
        url,
        data: {
          restaurant_id: this.restaurant_id,
          geohash: this.geohash,
          entities
        }
      }).then(res => {
        console.log(res);
      });
    },
    setEntities(a, v, num) {
      return [
        {
          attrs: v.attrs,
          extra: {},
          id: a.id, //食品id
          name: v.name, //食品名称
          packing_fee: v.packing_fee, //打包费
          price: v.price, //价格
          quantity: num, //数量
          sku_id: v.sku_id, //规格id
          specs: v.specs, //规格
          stock: v.stock //存量
        }
      ];
    },
    selectedAdd(v,va){
      // this.selected.specfoods=va.specfoods;
      this.$set(this.selected,"specfoods",va);
      this.isSelected=true;
      this.id=v;
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.shop {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      color: #333;
      text-align: center;
      padding: 0rem;
      .shopinfo {
        overflow: hidden;
        height: 1rem;
        position: relative;
        font-size: 0.12rem;
        line-height: 0.14rem;
        .bagImg {
          filter: blur(10px);
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
        .shopinfo_warp {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(119, 103, 137, 0.43);
          p {
            padding-top: 0.1rem;
            color: #fff;
            text-align: left;
            padding-left: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:first-child {
            padding-top: 0.1rem;
            font-size: 0.2rem;
            line-height: 0.2rem;
          }
        }
        img {
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
          width: 0.68rem;
          border-radius: 0.06rem;
        }
        .icon-zuo {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          padding-left: 0.05rem;
          height: 0.35rem;
          font-size: 0.25rem;
          color: #fff;
          line-height: 0.35rem;
          text-align: left;
        }
        .icon-you {
          position: absolute;
          top: 0.3rem;
          right: 0;
          padding-right: 0.15rem;
          height: 0.35rem;
          font-size: 0.4rem;
          color: #fff;
          line-height: 0.35rem;
          text-align: right;
        }
        .shopinfo_warp {
          width: 100%;
          height: 100%;
        }
      }
      .shop_nav {
        width: 100%;
        p {
          display: inline-block;
          width: 48%;
          span {
            font-size: 0.16rem;
            line-height: 0.5rem;
            border: none;
            background: #fff;
            color: #666;
          }
        }
        .nav_active {
          span {
            display: inline-block;
            color: #3190e8;
            border: none;
            line-height: 0.3rem;
            // padding-bottom: -0.05rem;
            border-radius: 0;
            border-bottom: 3px solid #3190e8;
          }
        }
      }
    }
    .el-main {
      // background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 0.2rem;
      padding: 0;
      height: 100%;
      .el-tabs {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .el_tabs_warp {
          overflow-x: hidden;
          // height: 200%;
        }
      }
      .shop_shop {
        border-top: 0.01rem solid #ededed;
        font-size: 0.14rem;
        line-height: 0.64rem;
        text-align: left;
        color: #3190e8;
        overflow: hidden;
        .el-aside {
          width: 0.7rem;
          overflow: hidden;
          .left_warp {
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            width: 120%;
            li {
              position: relative;
              border-bottom: 0.01rem solid #ededed;
              border-left: 0.04rem solid #f5f5f5;
              padding-left: 0.1rem;
              background-color: #f5f5f5;
              // border-left-color: #fff;
              span {
                color: #333;
              }
              .numball {
                text-align: center;
                position: absolute;
                right: 0.2rem;
                top: 0.01rem;
                background: #f00;
                width: 0.2rem;
                height: 0.2rem;
                color: #fff;
                font-size: 0.16rem;
                border-radius: 0.1rem;
                line-height: 0.2rem;
                transform: scale(0.7);
              }
            }
            .isopt {
              border-left-color: #3190e8;
              background-color: #fff;
            }
          }
        }
        .el-main {
          transition: all 0.5s;
          .right_warp {
            transition: 1.5s;
            height: 100%;
            width: 105%;
            overflow-x: hidden;
            overflow-y: scroll;
            .right_list {
              h4.main_title {
                padding: 0.1rem;
                line-height: 0.3rem;
                background-color: #f5f5f5;
                text-align: left;
                font-size: 0.18rem;
                span {
                  font-size: 0.12rem;
                  padding-left: 0.1rem;
                }
                .right {
                  float: right;
                }
                .el-button {
                  background-color: #f5f5f5;
                  border: none;
                }
              }
              .right_lista {
                position: relative;
                text-align: left;
                border-bottom: 1px solid #f8f8f8;
                // height: 1.1rem;
                padding: 0.14rem 0.1rem;
                img {
                  width: 0.46rem;
                  float: left;
                  padding-right: 0.1rem;
                }
                .food_activity {
                  padding-left: 0.5rem;
                  padding-bottom: 0.15rem;
                  span {
                    font-size: 0.1rem;
                    border-radius: 0.05rem;
                  }
                }
                .description_foodname {
                  font-size: 0.16rem;
                  font-weight: 700;
                }
                .food_description_content {
                  color: #666;
                }
                .nowFood {
                  position: absolute;
                  top: 0rem;
                  left: 0rem;
                  height: 0.2rem;
                  padding-top: 0.4rem;
                  width: 0.6rem;
                  overflow: hidden;
                  span {
                    position: absolute;
                    top: -0.3rem;
                    left: -0.3rem;
                    background-color: #5ec452;
                    color: #fff;
                    height: 0.2rem;
                    font-size: 0.1rem;
                    padding-top: 0.4rem;
                    width: 0.6rem;
                    text-align: center;
                    transform: rotate(-45deg) scale(0.7);
                  }
                }
                .sign {
                  position: absolute;
                  top: 0.1rem;
                  right: 0.3rem;
                  border: 0.01rem solid #000;
                  border-radius: 0.08rem;
                  padding: 0 0.05rem;
                  transform: scale(0.7);
                }
                .inShoppingCart {
                  position: absolute;
                  right: 0.2rem;
                  bottom: 0rem;
                  line-height: 0.24rem;
                  .icon-jian {
                    line-height: 0.29rem;
                    color: #3190e8;
                    vertical-align: middle;
                  }
                  .icon-icons_add {
                    line-height: 0.29rem;
                    color: #3190e8;
                    vertical-align: middle;
                  }
                  .specification {
                    display: inline-block;
                    font-size: 0.12rem;
                    color: #fff;
                    padding: 0rem 0.06rem;
                    line-height: 0.22rem;
                    vertical-align: middle;
                    background-color: #3190e8;
                    border-radius: 0.05rem;
                    border: 1px solid #3190e8;
                  }
                }
                .shoppingCart {
                  width: 100%;
                  position: fixed;
                  height: 0.46rem;
                  background-color: #333;
                  color: #fff;
                  left: 0rem;
                  bottom: 0rem;
                  line-height: 0.46rem;
                  z-index: 8;
                  .icon-gouwuche1 {
                    position: absolute;
                    left: 0.1rem;
                    bottom: 0.1rem;
                    height: 0.48rem;
                    z-index: 10;
                    width: 0.48rem;
                    text-align: center;
                    font-size: 0.35rem;
                    color: #fff;
                    border: 0.04rem solid #555;
                    border-radius: 0.3rem;
                    background-color: #3190e8;
                    .numball {
                      position: absolute;
                      left: 0.3rem;
                      top: -0.1rem;
                      background: #f00;
                      width: 0.2rem;
                      text-align: center;
                      height: 0.2rem;
                      font-size: 0.14rem;
                      border-radius: 0.1rem;
                      line-height: 0.2rem;
                    }
                  }
                  .amount {
                    position: absolute;
                    left: 0rem;
                    right: 0rem;
                    bottom: 0rem;
                    padding-left: 0.8rem;
                    margin-right: 1.2rem;
                    font-size: 0.2rem;
                    height: 100%;
                    line-height: 0.22rem;
                    background-color: #555;
                    z-index: 0;
                    span {
                      font-size: 0.12rem;
                      padding-left: 0.05rem;
                    }
                  }
                  //动画
                  .slide-fade-enter-active {
                    transition: all 0.6s;
                  }
                  .slide-fade-leave-active {
                    transition: all 0.6s;
                  }
                  .slide-fade-enter,
                  .slide-fade-leave-to {
                    transform: translateY(100%);
                  }
                  .bottom_cart_list {
                    position: absolute;
                    font-size: 0.16rem;
                    color: #666;
                    font-weight: 700;
                    left: 0;
                    bottom: 0.46rem;
                    z-index: -10;
                    transition: 0.6s;
                    background-color: #fff;
                    width: 100%;
                    .cart_title {
                      font-weight: 400;
                      font-size: 0.14rem;
                      padding: 0 0.14rem;
                      background-color: #eceff1;
                      .icon-iconfontshanchu2 {
                        float: right;
                        font-size: 0.12rem;
                        padding-left: 0.05rem;
                      }
                    }
                    .cart_list {
                      line-height: 0.49rem;
                      padding: 0 0.14rem;
                      li {
                        height: 0.49rem;
                      }
                      div {
                        float: right;
                        width: 30%;
                        text-align: right;
                        height: 0.49rem;
                      }
                      span {
                        display: inline-block;
                        width: 33%;
                        overflow: hidden;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                      .price {
                        text-align: right;
                        color: #f60;
                      }
                      .icon-jian {
                        vertical-align: middle;
                      }
                      .icon-jian:before {
                        display: inline-block;
                        height: 0.16rem;
                        font-size: 0.19rem;
                        color: #3190e8;
                      }
                      .icon-icons_add {
                        color: #3190e8;
                        line-height: 0.49rem;
                      }
                    }
                  }
                  .settlement {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background-color: #4cd964;
                    width: 1.2rem;
                    text-align: center;
                    font-size: 0.18rem;
                  }
                  .shopCartList {
                    position: absolute;
                    bottom: 2rem;
                    left: 0;
                  }
                  .bagColor {
                    background-color: #333;
                  }
                  .bagColorh {
                    background-color: #535356;
                  }
                }
              }
            }
            li {
              transition: 1.5s;
            }
          }
        }
      }
    }
  }
  .ball {
    position: fixed;
    z-index: 100;
    width: 0.2rem;
    height: 0.2rem;
    background-color: #3190e8;
    border-radius: 0.1rem;
    display: none;
  }
  .warp {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .selected {
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    z-index: 20;
    background-color: rgba(255,0,0,0.3);
    .selected_warp {
      position: absolute;
      margin: auto;
      top: 0;
      left:0;
      bottom: 0;
      right: 0;
      width: 2.6rem;
      height: 2rem;
      background: #fff;
      border-radius: 0.1rem;
      overflow: hidden;
      h4{
        font-size: .16rem;
        color: #222;
        font-weight: 400;
        text-align: center;
        padding: .12rem;
      }
      p{
        
        color: #333;
        padding: .12rem;
        text-align: left;
        font-weight: 400;
        font-family: Microsoft Yahei;
      }
      span {
        display: inline-block;
        padding:0.05rem 0.1rem;
        font-size: .12rem;
        border: .01rem solid #ddd;
        border-radius: .05rem;
        margin:0 .08rem;
      }
      .isSelected {
        border-color:#3199e8;
        color:#3199e8;
      }
      footer {
        display: flex;
        justify-content:space-between;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: .12rem;
        color: #222;
        background-color: #f9f9f9;
        color: #ff6000;
        b{
          margin-left: 0.2rem;
          font-size: .12rem;
          color: #ff6000;
          i{
            font-size: .2rem;
          }
        }
        button {
          margin-right: 0.16rem;
          margin-top: 0.1rem;
          width: 1.0rem;
          height: 0.3rem;
          background-color: #3199e8;
          border-radius: .03rem;
          font-size: .12rem;
          color: #fff;
          text-align: center;
          line-height: 0.3rem;
        }
      }
    }
  }
  .el-popover.el-popover--plain {
    padding: 0.1rem;
    color: #fff;
    background: #39373a;
  }
  .el-popper[x-placement^="bottom"] .popper__arrow {
    border-bottom-color: #39373a;
  }
  .el-popper[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #39373a;
  }
  .el-popover__title {
    float: left;
    color: #fff;
    padding-right: 0.1rem;
    margin-bottom: 0;
  }
}
</style>
