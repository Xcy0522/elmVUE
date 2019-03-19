<template>
  <div class="benefit">
    <headCom :head="head"></headCom>
    <section class="choose">
      <span :class="isChoosed == '1' ? 'choosed':''" @click=" isChoosed = '1' ">红包</span>
      <span :class="isChoosed == '2' ? 'choosed':''" @click=" isChoosed = '2' ">商家代金券</span>
    </section>
    <!-- 红包板块 -->
    <section class="hongbaoShow" v-if="isChoosed == '1'">
      <header>
        <div>
          有
          <span>{{$store.state.hongbaoNum}}</span> 个红包到期
        </div>
        <div>
          <img :src="wenhao" alt>
          <router-link :to="{name:'hbDescription'}">红包说明</router-link>
        </div>
      </header>
      <ul>
        <li v-for="(value,index) in hongbaoArr" :key="index">
          <section class="listItem">
            <div class="listItemLeft">
              <span>¥</span>
              <span>{{parseInt(value.amount % 10)}}</span>
              <span>.</span>
              <span>{{value.amount.toFixed(1).toString().split('.')[1]}}</span>
              <p>{{value.description_map.sum_condition}}</p>
            </div>
            <div class="listItemRight">
              <h4>{{value.name}}</h4>
              <p>{{value.description_map.validity_periods}}</p>
              <p>{{value.description_map.phone}}</p>
            </div>
            <div class="timeRight">{{value.description_map.validity_delta}}</div>
          </section>
        </li>
      </ul>
      <div class="limit">
        <p>限品类:快餐便当,特色菜系,小吃夜宵,甜品饮品,异国料理</p>
      </div>
      <router-link class="historyHongbao" :to="{name:'hbHistory'}">查看历史红包</router-link>

      <footer>
        <router-link :to="{name:'exchange'}">兑换红包</router-link>
        <router-link :to="{name:'commend'}">推荐有奖</router-link>
      </footer>
    </section>

    <!-- 商家代金券板块 -->
    <section class="coupon" v-if="isChoosed == '2'">
      <section class="couponDescript">
        <router-link :to="{name:'coupon'}">商家代金券说明</router-link>
        <img :src="wenhao" alt>
      </section>
      <section class="unableUse">
        <img :src="unableUse" alt>
        <p>无法试用代金券</p>
        <p>非客户端或客户端版本过低</p>
        <router-link :to="{name:'download'}">下载或升级客户端</router-link>
      </section>
    </section>
  </div>
</template>

<script>
let unableUse = require("../../images/unableUse.png");
import { huabian, wenhao } from "../../images/img.js";
export default {
  name: "city",
  data() {
    return {
      msg: "我是benefit页面..",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>我的优惠</span>",
        right: ""
      },
      huabian,
      wenhao,
      user_id: localStorage.getItem("userId"),
      hongbaoArr: "",
      isChoosed: "1",
      erroImg: "",
      unableUse
    };
  },
  created() {
    console.log(this.user_id);
    this.$store.dispatch("hongbao", [
      this.user_id,
      (data,num) => {
        this.hongbaoArr = data;
        console.log(this.hongbaoArr);
      }
    ]);
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.benefit {
  .choose {
    padding-top: 0.45rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.46rem;
    background-color: #fff;
    span {
      text-align: center;
      font-size: 0.14rem;
      color: #333;
      line-height: 0.2rem;
      padding-bottom: 0.047rem;
      border-bottom: 0.023rem solid #fff;
    }
    .choosed {
      border-bottom-color: #3190e8;
      color: #3190e8;
    }
  }
  .hongbaoShow {
    padding: 0 0.164rem;
    header {
      display: flex;
      justify-content: space-between;
      height: 0.46rem;
      line-height: 0.46rem;
      font-size: 0.14rem;
      div:first-child {
        color: #333;
        span {
          color: #ff5340;
        }
      }
      div:last-child {
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        img {
          width: 0.14rem;
          height: 0.14rem;
          margin-right: 0.047rem;
        }
        a {
          color: #3190e8;
        }
      }
    }
    ul {
      li {
        background: #fff url(../../images/huabian.png) repeat-x;
        background-size: 0.1rem 0.05rem;
        margin-bottom: 0.117rem;
        border-radius: 0.05rem;
        .listItem {
          display: flex;
          justify-content: space-between;
          padding: 0.234rem 0.117rem 0.188rem;
          .listItemLeft {
            font-family: Helvetica Neue, Tahoma, Arial;
            border-right: 0.01rem dotted #ccc;

            padding-right: 0.05rem;
            span:first-child {
              font-size: 0.16rem;
              color: #ff5340;
              font-weight: 700;
            }
            span:nth-child(2) {
              font-size: 0.35rem;
              color: #ff5340;
            }
            span:nth-child(3) {
              font-size: 0.16rem;
              color: #ff5340;
              font-weight: 700;
            }
            span:nth-child(4) {
              font-size: 0.16rem;
              color: #ff5340;
              font-weight: 700;
            }
            p {
              padding-top: 0.1rem;
              line-height: 0.1rem;
              font-size: 0.13rem;
              color: #999;
              white-space: nowrap;
            }
          }
          .listItemRight {
            h4 {
              font-size: 0.16rem;
              line-height: 0.21rem;
              color: #666;
              margin-left: 0.16rem;
            }
            p {
              line-height: 0.16rem;
              margin-left: 0.16rem;
              font-size: 0.1rem;
              color: #999;
              white-space: nowrap;
            }
          }
          .timeRight {
            font-size: 0.18rem;
            color: #ff5340;
          }
        }
      }
    }
    .limit {
      background-color: #f9f9f9;
      padding: 0.09375rem;
      border-bottom-left-radius: 0.05rem;
      border-bottom-right-radius: 0.05rem;
      p {
        list-style-type: disc;
        font-size: 0.14rem;
        color: #999;
        margin-left: 0.09375rem;
      }
    }
    .historyHongbao {
      padding: 0.00719rem 0 0.66rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.12rem;
      color: #999;
    }
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      a {
        flex: 1;
        display: block;
        width: 1.87rem;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        font-size: 0.18rem;
        color: #555;
      }
    }
  }
  // 代金券板块
  .coupon {
    .couponDescript {
      width: 100%;
      margin-right: 0.117rem;
      height: 0.46rem;
      line-height: 0.46rem;
      font-size: 0.14rem;
      overflow: hidden;
      img {
        float: right;
        margin-top: 0.16rem;
        width: 0.14rem;
        height: 0.14rem;
        margin-right: 0.047rem;
      }
      a {
        float: right;
        color: #3190e8;
      }
    }
    .unableUse {
      text-align: center;
      margin-top: 0.9375rem;
      p:nth-child(2) {
        font-size: 0.16rem;
        color: #666;
        margin-top: 0.09375rem;
      }
      p:nth-child(3) {
        font-size: 0.14rem;
        color: #999;
        margin-top: 0.07rem;
        margin-bottom: 0.07rem;
      }
      a {
        display: block;
        width: 50%;
        margin: 0 auto;
        background-color: #56d176;
    font-size: .17rem;
    color: #fff;
    padding: .07rem;
    border-radius: .05rem;
      }
    }
  }
}
</style>