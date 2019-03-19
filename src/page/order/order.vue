<template>
  <div class="wrap_top">
    <headCom :head="head"></headCom>
    <!-- 单个订单列表 -->
    <ul>
      <li>
        <section class="order_on">
          <img
            data-v-285feff8
            src="//elm.cangdu.org/img/164ad0b6a3917599.jpg"
            class="restaurant_image"
          >
          <section class="order_right">
            <div @click="$router.push({name: 'orderDetail'})" class="order_r_top">
              <div>
                <h4>
                  <span>效果展示</span>
                  <span class="iconfont icon-you"></span>
                </h4>
                <p>日期时间</p>
              </div>
              <p>等待支付</p>
            </div>
            <section class="order_r_bottom">
              <p class="order_b_l">下单食品名称</p>
              <p class="order_b_r">￥待支付金额</p>
            </section>
            <section class="order_b_bottom">
                <p>去支付(还剩00分00秒)</p>
            </section>
          </section>
        </section>
      </li>
    </ul>
    <footGuide></footGuide>
  </div>
</template>

<script>
export default {
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "订单列表",
        right: ""
      },
      uesrId: localStorage.getItem("uesrId")
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
    getMessage(){
      const url = "https://elm.cangdu.org/bos/v2/users/1/orders"
      this.$http({
        method:"get",
        url: url,
        params: {
          limit  : 10,
          offset: 0,
        }
      }).then((res)=>{
        console.log(res)

      })
    }
  },

};
</script>

<style lang="scss" scoped>
body,
html {
  background: #f5f5f5;
}
.wrap_top {
  ul {
    margin-top: 0.5rem;
    li {
      padding: 0.15rem 0.15rem 0;
      margin-bottom: 0.15rem;
      background: white;
      .order_on {
        display: flex;
        justify-content: space-between;
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.1rem;
        }
        .order_right {
          flex: 5;
          .order_r_top {
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.05rem;
            line-height: 0.23rem;
            border-bottom: 0.01rem solid #f5f5f5;
            div {
              p {
                color: #999;
              }
            }
            p {
              font-size: 0.13rem;
              color: black;
            }
          }
          .order_r_bottom {
            display: flex;
            justify-content: space-between;
            line-height: 0.46rem;
            border-bottom: 0.01rem solid #f5f5f5;
            .order_b_l {
              color: #666;
              font-size: 0.13rem;
            }
            .order_b_r {
              color: #f60;
              font-size: 0.15rem;
              font-weight: 600;
            }
          }
          .order_b_bottom {
            height: 0.41rem;
            p {
              float: right;
              margin-top: 0.1rem;
              border: 0.01rem solid rgb(255, 165, 0);
              border-radius: 0.05rem;
              padding: 0 0.03rem;
              font-size: 0.1rem;
              color: rgb(255, 165, 0);
            }
          }
        }
      }
    }
  }
}
</style>