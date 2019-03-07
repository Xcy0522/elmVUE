<template>
  <div class="shopDetail">
    <headCom :head="head"></headCom>
    <section class="img">
      <img :src="'//elm.cangdu.org/img/' + $route.query.image_path" alt>
    </section>
    <p class="description">{{$route.query.description}}</p>
    <section class="detailCounter">
      <p class="name">{{$route.query.name}}</p>
      <div class="star">
        <span>评分</span> 
         <el-rate
            v-model="star"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>


      </div>
      <p class="price">
        <span>月售 {{$route.query.month_sales}} 单</span>
        <span>售价 ¥20 起</span>
      </p>
      <p class="rate">
        <span>评论数 {{$route.query.rating_count}}</span>
        <span>好评率 {{$route.query.satisfy_rate}}%</span>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>订单列表</span>",
        right: ""
      },
      star:Number(this.$route.query.rating)
    };
  },
  created() {
  //   console.log(this.$route.query)
  //   console.log(this.star)
  },
  methods: {
    

  }
};
</script>

<style lang="scss" scoped>
.shopDetail {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0.46rem;
  background-color: #fff;
  z-index: 10;
  .img {
    padding-top: 0.45rem;
    // width: 3.75rem;
    // height: 3.75rem;
    img {
      width: 3.75rem;
      z-index: 100;
    }
  }
  .description {
    font-size: 0.14rem;
    color: #666;
    height: 0.21rem;
    margin-top: 0.12rem;
    line-height: 0.18rem;
    padding: 0 0.09rem;
  }
  .detailCounter {
    padding: 0.12rem;
    height: 0.19rem;
    .name {
      font-size: 0.16rem;
      color: #333;
      margin-bottom: 0.05rem;
    }
    .star {
      display: flex;
      align-items: center;
      span {
        font-size: 0.14rem;
        color: #666;
        margin-right: 0.05rem;
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
    .price {
      font-size: 0.14rem;
      height: 0.19rem;
      margin-top: 0.07rem;
      span:first-child {
        font-size: 0.14rem;
        color: #666;
        margin-right: 0.09rem;
      }
      span:last-child {
        font-size: 0.16rem;
        color: #f60;
        margin-right: 0.05rem;
      }
    }
    .rate {
      height: 0.28rem;
      line-height: 0.28rem;
      span {
        font-size: 0.14rem;
        color: #666;
      }
    }
  }
}
</style>