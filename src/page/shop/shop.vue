<template>
  <div class="shop" ref="shop">
    <router-view></router-view>
    <el-container class="headered">
      <!-- 头部 -->
      <el-header height="1.50rem" >
        <div class="shopinfo" ref="shopHeader">
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
            <!-- 优惠活动开始 -->
            <div
              v-if="(shopInfo.activities&&shopInfo.activities.length)"
              class="activity"
              @click="isActivityDetail = true"
            >
              <div>
                <span
                  :style="{backgroundColor:'#' + shopInfo.activities[0].icon_color}"
                >{{shopInfo.activities[0].icon_name}}</span>
                <span>{{shopInfo.activities[0].description}}(APP专享)</span>
              </div>
              <div>
                <span>{{shopInfo.activities.length}}个活动</span>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <!-- 优惠活动结束 -->
            <!-- 优惠活动详情开始 -->
            <div class="activityDetail" v-if="isActivityDetail">
              <section class="activityName">
                <h2>{{shopInfo.name}}</h2>
              </section>
              <section class="activityMessage">
                <span class="discounts">优惠信息</span>
              </section>
              <ul>
                <li v-for="(value,index) in shopInfo.activities" :key="index">
                  <span :style="{backgroundColor:'#' + value.icon_color}">{{value.icon_name}}</span>
                  <span>{{value.description}} (APP专享)</span>
                </li>
              </ul>

              <section class="notice">
                <span>商家公告</span>
                <div>欢迎光临,用餐高峰请提前下单,谢谢</div>
              </section>
              <section class="delect">
                <i @click="isActivityDetail = false" class="el-icon-circle-close-outline"></i>
              </section>
            </div>

            <!-- 优惠活动详情结束 -->
          </div>
          <a href="javascript:history.back(-1)" class="iconfont icon-zuo"></a>
          <router-link :to="{name:'shopDetaila',params:{id:restaurant_id}}" class="iconfont icon-you"></router-link>
        </div>
        <!-- 导航 -->
        <nav class="shop_nav" style="height:0.5rem" ref="shopNav">
          <p @click="tabPosition=true" :class="{'nav_active':tabPosition}">
            <span>商品</span>
          </p>
          <p @click="tabPosition=false" :class="{'nav_active':!tabPosition}">
            <span>评价</span>
          </p>
        </nav>
      </el-header>
      <!-- 内容 -->
      <el-main ref="main">
        <Appranse v-show="!tabPosition"></Appranse>
        <el-container class="shop_shop" v-show="tabPosition">
          <!-- 左侧滚动栏 -->
          <el-aside width="0.9rem">
            <ul
              class="left_warp"
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
          <!-- 右侧详情页 -->
          <el-main>
            <ul class="right_warp" ref="right_ul_list">
              <!-- 列表 -->
              <li 
                v-for="(v,i) in shopList" :key="i" 
                class="right_list" :ref="'right_li_list'+i"
                @touchmove="liTouchmove(i)"
              >
                <h4 class="main_title">
                  <b>{{v.name}}</b>
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

                <section class="right_lista" v-for="(va,index) in v.foods" :key="index" @click.stop="goFoodInfo(va)">
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
                  <div class="food_price">
                    <b>￥</b>{{va.specfoods[0].price}} <b v-if="va.specfoods.length>1">起</b>
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
                      v-if="va.specfoods.length==1&&cartInfo[v.id]&&cartInfo[v.id][va.specfoods[0].food_id]"
                      @click.stop="LessMove($event,v,va.specfoods[0])"
                    >
                      {{cartInfo[v.id]&&cartInfo[v.id][va.specfoods[0].food_id]}}
                    </span>
                    <el-button 
                      class="iconfont icon-jian" v-else-if="isSelectednum(v.id,va.specfoods)" 
                      v-html="isSelectednum(v.id,va.specfoods)"
                      :plain="true" @click.stop="$message({message:'多规格商品只能在购物车删除',iconClass:'a'})"
                      customClass="prompt"
                    >
                    </el-button>
                    <span
                      class="iconfont icon-icons_add"
                      @click.stop="addMove($event,v,va.specfoods[0])"
                      v-if="va.specfoods.length==1"
                    ></span>
                    <span class="specification" v-else @click.stop="selectedAdd(v.id,va.specfoods)">选规格</span>
                  </div>
                </section>
              </li>
              <!-- 底部 -->
              <div class="shoppingCart">
                <span class="iconfont icon-gouwuche1" @click="isOpenCart=!isOpenCart" :class=" !total &&'bagColor'">
                  <b class="numball" v-if="total">{{total}}</b>
                </span>
                <div class="amount" @click="isOpenCart=!isOpenCart">
                  ￥{{(totalmoney).toFixed(2)}}
                  <br>
                  <span>{{'配送费'}}</span>
                </div>
                <transition name="slide-fade">
                  <div class="bottom_cart_list" v-show="isOpenCart&&total">
                    <header class="cart_title">
                      <span>购物车</span>
                      <span class="iconfont icon-iconfontshanchu2" @click="clearCarts()">&nbsp;清空</span>
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
                <span class="settlement" :class=" !total &&'bagColorh'" @touchstart="goSettlement()">去结算</span>
              </div>
              <!-- 底部 -->
              <!-- 小球 -->
              <span class="ball" ref="ball"></span>
              <!-- 遮罩 -->
              <div class="warp" v-show="isOpenCart&&total" @click="isOpenCart=!isOpenCart"></div>
              <!-- 选择规格 -->
              <div class="selected" v-if="isSelected" @click.self="isSelected=!isSelected">
                <div class="selected_warp">
                  <h4>{{selected.specfoods[selected.index].name}}</h4>
                  <p>规格</p>
                  <span
                    v-for="(v,i) in selected.specfoods"
                    :key="i"
                    @click="selected.index=i"
                    :class="{'isSelected':selected.index==i}"
                  >{{v.specs_name}}</span>
                  <footer>
                    <b>
                      ￥
                      <i>{{selected.specfoods[selected.index].price}}</i>
                    </b>
                    <button @click="selectedAddCarts(selected,selected.specfoods[selected.index])">加入购物车</button>
                  </footer>
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
import Appranse from "./appranse/appranse";
export default {
  data() {
    return {
      tabPosition: true,//切换导航..
      //头部商家信息:(假数据)
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
      imgurl: "http://elm.cangdu.org/img/",//图片拼接地址..
      //食品列表
      shopList: {},
      //选择类.下标
      isopt: 0,
      restaurant_id: this.$route.query.id || 1,//商铺id
      geohash: this.$route.query.geohash || "23.12497,113.26308,",//经纬度
      cartInfo: {}, //选中食物记录
      ListInfo: {}, //类中选中食物总个数
      entities: {}, //请求参数entities 详情
      isOpenCart: false, //购物车开关
      selected: {
        id: 1,
        index: 0,
        specfoods: []
      }, //选择规格储存..
      isSelected: false, //选择规格开关...
      carts:{},//加入购物车请求返回数据...
      isActivityDetail: false, // 活动描述详情
    };
  },
  created() {
    this.getShopInfo();//获取商铺信息
    this.getShopList();//获取食品列表
    this.getcarts();// 加入购物车
    if(this.$store.state.historyCarts[this.$route.query.id]){
      console.log(this.$store.state.historyCarts,this.shopInfo.id,"ccc");
      // this.$set(this,'cartInfo',this.$store.state.historyCarts[this.shopInfo.id].cartInfo);
      // this.$set(this,'ListInfo',this.$store.state.historyCarts[this.shopInfo.id].ListInfo);
      // this.$set(this,'entities',this.$store.state.historyCarts[this.shopInfo.id].entities);
      this.cartInfo= this.$store.state.historyCarts[this.$route.query.id].cartInfo; //选中食物记录
      this.ListInfo= this.$store.state.historyCarts[this.$route.query.id].ListInfo; //类中选中食物总个数
      this.entities= this.$store.state.historyCarts[this.$route.query.id].entities; //请求参数entities 详情
    }
  },
  components: {
    Appranse
  },
  computed: {
    // 购物车数量
    total() {
      // `this` 指向 vm 实例
      let sum = obj => {
        let add = 0;
        for (let v in obj) {
          add += obj[v];
        }
        return add;
      };
      return sum(Object.values(this.ListInfo));
    },
    //总金额
    totalmoney() {
      let sum = obj => {
        let add = 0;
        for (let v in obj) {
          add += obj[v][0].price * obj[v][0].quantity;
        }
        return add;
      };
      return sum(this.entities);
    }
  },
  methods: {
    //带规格选择食物 个数 计算
    isSelectednum(id,arr){
      let sum = 0;
      for(let i = 0;i < arr.length ; i++){
        if(this.cartInfo[id]&&this.cartInfo[id][arr[i].food_id]){
          
          sum += this.cartInfo[id][arr[i].food_id]
        } 
      }
      return sum;
    },
    //获取商铺详情..
    getShopInfo() {
      let url =
        "https://elm.cangdu.org/shopping/restaurant/" + this.restaurant_id;
      this.$http({
        method: "get",
        url,
      }).then(res => {
        this.geohash = res.data.location.join(",");
        this.restaurant_id = res.data.id;
        this.$set(this, "shopInfo", res.data);
      });
    },
    // 获取食品列表
    getShopList() {
      let url = "https://elm.cangdu.org/shopping/v2/menu";
      this.$http({
        method: "get",
        url,
        params: {
          restaurant_id: this.restaurant_id
        }
      }).then(res => {
        this.$set(this, "shopList", res.data);
        this.$set(this.$store.state, "shopInfo", res.data);
      });
    },
    //类选择
    optList(eve, i) {
      this.isopt = i;
      let top = (i - 3) * 65 - this.$refs.leftUl.scrollTop;
      let a = 0;
      let scrollTop = this.$refs.leftUl.scrollTop;
      let Timer = setInterval(() => {
        this.$refs.leftUl.scrollTop = this.$refs.leftUl.scrollTop + top / 10;
        a++;
        if (a == 10) {
          clearInterval(Timer);
        }
      }, 50);
      let b = 1;
      let c = this.$refs.right_ul_list.scrollTop;
      let top2 =this.$refs['right_li_list' + i][0].offsetTop - this.$refs.right_ul_list.scrollTop -this.$refs.shopHeader.offsetHeight-this.$refs.shopNav.offsetHeight;
      let Timer2 = setInterval(() => {
        this.$refs.right_ul_list.scrollTop =  c + top2 / 30*b;
        b++;
        if (b > 30) {
          clearInterval(Timer2);
        }
      }, 20);
    },
    //右侧滑动
    touchmove($event) {
      let scrollTop = this.$refs.leftUl.scrollTop;
      this.isopt = Math.round(scrollTop / 65 + 3);
      let i = this.isopt;
      let b = 1;
      let c = this.$refs.right_ul_list.scrollTop;
      let top2 =this.$refs['right_li_list' + i][0].offsetTop - this.$refs.right_ul_list.scrollTop -this.$refs.shopHeader.offsetHeight-this.$refs.shopNav.offsetHeight;
      let Timer2 = setInterval(() => {
        this.$refs.right_ul_list.scrollTop =  c + top2 / 30*b;
        b++;
        if (b > 30) {
          clearInterval(Timer2);
        }
      }, 20);
    },
    //左侧滑动
    liTouchmove(i){
      this.isopt=i;
      this.$refs.leftUl.scrollTop=(i-3)*65;
      // console.log(this.$refs);
    },
    //data 储存 购物车 数据..
    storeInfo(v,va){
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
      this.$set(this.entities, va.food_id, entities);
    },
    //普通加
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
     this.storeInfo(v,va);
      //请求..
      // this.getcarts(Object.values(this.entities));
    },
    //普通减
    LessMove(eve, v, va) {
      this.ListInfo[v.id]--;
      this.cartInfo[v.id][va.food_id]--;
      // 单条数据
      let entities = this.setEntities(v, va, this.cartInfo[v.id][va.food_id]);
      this.$set(this.entities, va.food_id, entities);
      //请求..
      // this.getcarts(Object.values(this.entities));
    },
    //清空购物车..
    clearCarts() {
      this.entities = {};
      this.ListInfo = {};
      this.cartInfo = {};
      // this.getcarts(Object.values(this.entities));
    },
    //购物车内 加
    addCarts(v, i) {
      this.ListInfo[v.id]++;
      this.cartInfo[v.id][v.sku_id]++;
      this.entities[i][0].quantity++;
      //请求
      // this.getcarts(Object.values(this.entities));
    },
    //购物车减..
    lessCarts(v, i) {
      this.ListInfo[v.id]--;
      this.cartInfo[v.id][v.sku_id]--;
      this.entities[i][0].quantity--;
      //请求..
      // this.getcarts(Object.values(this.entities));
    },
    //加入购物车请求..
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
        this.$set(this,'carts',res.data);//本地储存..
        this.$store.state.carts = res.data;//vuex 储存...
      });
    },
    //设置 请求参数...
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
    //选择规格事件..
    selectedAdd(v, va) {
      this.$set(this.selected, "specfoods", va);
      this.isSelected = true;
      this.selected.id = v;
      this.selected.index = 0;
    },
    //选择规格中加入购物车..
    selectedAddCarts(v, va) {
      //储存..
      this.storeInfo(v, va);
      //请求..
      // this.getcarts(Object.values(this.entities));
      //隐藏
      this.isSelected = false;
    },
    //去结算...
    goSettlement(){
      if(this.total){
        // 请求
        this.getcarts(Object.values(this.entities));
        //跳转..
        this.$router.push({ name: 'confirmOrder', query: { geohash: this.geohash,shopId:this.restaurant_id }});
        this.$store.state.historyCarts[this.shopInfo.id]={};
        this.$store.state.historyCarts[this.shopInfo.id].cartInfo = this.cartInfo; //选中食物记录
        this.$store.state.historyCarts[this.shopInfo.id].ListInfo = this.ListInfo; //类中选中食物总个数
        this.$store.state.historyCarts[this.shopInfo.id].entities = this.entities; //请求参数entities 详情
        this.$store.state.cartInfo = this.cartInfo; //选中食物记录
        this.$store.state.ListInfo = this.ListInfo; //类中选中食物总个数
        this.$store.state.entities = this.entities; //请求参数entities 详情
      }
    },
    goFoodInfo(va){
      this.$router.push({
          name:'shopDetail',
          query:{
          image_path: va.image_path,
          description: va.description,
          month_sales:va.month_sales,
          name: va.name,
          rating:va.rating,
          rating_count:va.rating_count,
          satisfy_rate:va.satisfy_rate,
          shopId: va.restaurant_id
        }
      });
    }
  },
  beforeDestroy(){
    this.$store.state.historyCarts[this.shopInfo.id]={};
    this.$store.state.historyCarts[this.shopInfo.id].cartInfo = this.cartInfo; //选中食物记录
    this.$store.state.historyCarts[this.shopInfo.id].ListInfo = this.ListInfo; //类中选中食物总个数
    this.$store.state.historyCarts[this.shopInfo.id].entities = this.entities; //请求参数entities 详情
  }
};
</script>


<style lang="scss">

// 本页
.shop {
  // 布局
  .el-container {
    //头
    .el-header {
      color: #333;
      text-align: center;
      padding: 0rem;
      .shopinfo {
        overflow: hidden;
        height: 1.05rem;
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
          // 优惠活动开始
          .activity {
            display: flex;
            justify-content: space-between;
            margin-top: 0.08rem;
            padding-right: 0.234rem;
            margin-left: 0.12rem;
            span {
              color: #fff;
              margin-right: 0.06rem;
            }
            .el-icon-arrow-right {
              color: #fff;
              font-size: 0.16rem;
              font-weight: 300;
            }
          }

          // 优惠活动详情
          .activityDetail {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #262626;
            // background-color: greenyellow;
            z-index: 2000;
            padding: 0.29rem;
            .activityName {
              text-align: center;
              height: 1rem;
              h2 {
                font-size: 0.2rem;
                color: #fff;
                margin-top: 0.16rem;
              }
            }
            .activityMessage {
              text-align: center;
              margin-bottom: 0.23rem;
              .discounts {
                font-size: 0.14rem;
                color: #fff;
                border: 0.01rem solid #fff;
                padding: 0.05rem 0.09rem;
                border-radius: 0.1rem;
              }
            }
            ul {
              margin-top: 0.3rem;
              li {
                color: #fff;
                text-align: left;
                margin-bottom: 0.05rem;
                line-height: 0.16rem;
              }
            }
            .notice {
              text-align: center;
              margin-top: .5rem;
              margin-bottom: 0.234rem;
              span {
                font-size: 0.14rem;
                color: #fff;
                border: 0.01rem solid #fff;
                
                padding: 0.05rem 0.09rem;
                border-radius: 0.1rem;
              }
              div {
                margin-top: 0.3rem;
                line-height: 0.16rem;
                font-size: 0.14rem;
                color: #fff;
                text-align: left;
              }
            }
            .delect {
              margin-bottom: 0.2rem;
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              .el-icon-circle-close-outline {
                color: #fff;
                font-size: 0.5rem;
                font-weight: 100;
              }
            }
          }
          // 优惠活动相关结束
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
        background-color: #fff;
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
        padding-bottom: 0.46rem;
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
          overflow: hidden;
          transition: all 0.5s;
          .right_warp {
            transition: 1.5s;
            height: 100%;
            width: 105%;
            overflow-x: hidden;
            overflow-y: scroll;
            .right_list {
              h4.main_title {
                padding:0.05rem 0.1rem;
                line-height: 0.3rem;
                background-color: #f5f5f5;
                text-align: left;
                font-size: 0.16rem;
                b{
                  display: inline-block;
                  max-width: 30%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span {
                  font-size: 0.12rem;
                  padding-left: 0.1rem;
                  vertical-align: text-bottom;
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
                background-color: #fff;
                padding: 0.14rem 0.1rem;
                img {
                  width: 0.46rem;
                  float: left;
                  padding-right: 0.1rem;
                }
                .food_activity {
                  padding-left: 0.5rem;
                  span {
                    font-size: 0.1rem;
                    border-radius: 0.05rem;
                  }
                }
                .food_price{
                  padding-left: 0.5rem;
                  color: #f60;
                  font-size: 0.16rem;
                  b {
                    font-size: 0.12rem;
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
                  bottom: 0.1rem;
                  line-height: 0.24rem;
                  .icon-jian {
                    line-height: 0.32rem;
                    color: #3190e8;
                    vertical-align: middle;
                  }
                  .el-button{
                    padding: 0;
                    font-size: 0.14rem;
                    border: none;
                  }
                  .icon-jian::before{
                    font-size: 0.2rem;
                    vertical-align: middle;
                  }
                  .icon-icons_add {
                    line-height: 0.29rem;
                    font-size: 0.18rem;
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
              }
            }
          }
        }
      }
    }
  }
  .shoppingCart {
    width: 100%;
    position: fixed;
    height: 0.46rem;
    background-color: #3d3d3f;
    color: #fff;
    left: 0rem;
    bottom: 0rem;
    line-height: 0.46rem;
    z-index: 100;
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
      border: 0.04rem solid #444;
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
      height: 0.5rem;
      text-align: left;
      line-height: 0.22rem;
      background-color: #333;
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
      ul{
        max-height: 3rem;
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .cart_title {
        text-align: left;
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
      height: 0.5rem;
      text-align: center;
      font-size: 0.18rem;
    }
    .shopCartList {
      position: absolute;
      bottom: 2rem;
      left: 0;
    }
    .bagColor {
      background-color: #3d3d3f;
    }
    .bagColorh {
      background-color: #535356;//#amount
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
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.3);
    .selected_warp {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 2.6rem;
      height: 2rem;
      background: #fff;
      border-radius: 0.1rem;
      overflow: hidden;
      h4 {
        font-size: 0.16rem;
        color: #222;
        font-weight: 400;
        text-align: center;
        padding: 0.12rem;
      }
      p {
        color: #333;
        padding: 0.12rem;
        text-align: left;
        font-weight: 400;
        font-family: Microsoft Yahei;
      }
      span {
        display: inline-block;
        padding: 0.05rem 0.1rem;
        font-size: 0.12rem;
        border: 0.01rem solid #ddd;
        border-radius: 0.05rem;
        margin: 0 0.08rem;
      }
      .isSelected {
        border-color: #3199e8;
        color: #3199e8;
      }
      footer {
        display: flex;
        justify-content: space-between;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.12rem;
        color: #222;
        background-color: #f9f9f9;
        color: #ff6000;
        b {
          margin-left: 0.2rem;
          font-size: 0.12rem;
          color: #ff6000;
          i {
            font-size: 0.2rem;
          }
        }
        button {
          margin-right: 0.16rem;
          margin-top: 0.1rem;
          width: 1rem;
          height: 0.3rem;
          background-color: #3199e8;
          border: none;
          border-radius: 0.03rem;
          font-size: 0.12rem;
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
.el-popover~div.el-message,#app~div.el-message,div.el-message {
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 3.2rem;
  min-width: 1.2rem;
  background-color: #000;
  color: #fff;
}
.el-popover__title {
  float: left;
  color: #fff;
  padding-right:0.05rem;
}
.el-popover{
  padding:0.1rem 0.1rem 0;
  background-color: #39373a;
  opacity: .9;
  color: #fff;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
  // background-color: #39373a;
  border-bottom-color:#39373a;
}
html,.shop,
body,.el-container,
#app {
  width: 100%;
  height: 100%;
}
</style>