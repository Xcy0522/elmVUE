<template>
  <div class="shop" ref="shop">
  <el-container class="headered">

   
    <!-- 头部 -->
    <el-header height="1.50rem">
      <div class="shopinfo">
        <img :src="imgurl + shopInfo.image_path" class="bagImg">
        <div class="shopinfo_warp">
          <img :src="imgurl + shopInfo.image_path">
          <section>
            <p>{{shopInfo.name}}</p>
            <p>
              {{shopInfo.delivery_mode&&shopInfo.delivery_mode.text||"商家配送"}}&nbsp;&nbsp;
              /&nbsp;&nbsp;分钟送达&nbsp;&nbsp;/&nbsp;&nbsp;{{shopInfo.piecewise_agent_fee&&shopInfo.piecewise_agent_fee.tips}}</p>
            <p>公告:{{shopInfo.promotion_info}}</p>
          </section>
        </div>
        <a href="javascript:history.back(-1)" class="iconfont icon-zuo"></a>
        <a href="#/shop/shopDetail" class="iconfont icon-you"></a>
      </div>
      <nav class="shop_nav" style="height:0.5rem">
        <p @click="tabPosition='left'" :class="{'nav_active':tabPosition=='left'}"><span>商品</span></p>
        <p @click="tabPosition='right'" :class="{'nav_active':tabPosition=='right'}"><span>评价</span></p>
      </nav>
    </el-header>


    <!-- 内容 -->
    <el-main ref="main" v-if="tabPosition=='left'">
      <el-container class="shop_shop">
        <!-- 内容左边 -->
        <el-aside width="0.9rem">
          <ul class="left_warp" @scroll="oscroll($event)" ref="leftUl" @touchmove="touchmove($event)">
            <li 
            v-for="(v,i) in shopList" 
            @touchstart="optList($event,i)"
            :class="{isopt:isopt==i}"
            @scroll="oscroll($event)"
            :key="i">
              <span>
                {{v.name}}
              </span>
              <span class="numball" v-if="ListInfo[v.id]">{{ListInfo[v.id]}}</span>
            </li>
          </ul>
        </el-aside>
        <!-- 内容右边 -->
        <el-main>
          <ul class="right_warp">
            <li v-for="(v,i) in shopList" :id="'listId' + i" :key="i" class="right_list">
              <h4 class="main_title">
                {{v.name}}<span>{{v.description}}</span>
                <!-- <b class="right"> -->
                  <el-popover
                    placement="bottom"
                    trigger="click"
                    class="right"
                    :title="v.name"
                    :content="v.description">
                    <el-button slot="reference">...</el-button>
                  </el-popover>
                <!-- </b> -->
              </h4>
              
              <section class="right_lista" v-for="(va,index) in v.foods" :key="index">
                <img :src="'http://elm.cangdu.org/img/' + va.image_path" alt="">
                <div class="description_foodname">{{va.name}}</div>
                <div class="food_description_content">{{va.description}}</div>
                <div class="food_month_sales">月销{{va.month_sales}}份&nbsp;好评率{{va.satisfy_rate}}%</div>
                <!-- <div>{{va.activity&&va.activity}}</div> -->
                <div class="food_activity"><span
                :style="{color:'#'+(va.activity&&va.activity.image_text_color),
                border:'1px solid #' + (va.activity&&va.activity.icon_color)}">
                    {{va.activity&&va.activity.image_text}}
                  </span>
                </div>
                <div class="nowFood" v-if="va.attributes.length">
                  <span>新品</span>
                </div>
                <div 
                class="sign" 
                :style="{color:'#' + (va.attributes.length==2&&va.attributes[1].icon_color),
                borderColor:'#' + (va.attributes.length==2&&va.attributes[1].icon_color)}"
                v-if="va.attributes.length==2">
                  <span>{{va.attributes.length==2&&va.attributes[1].icon_name}}</span>
                </div>
                <div class="inShoppingCart">
                  <span class="iconfont icon-jian" v-if="cartInfo[v.id]&&cartInfo[v.id][va.specfoods[0].food_id]">
                    {{cartInfo[v.id]&&cartInfo[v.id][va.specfoods[0].food_id]}}
                  </span>
                  <span class="iconfont icon-icons_add" @click="addMove($event,v,va.specfoods[0])" v-if="va.specfoods.length==1"></span>
                  <span class="specification" v-else>选规格</span>
                </div>
                <section class="shoppingCart">
                  <span class="iconfont icon-gouwuche1"><span class="numball">123</span></span>
                  <span class="amount">￥{{(10000).toFixed(2)}}<br /><span>配送费￥5</span></span>
                  <span class="settlement">去结算</span>
                </section>
              </section>
            </li>
            <span class="ball" ref="ball"></span>
          </ul>
        </el-main>
      </el-container>
      
    </el-main>
    <Appranse v-if="tabPosition=='right'"></Appranse>
  </el-container>


    
  </div>
</template>
<script>
import Appranse from './appranse/appranse'
export default {
  data() {
    return {
      tabPosition: "left",
      shopInfo:{
        name:"name",
        id:3269,
        image_path:"169223a3ea727542.jpg",
        latitude:40.15477,
        longitude:116.82154,
        delivery_mode:{
          color:"57A9FF",
          id:1,
          is_solid:true,
          text:"蜂鸟专送"
        },
        foods:[],
        foodSort:{}
      },
      imgurl:"http://elm.cangdu.org/img/",
      shopList:{},
      isopt:0,
      restaurant_id:this.$route.query.id||1,
      geohash:this.$route.query.geohash|| '23.12497,113.26308,',
      cartInfo:{},
      ListInfo:{},
      cartList:[],
    };
  },
  components: {
     Appranse
  },
  created(){
    this.getShopInfo();
    this.getShopList();
    this.getcarts();
  },
  methods:{
    getShopInfo(){
      let url="https://elm.cangdu.org/shopping/restaurant/" + this.restaurant_id;
      this.$http({
        method:"get",
        url,
        query:{
          id:this.restaurant_id,
        }
      }).then((res)=>{
        console.log(res);
        this.geohash = res.data.location.join(',');
        this.restaurant_id = res.data.id;
        this.$set(this,'shopInfo',res.data);
      });
    },
    getShopList(){
      let url="https://elm.cangdu.org/shopping/v2/menu"
      this.$http({
        method:"get",
        url,
        params:{
          restaurant_id:this.restaurant_id
        }
      }).then((res)=>{
        console.log(res);
        this.$set(this,'shopList',res.data)
      });
    },
    optList(eve,i){
      this.isopt = i;
      // console.log(eve);  
      // this.isopt = Math.round(eve.target.scrollTop/65)
      console.log(this.$refs.leftUl.scrollTop);
      let top = (i-3) * 65-this.$refs.leftUl.scrollTop;
      let a = 0;
      let scrollTop = this.$refs.leftUl.scrollTop
      let Tiner = setInterval(() => {
        this.$refs.leftUl.scrollTop = this.$refs.leftUl.scrollTop + top/10;
        a++;
        console.log(a,this.$refs.leftUl.scrollTop)
        if(a==10){
          clearInterval(Tiner);
        }
      }, 50);
      
    },
    touchmove($event){
      let scrollTop = this.$refs.leftUl.scrollTop;
      this.isopt = Math.round(scrollTop/65 + 3);
    },
    oscroll(eve){
      console.log(eve);
    },
    addMove(eve,v,va){
      //小球动画...
      let ball = this.$refs.ball.cloneNode(true);
      ball.style.left=eve.clientX-20+'px';
      ball.style.bottom=this.$refs.shop.clientHeight-eve.clientY + 'px';
      ball.style.transition='left 0.5s cubic-bezier(1,1,1,1),bottom 0.5s cubic-bezier(.74,-0.35,.83,.67)';
      eve.target.appendChild(ball);
      ball.style.display='block';
      setTimeout(()=>{
        ball.style.left='50px';
        ball.style.bottom='50px';
      },10);
      ball.addEventListener('transitionend', ()=>{
        ball.remove();
      }, false);
      //请求..
      let entities = this.setEntities(v,va,12);
      console.log(entities);
      this.getcarts(entities)
      //储存..
      //left
      if(this.ListInfo[v.id]){
        this.ListInfo[v.id]++
      }else{
        this.$set(this.ListInfo,v.id,1);
      }
      console.log(this.ListInfo,"aaaaa");
      //right
      if(this.cartInfo[v.id]){
        if(this.cartInfo[v.id][va.food_id]){
          this.cartInfo[v.id][va.food_id]++;
        }else{
          this.$set(this.cartInfo[v.id],va.food_id,1);
        }
      }else{
        this.$set(this.cartInfo,v.id,{});
        this.$set(this.cartInfo[v.id],va.food_id,1);
      }
    },
    //加入购物车...
    getcarts(entities){
      let url = "https://elm.cangdu.org/v1/carts/checkout";
      this.$http({
        method:"post",
        url,
        data:{
          restaurant_id :this.restaurant_id,
          geohash:this.geohash ,
          entities:[entities]
        }
      }).then((res)=>{
        console.log(res);
      });
    },
    setEntities(a,v,num){
      return [
        {
          attrs:a.attrs,
          extra:{},
          id:v.food_id,//食品id
          name:v.name,//食品名称
          packing_fee:v.packing_fee,//打包费
          price:v.price,//价格
          quantity:num,//数量
          sku_id:v.sku_id,//规格id
          specs:v.specs,//规格
          stock:v.stock,//存量
        }
      ]
    },
    
  },

};
</script>

<style lang="scss">
html,body,#app{
  width: 100%;
  height: 100%;
}

.shop { 
  width: 100%;
  height: 100%;
  .el-container{
    width: 100%;
    height: 100%;
    .el-header{
      color: #333;
      text-align: center;
      padding:0rem;
      .shopinfo {
        overflow: hidden;
        height: 1.0rem;
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
        .shopinfo_warp{
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(119,103,137,.43);
          p{
            padding-top: 0.1rem;
            color: #fff;
            text-align: left;
            padding-left: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:first-child{
            padding-top: 0.1rem;
            font-size: 0.2rem;
            line-height: 0.2rem;
          }
        }
        img{
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
        .icon-you{
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
          width:100%;
          height: 100%;
        }
      }
      .shop_nav{
        width: 100%;
        p{
          display: inline-block;
          width: 48%;
          span{
            font-size: 0.16rem;
            line-height: 0.5rem;
            border: none;
            background: #fff;
            color: #666;
          }
        }
        .nav_active{
          span{
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
      padding:0;
      height: 100%;
      .el-tabs{
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .el_tabs_warp{
          // height: 200%;
        }
      }
      .shop_shop{
        border-top: .01rem solid #ededed;
        font-size: 0.14rem;
        line-height: 0.64rem;
        text-align: left;
        color: #3190e8;
        overflow: hidden;
        .el-aside {
          width: 0.7rem;
          overflow: hidden;
          .left_warp{
            height: 100%; 
            overflow-x: hidden;
            overflow-y: scroll;
            width: 120%;
            li{
              position: relative;
              border-bottom: .01rem solid #ededed;
              border-left: .04rem solid #f5f5f5;
              padding-left: 0.1rem;
              background-color: #f5f5f5;
              // border-left-color: #fff;
              span{
                color: #333;
              }
              .numball{
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
            .isopt{
              border-left-color: #3190e8;
              background-color: #fff;
            }
          }
        }
        .el-main{
          transition: all 0.5s;
          .right_warp{
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
                .el-button{
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
                img{
                  width: 0.46rem;
                  float: left;
                  padding-right: 0.1rem;
                }
                .food_activity{
                  padding-left: 0.5rem;
                  padding-bottom: 0.15rem;
                  span{
                    font-size: 0.1rem;
                    border-radius: 0.05rem;
                  }
                }
                .description_foodname{
                  font-size: 0.16rem;
                  font-weight: 700;
                }
                .food_description_content{
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
                  span{
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
                .sign{
                  position: absolute;
                  top: 0.1rem;
                  right: 0.30rem;
                  border: 0.01rem solid #000;
                  border-radius: 0.08rem;
                  padding:0 0.05rem;
                  transform: scale(0.7);
                }
                .inShoppingCart{
                  position: absolute;
                  right: 0.2rem;
                  bottom: 0.0rem;
                  line-height: 0.24rem;
                  .icon-jian{
                    line-height: 0.29rem;
                    color: #3190e8;
                    vertical-align:middle;
                  }
                  .icon-icons_add{
                    line-height: 0.29rem;
                    color: #3190e8;
                    vertical-align:middle;
                  }
                  .specification{
                    display: inline-block;
                    font-size: .12rem;
                    color: #fff;
                    padding: .0rem .06rem;
                    line-height: 0.22rem;
                    vertical-align:middle;
                    background-color: #3190e8;
                    border-radius: .05rem;
                    border: 1px solid #3190e8;
                  }
                }
                .shoppingCart{
                  width: 100%;
                  position: fixed;
                  height: 0.46rem;
                  background-color: #555;
                  color: #fff;
                  left: 0.0rem;
                  bottom: 0.0rem;
                  line-height: 0.46rem;
                  .icon-gouwuche1{
                    position: absolute;
                    left: 0.1rem;
                    bottom: 0.1rem;
                    height: 0.48rem;
                    width: 0.48rem;
                    text-align: center;
                    font-size: 0.35rem;
                    color: #fff;
                    border: 0.04rem solid #555;
                    border-radius: 0.3rem;
                    background-color: #3190e8;
                    .numball{
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
                  .amount{
                    position: absolute;
                    left: 0rem;
                    bottom: 0.02rem;
                    padding-left: 0.8rem;
                    font-size: 0.2rem;
                    line-height: 0.16rem;
                    span{
                      font-size: 0.12rem;
                    }
                  }
                  .settlement{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background-color: #4cd964;
                    width: 1.2rem;
                    text-align: center;
                    font-size: 0.18rem;
                  }
                }
              }
            }
            li{
              transition: 1.5s;
            }
          }
        }
      }
    }
  }
  .ball{
    position: fixed;
    z-index: 100;
    width: 0.2rem;
    height: 0.2rem;
    background-color: #3190e8;
    border-radius: 0.1rem;
    // left: 0.40rem;
    // bottom: 0.50rem;
    // transition:  bottom 0.5s cubic-bezier(0.05,0.68,0.32,1.5),left 0.5s cubic-bezier(1,1,1,1);
    // transition:  left 0.5s cubic-bezier(0.05,0.68,0.32,1.5);
    display: none;
  }
  .el-popover.el-popover--plain{
    padding: 0.1rem;
    color: #fff;
    background: #39373a;
  } 
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color: #39373a;
  } 
  .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #39373a;
  } 
  .el-popover__title{
    float: left;
    color: #fff;
    padding-right: 0.1rem;
    margin-bottom: 0;
  }
}


</style>
