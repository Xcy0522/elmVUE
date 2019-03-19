<template>
  <div class="appranse">
    <header class="top2">
      <section class="left">
        <p>{{Number(evaluateScore.overall_score).toFixed(1)}}</p>
        <p>综合评价</p>
        <p>
          高于周边商家
          <span>{{Number(evaluateScore.compare_rating * 100).toFixed(1)}}%</span>
        </p>
      </section>
      <section class="right">
        <div>
          <span>服务态度</span>
          <el-rate
            v-model="serviceValue"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div>
          <span>菜品评价</span>
          <el-rate
            v-model="foodValue"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div>
          <span>送达时间</span>
          <span>分钟</span>
        </div>
      </section>
    </header>
    <ul class="center">
      <li
        v-for="(value,index) in evaluateKind"
        :key="index"
        :class="(value.unsatisfied)?'unsatisfied':(value.name == '全部')?'tagActivity':''"
      >{{value.name}}({{value.count}})</li>
    </ul>
    <ul class="detail">
      <li v-for="(value,index) in evaluateMessage" :key="index">
        <div v-if="(value.avatar)" class="userImg">
          <img
            :src="'https://fuss10.elemecdn.com/' + (value.avatar).slice(0,1) +'/' + (value.avatar).slice(1,3) + '/' + (value.avatar).slice(3) + '.jpeg'"
            alt
          >
        </div>
        <div v-else class="userImg">
          <img :src="'https://elm.cangdu.org/img/default.jpg'" alt>
        </div>
        <section class="userMes">
          <header class="userHeader">
            <section class="userStare">
              <p>{{value.username}}</p>
              <div class="star">
                <el-rate v-model="Pervalue" disabled text-color="#ff9900" score-template="{value}"></el-rate>
                <p>{{value.time_spent_desc}}</p>
              </div>
            </section>
            <div class="time">{{value.rated_at}}</div>
          </header>
          <ul class="foodImg" v-if="(value.item_ratings)">
            <li v-for="(value1,index) in value.item_ratings" :key="index">
              <img
                v-if="value1.image_hash"
                :src="'https://fuss10.elemecdn.com/' + (value1.image_hash).slice(0,1) +'/' + (value1.image_hash).slice(1,3) + '/' + (value1.image_hash).slice(3) + '.jpeg'"
                alt
              >
            </li>
          </ul>
          <ul class="foodNameImg" v-if="(value.item_ratings)">
            <div v-for="(value2,index) in value.item_ratings" :key="index">{{value2.food_name}}</div>
          </ul>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      restaurant_id: this.$route.query.id || 1,
      evaluateScore: "", // 评价分数
      evaluateKind: "", // 评价分类
      evaluateMessage: "", // 个人评价信息
      serviceValue: 5, // 服务评价
      foodValue: 5, // 食品评价
      Pervalue: 5 // 个人评价
    };
  },
  created() {
    this.getEvaluateScore(); // 页面上面评价分数
    this.getEvaluateKind(); // 页面中间评价分类
    this.getEvaluateMessage(); // 页面下面个人评价信息
  },
  methods: {
    // 页面上面评价分数
    getEvaluateScore() {
      const url =
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurant_id +
        "/ratings/scores";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        // console.log("评价分数", res);
        this.evaluateScore = res.data;
        this.serviceValue = Number(res.data.service_score.toFixed(1));
        this.foodValue = Number(res.data.food_score.toFixed(1));
      });
    },
    // 页面中间评价分类
    getEvaluateKind() {
      const url =
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurant_id +
        "/ratings/tags";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        // console.log("评价分类", res);
        this.evaluateKind = res.data;
      });
    },

    // 页面下面个人评价信息
    getEvaluateMessage() { 
      const url =
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurant_id +
        "/ratings";
      this.$http({
        method: "get",
        url: url,
        params: {
          offset: "0",
          limit: "10"
        }
      }).then(res => {
        // console.log("个人评价信息", res);
        this.evaluateMessage = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.appranse {
  .top2 {
    display: flex;
    background-color: #fff;
    height: 0.723rem;
    padding: 0.19rem 0.12rem;
    margin-bottom: 0.12rem;
    .left {
      flex: 3;
      text-align: center;
      // margin-right: .05rem;
      p:nth-child(1) {
        font-size: 0.26rem;
        color: #f60;
        line-height: 0.34rem;
        font-weight: 400;
      }
      p:nth-child(2) {
        font-size: 0.16rem;
        color: #666;
        line-height: 0.2rem;
        margin-bottom: 0.023rem;
      }
      p:nth-child(3) {
        font-size: 0.14rem;
        line-height: 0.16rem;
        color: #999;
      }
    }
    .right {
      flex: 4;
      div {
        font-size: 0.15rem;
        line-height: 0.23rem;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        // span:first-child {
        //   margin-right: 0.05rem;
        // }
        span:last-child {
          margin-left: 0.1rem;
        }
        .el-rate {
          transform: scale(0.7);
          i {
            margin-right: 0;
          }
          .el-rate__text {
            font-size: 0.2rem;
          }
          .el-rate__item {
            vertical-align: bottom;
          }
        }
      }
    }
  }
  .center {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 0.117rem;
    li {
      font-size: 0.14rem;
      color: #6d7885;
      padding: 0.07rem;
      background-color: #ebf5ff;
      border-radius: 0.05rem;
      border: 1px;
      margin: 0 0.09375rem 0.04688rem 0;
    }
    .tagActivity {
      background-color: #3190e8;
      color: #fff;
    }
    .unsatisfied {
      background-color: #f5f5f5;
      color: #aaa;
    }
  }
  .detail {
    background-color: #fff;
    padding: 0 0.12rem;
    li {
      border-top: 1px solid #f1f1f1;
      display: flex;
      padding: 0.14rem 0;
      .userImg {
        width: 0.35rem;
        border: 0.025rem;
        margin-right: 0.15rem;
        img {
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
        }
      }
      .userMes {
        flex: 1;
        .userHeader {
          display: flex;
          flex: 1;
          justify-content: space-between;
          margin-bottom: 0.07rem;
          .userStare {
            font-size: 0.14rem;
            color: #666;
            p:first-child {
              color: #666;
              margin-bottom: 0.05rem;
            }
            .star {
              display: flex;
              align-items: center;

              .el-rate {
                transform: scale(0.7);
                i {
                  margin-right: 0;
                }
                .el-rate__text {
                  font-size: 0.2rem;
                }
                .el-rate__item {
                  vertical-align: bottom;
                }
              }
            }
          }
          .time {
            font-size: 0.14rem;
            color: #999;
          }
        }
        .foodImg {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 0.09rem;
          li {
            border: 0;
            padding: 0;
          }
          img {
            width: 0.7rem;
            height: 0.7rem;
            margin-right: 0.09rem;
            display: block;
          }
        }
        .foodNameImg {
          display: flex;
          flex-wrap: wrap;
          div {
            font-size: 0.14rem;
            color: #999;
            width: 0.42rem;
            height: 0.17rem;
            padding: 0.05rem;
            border: 0.00578rem solid #ebebeb;
            border-radius: 0.05rem;
            margin-right: 0.07rem;
            margin-bottom: 0.04px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>