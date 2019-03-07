<template>
  <div class="wrap_top">
    <headCom :head="head"></headCom>
    <div class="site">
      <a href="#/confirmOrder/chooseAddress">
        <div class="left">
          <span class="iconfont icon-dizhi" id="on"></span>
          <!-- <div>请添加一个收货地址</div> -->
          <div class="flex_on">
            <header>
              <span class="name_on">{{$store.state.content_on.name}}</span>
              <span class="age_on">{{$store.state.content_on.sex}}</span>
              <span class="phone_on">{{$store.state.content_on.phone}}</span>
            </header>
            <div class="botoom_on">
              <span :style="{background:setbagcolor($store.state.content_on)}">{{$store.state.content_on.tag}}</span>
              <p>{{$store.state.content_on.address}}</p>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-you"></span>
        </div>
      </a>
    </div>
    <section class="time_on">
      <p class="left">送达时间</p>
      <section class="right">
        <p class="right_top">
          {{con.deliver_time}}&nbsp;|&nbsp;预计
          <time>{{new Date().toLocaleTimeString()}}</time>
        </p>
        <p class="right_bottom">蜂鸟专送</p>
      </section>
    </section>
    <section class="payment">
      <div class="payment_top" @click="on=!on">
        <p class="top_left">支付方式</p>
        <p class="top_right">
          {{con.pay_method}}
          <span class="iconfont icon-you"></span>
        </p>
      </div>
      <div class="payment_bottom">
        <p class="bottom_left">红包</p>
        <p class="bottom_right">暂时只在饿了么APP中支持</p>
      </div>
    </section>
    <section class="show_on">
      <header>
        <img data-v-4e0d5034 src="//elm.cangdu.org/img/164ad0b6a3917599.jpg">
        <span>效果演示</span>
      </header>
      <ul class="form_on">
        <li v-for="(v,k,i) in cartsInfo" :key="i">
          <p class="form_left">{{v[0].name}}</p>
          <div class="form_right">
            <span class="text_on">{{v[0].quantity}}</span>
            <span>￥ {{v[0].price*v[0].quantity}}</span>
          </div>
        </li>
      </ul>
      <section class="box">
        <p>餐盒{{packingFee()}}</p>
        <span>¥ 18257</span>
      </section>
      <section class="charge">
        <p>配送费</p>
        <span>¥ <i></i></span>
      </section>
      <section class="money">
        <p>订单 ¥18281</p>
        <span>待支付
          <br>¥18281
        </span>
      </section>
    </section>
    <section class="bottom_on">
      <router-link to="/confirmOrder/remark">
        <span>
          订单备注&nbsp;&nbsp;&nbsp;
          <span></span>
        </span>
        <div>
          口味、偏好等
          <span class="iconfont icon-you"></span>
        </div>
      </router-link>
      <router-link to="/confirmOrder/invoice">
        <span class="span_on">发票抬头</span>
        <div>
          不需要开发票
          <span class="iconfont icon-you"></span>
        </div>
      </router-link>
    </section>
    <section class="bottom_bot">
      <p class="bottom_left">待支付 ¥18281</p>
      <p class="bottom_right" @click="confirmOrder">确认下单</p>
    </section>

    <!-- 蒙版 -->
    <section v-if="on" class="z-index">
      <div class="z-top" @click="on=!on"></div>
      <div class="z-bottom">
        <p class="bottom_p">支付方式</p>
        <p class="on on_top">
          货到付款(商家不支持货到付款)
          <span class="iconfont">&#xe633;</span>
        </p>
        <p class="on on_bottom">
          在线支付
          <span @click="on=!on" class="iconfont icon-dui1"></span>
        </p>
      </div>
      <img src="../../images/caixian.png" alt="">
    </section>
  </div>
</template>

<script>
// import caixian from '../'
export default {
  data() {
    return {
      on: false,
      con: [],
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "确认订单",
        right: "<a href='#/login'>登录/注册</a>"
      },
      username: localStorage.getItem("username"),
      cartsInfo:this.$store.state.entities
    };
  },
  created() {
    this.site_on();
    if (this.username) {
      this.head.right = " <a href='#/profile'><span class='iconfont'>&#xe60e;</span></a>"
    };
    console.log(this.$store.state.entities,'=-----');
  },
  methods: {
    site_on() {
      //   请求端口
      // 用户id + 订单id
      const url = "https://elm.cangdu.org/bos/v1/users/1/orders/1/snapshot";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        // console.log(res);
        this.con = res.data;
      });
    },
    setbagcolor(value){
      if (value.tag == "家") {
       return '#ff5722';
      } else if (value.tag == "公司") {
       return 'rgb(76, 217, 100)';
        
      } else if (value.tag == "学校") {
       return 'rgb(49, 144, 232)';
      }else{
        return '#ff5722';
      }
    },
    //确认下单...
    confirmOrder(){
      console.log(this.$route,'bcbc');
      console.log(this.$store.state.content_on,'aa')
      // this.$router.push({name:'payment'});
    },
    //下单请求...
    getOrder(){
      const url = "https://elm.cangdu.org/v1/users/:user_id/carts/:cart_id/orders";
      this.$http({
        method: "post",
        url: url,
        data:{
          user_id:this.$store.state.content_on.user_id, //用户ID
          cart_id:this.$store.state.content_on.user_id.city_id,//购物车ID
          address_id :this.$store.state.content_on.id,//收货地址ID
          restaurant_id:this.$store.state.restaurant_id,// 	餐馆ID
          geohash:this.$store.state.geohash,//经纬度
          description:this.$store.state.description , //备注
          entities:Object.keys(this.$store.state.entities),//[{attrs:[],extra:{},id:食品id,name:食品名称,packing_fee:打包费,price:价格,quantity:数量,sku_id:规格id,specs:规格,stock:存量,}]
        }
      }).then(res => {
        console.log(res);
        // this.con = res.data;
      });
    },
    packingFee(){
      let num = 0;
      for(let v in this.cartsInfo){
        num += this.cartsInfo[v][0].packing_fee;
      }
      return num;
    }
  }
};
</script>

<style lang="scss" scoped>
.site {
   background: #fff url(../../images/caixian.png) repeat-x 0 1.26rem;
  background-size: 0.2rem 0.04rem;
  height: 0.8rem;
  padding-top: 0.5rem;
  // background: #fff;
  a {
    line-height: 0.3rem;
    .left {
      margin-left: 0.2rem;
      display: flex;
      align-items: center;
      #on {
        color: #3190e8;
        font-size: 0.18rem;
        font-weight: 600;
      }
      .flex_on {
        margin-left: 0.1rem;
        color: black;
        display: inline-block;
        margin-top: 0.1rem;
        header {
          color: black;
          .name_on {
            font-size: 0.18rem;
            font-weight: 700;
          }
          .age_on {
            font-size: 0.15rem;
            font-weight: 400;
          }
        }
        .botoom_on {
          font-size: 0.13rem;
          span {
            border-radius: 0.05rem;
            padding: 0 0.03rem;
            color: white;
          }
          p {
            display: inline-block;
            color: #777;
          }
        }
      }
    }
    .right {
      margin-right: 0.2rem;
      line-height: 0.8rem;
      span {
        font-size: 0.4rem;
        color: grey;
      }
    }
  }
}
.time_on {
 
  margin-top: 0.1rem;
  padding: 0 0.15rem;
  height: 0.94rem;
  border-left: 0.07rem solid #3190e8;
  background: white;
  .left {
    line-height: 0.94rem;
    font-size: 0.2rem;
    font-weight: 700;
  }
  .right {
    margin-top: 0.1rem;
    line-height: 0.5rem;
    color: #3190e8;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: end;
    align-items: flex-end;
    .right_bottom {
      border: 0.01rem solid #3190e8;
      border-radius: 0.05rem;
      overflow: hidden;
      background: #3190e8;
      color: #fff;
      font-size: 0.13rem;
      height: 0.14rem;
      line-height: 0.14rem;
    }
  }
}
.payment {
  margin-top: 0.1rem;
  background: #fff;
  padding: 0 0.15rem;
  height: 0.96rem;
  line-height: 0.46rem;
  .payment_top {
    height: 50%;
    border-bottom: 0.01rem solid #f5f5f5;
    .top_left {
      float: left;
    }
    .top_right {
      float: right;
      color: #ccc;
      font-size: 0.15rem;
    }
  }
  .payment_bottom {
    height: 50%;
    color: #ccc;
    font-size: 0.15rem;
    .bottom_left {
      float: left;
    }
    .bottom_right {
      float: right;
    }
  }
}
.show_on {
  margin-top: 0.1rem;
  height: 3.8rem;
  background: #fff;
  header {
    padding: 0.15rem 0.15rem;
    border-bottom: 0.01rem solid #f5f5f5;
    img {
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: top;
    }
    span {
      display: inline-block;
      margin-top: 0.03rem;
      font-size: 0.2rem;
    }
  }
  .form_on {
    padding-top: 0.1rem;
    height: 1.37rem;
    font-size: 0.15rem;
    // color: #ccc;
    .form_left {
      float: left;
    }
    .form_right {
      float: right;
      .text_on {
        color: #f60;
      }
    }
    li {
      height: 0.42rem;
      line-height: 0.42rem;
      padding: 0 0.15rem;
    }
  }
  .box,
  .charge {
    padding: 0 0.15rem;
    height: 0.42rem;
    line-height: 0.42rem;
    p {
      float: left;
    }
    span {
      float: right;
    }
  }
  .charge {
    border-bottom: 0.01rem solid #f5f5f5;
  }
  .money {
    padding: 0 0.15rem;
    height: 0.84rem;
    line-height: 0.4rem;
    p {
      float: left;
    }
    span {
      width: 0.84rem;
      color: #f60;
      float: right;
    }
  }
}
.bottom_on {
  margin-top: 0.1rem;
  height: 0.95rem;
  padding: 0 0.15rem;
  background: white;
  margin-bottom: 0.8rem;
  a {
    display: flex;
    height: 50%;
    line-height: 0.4725rem;
    color: black;
    .span_on {
      font-size: 0.15rem;
    }
    div {
      font-size: 0.15rem;
      color: #aaa;
      margin-left: 1.5rem;
    }
  }
}
.bottom_bot {
  height: 0.5rem;
  width: 100%;
  position: fixed;
  bottom: 0rem;
  z-index: 1000;
  line-height: 0.5rem;
  .bottom_left {
    float: left;
    width: 2.58rem;
    padding-left: 0.15rem;
    background: black;
    color: #fff;
    font-size: 0.18rem;
  }
  .bottom_right {
    float: right;
    width: 1.02rem;
    height: 0.5rem;
    background: #56d176;
    text-align: center;
    font-size: 0.18rem;
    color: #fff;
  }
}
.z-index {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  .z-top {
    height: 4.35rem;
    background: grey;
    opacity: 0.5;
  }
  //   关键帧动画
  //   @keyframes z-bottom {
  //     from {
  //       transform: translateY(-100rem);
  //     }
  //     to {
  //       transform: translateY(1rem);
  //     }
  //   }
  .z-bottom {
    height: 2.37rem;
    background: white;
    .bottom_p {
      //   height: 0.46rem;
      width: 100%;
      line-height: 0.46rem;
      background: #fafafa;
      color: black;
      text-align: center;
    }
    .bottom_p,
    .on {
      height: 0.58rem;
      line-height: 0.5rem;
      padding: 0 0.15rem;
      span {
        //   width: 0.5rem;
        font-size: 0.2rem;
      }
    }
    .on {
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
    }
    .on_top {
      color: #5c5555;
      span {
        color: #dfdbdb;
      }
    }
    .on_bottom {
      span {
        color: #4cd964;
      }
    }
  }
}
</style>