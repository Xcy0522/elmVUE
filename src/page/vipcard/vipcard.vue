<template>
  <div class="vipcard">
    <headCom :head="head"></headCom>
    <div class="content" v-if="(username)">
      <p>为账户 {{username}} 购买会员</p>
      <section class="vipTop">
        <router-link :to="{name:'vipDescription'}" tag="div" class="vipExplain">
          <span>会员特权</span>
          <i class="el-icon-arrow-right"></i>
          <span class="spanRight">会员说明</span>
        </router-link>
        <section class="detailCommon">
          <div class="baseimg">
            <img :src="img1" alt>
          </div>
          <div class="commonRight">
            <h4>减免配送费</h4>
            <p>每月减免30单,每日可减免3单,每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </section>
        <section class="detailCommon">
          <div class="baseimg">
            <img :src="img2" alt>
          </div>
          <div class="commonRight">
            <h4>减免配送费</h4>
            <p>每月减免30单,每日可减免3单,每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </section>
      </section>
      <!-- 开通会员 -->

      <section class="applyVip">
        <header>开通会员</header>
        <section class="applyAppBuy">
          <div class="applyVipLeft">
            <span>一个月</span>
            <span>¥20</span>
          </div>
          <router-link :to="{name: 'payment'}" class="applyAppRight" tag="div">购买</router-link>
        </section>
      </section>

      <!-- 兑换会员 -->

      <router-link :to="{name:'useCart'}" tag="div" class="convertCommon">
        <span>兑换会员</span>
        <i class="el-icon-arrow-right"></i>
        <span>使用卡号卡密</span>
      </router-link>

      <!-- 购买会员 -->

      <router-link :to="{name:'invoiceRecord'}" tag="div" class="convertCommon">
        <span>购买记录</span>
        <i class="el-icon-arrow-right"></i>
        <span>开发票</span>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      msg: "我是vipcard页面..",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>会员中心</span>",
        right: ""
      },
      username: localStorage.getItem("username"),
      img1:
        "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABQCAMAAACTf/MwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACHUExURUxpcVGm/1Kn/1Kn/1Gm/1Gm/6f//1Gm/1ao/1Wq/1Gm/1Gm/1Gm/1Kn/1qx/1Gm/1Gm/2C2/1Gm/1Gm/2O2/1Om/1Sq/1Wq/1Sp/1Gm/1Ko/1er/1Gn/1Gm/1Gn/1Kn/1Kn/1Kn/1Kn/1Kn/1Gn/1Gm/1Gm/1Sp/1Gm/1Gm/1Kn/1Gm/1Gm/0Kn+j4AAAAsdFJOUwCKSJH+1gH4JSD1+6C3Du2ZBKflCSsaKC7BNhSwb8pmeEJWT7zGgzzR2l7fYL3NXQAAA75JREFUeNrFlmtzgjoQQMNDwaC8Kw9B8Vltz///fbfFXOoItUFn7j0fjCNwzO6GZMV/QroPiyQ4zj/85x3+rpIovMVm9Yxj9bFwuGKroaiX4xzLzcGjZd2UflrWhXc1rZuZrmNWFzYA9rHuHlptFkp8brK/HW6zVsk4bO5C8D8qFebklD9y5KczLY5KaD/psaTl0ying47SuNAiq0flTffzgJbE2kZ3F9+tT1qCeJeKP4jMUJmC0LyZk7lWv873qdAi2lqJytPuX1EDQBKqOWoyLY1rBOHVUwOB9T4V4ylPCWC1K0JC7IsnSS2wv8tvQBGJ54mh+hoK2IrxuN2ih+RrCOCJkEppqWQqATjjLVkAhvo+gZmGxq/3vR0ggWQ2TtOAeyeeQPAmdDVmuyWEYH4N+0PeTeaM8y50NQ3O8keT4HQV9Yu90NWUHs5Kaa6DLEWHria9QHMTVFqohIzTWHCMbjTCP6vyjNHsbaQrbjWRBVxWozRbBzbiVpOfAThEIzRbCbG40USNA4QSLH3Nzrn5Wwsy9wjIjdjZsNPVmB4c/W6xGVboAMV3ek8g3zQ1MRzSn+2+sgFZT9s8F7DW1JRrI+1OyyMAhXvzVqZ6GkVUNuooX5uiIz802pWKsp2xCGhx4t7uqKPZh4dPjw4ZWz8Ym1RTM+Mh66meJrcBj1950wwqM9/dFILyrUe+hq2ORjGFiRhgDub/osEbwP5V4+ENa4bpay6txsEe1MjFAMmwZimEhOlLufmEVXsEpy9pElipzwFNYAwwGdBIiFSiX0mx3ZZ6DfkrGh+Cr6ECc0jz6Q4wcHMG5+uOvXklxVtYXPsOQ/TwCHK3Rzbwam4g/Br2UPU1Cb+R9Q/pumsB7zG0ty3Vgk4DcPvJ2RnzAcLav288HOyVOpU24mlMWKsccex1vNrM4XQ90Rx463W8mviyeziGuNfxanL6CaUEO+91vFos5U2HEcM56nW8OlS3K8CVYPU6Xg1qsG9u3wB11/Fqs/fu8hiD/SFGsnVUs9oRHcBuxll2Dkz8u/ofgTDVl0xPNlyWvaa8As7aK3h1ANYr0SOyVIenwy4A4nT4mgSOmcaiqwCvFr/gFoBn+I8lUSOBSfkgb7UEko9Hke0vgHeKxCNmFcD51zX4fgQocvEX5gWgGHwl8op2tkKDqA4ADr3gs9gG5MkXevgnCbAo+xIvXAl9lpbTirrQ8lZix64YxzL0AIrtd9XK6irJxHhmoQOQVNWFVtIvj35oCk/N5EmRkQAEliteY5qZZh6JP/gH4pi+7mLJkZ4AAAAASUVORK5CYII=",
      img2:
        "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABQCAMAAACTf/MwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB+UExURUxpcVKn/1qw/1Or/1Gm/1Gm/1Gm/1Gm/1Or/1Gm/1Ws/3DU/1Gm/161/1Gn/1Gm/1Op/1Kn/1Gn/1Oo/1Gn/1Kn/1Gn/1Sq/1Gn/1Kn/1Gm/1Gn/1Gn/1Sp/1Gm/1Gm/1Gm/1Gm/1Kn/1Kn/1Gm/1Gn/1Gm/1Gn/1Kn/1Gm/xLw9zUAAAApdFJOUwBEDxz9w/T5ItYWA+0IbeUtTZo2tJPMJ9N+pHZVPa7bvOFcY4SNialmEIpfyAAAA5pJREFUeNq9l+mSojAYRdlRZEdRVFBc+7z/C45DUhZtFCJTNfdPbJXjt+UmbfwXRfvcTUI3P1nTGdap8ZDyjz/BFEZwXvoIOXJxY/s7hh0f5bPlrrCiInYdQSp3M13G7PGQ8vPBz9GX4Go9zljvSrUYz1JJ0vySDjHSaiMZy3Pwtuj7uyx6eyveM4rbgU5eM9TeKNuGdEpW9eLlw/raSsZ2HxkjWpi5JIW52SOZJfLdTDJGSfUqkXXaG1KViFGQ9VXIDHLxZwyEVyVPLdIlAVbdRHhwtyZvuis4f9t/A3dhTNcW7o/FBXPC0+vn0EPyWEKYkFLhrWQKEgD+hFhCuMnXc5hNw9gtJPa/Yqw5hKnxrxh7g18bo5is5aOS7G84bmaMYhYhAwpFh8YxAYMKNDE2JMYHJWBrYmZw+IQ5wEwTk8LmE2YDqSamgPKxVFXVr/uqih9LCYUmpgb3sfgQ/ap7KDZyrYkx4Sique6FKAp2BFMTk8FSlKE3ZCcR4hIyTcwemseSw9V4KhdbuoG9JuYEWxGU/2zu2hfZbOGkiTkLt18cwLXlKJWwkUGdNTGxNHvTAW9XB0G988DpOrSCWBOzg6t44fCUI56+wk4TU8FFFjvp+UOnC1SjGOWr0blpPa9tzpHyE4MYNXA1YQ2MWka1/HoYtanqMKgYR8EoI6aOpmpBPo7RkzLw6kZRMbZheGD0pG4/ddv+VtvZcyhtRUoxA9VEVHu2JKwv1ZpUS+vLg4UsdE+qUaoG25fsUQnpgG2P2r0FoehLNnCIjB4+awFewXngSBs9Ck3Ru51wx55CBhUav/QD+dtJmDOo+dsdOIP2JcyWAbWmMh6mzGFtTFbk43RX0DvE0zEmcpDOL4P5XWhbpB1aPqyVG6+mLA/SJ3Cr3Hg1deGZSgFOqtx4tWR7PW+6QxkpN14dLfs7debBVbnxaigGp+4PtGi6uPFqK/Nf6ngH5/T1yPiv/4pFR3B231H2Psytl/67QB7pQxaVAwelp9ESKLUnODgCZfAGvwK8WDOhELhH7z/zAFcjILsB/Pij0bqAf7NGrGHnAZtioG6xByTnxdCwHAD/MtyNWQOw+TiDtQvgpuNDdQBw326JtAFITloTEYcARyX59d0BvMrS9aKLB7AsfkG2DuDngaEve+UDHOtnOl0kzvZb87dzATI7Y2s6yH3KCTIToLZpDnQQpT3fpUYvnYmgWwsQriRkutZmlo6eOH8AyHKn4WUusgUAAAAASUVORK5CYII="
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.vipcard {
  .content {
    padding-top: 0.45rem;
    p:first-child {
      font-size: 0.14rem;
      color: #666;
      line-height: 0.46rem;
      height: 0.46rem;
      padding-left: 0.17rem;
    }
    .vipTop {
      height: 2.3rem;
      padding-left: 0.164rem;
      margin-bottom: 0.12rem;
      background-color: #fff;
      .vipExplain {
        height: 0.46rem;
        padding-right: 0.164rem;

        border-bottom: 0.01rem solid #f5f5f5;
        span {
          font-size: 0.16rem;
          color: #333;
          float: left;
          height: 0.46rem;
          line-height: 0.46rem;
        }
        .spanRight {
          float: right;
          font-size: 0.14rem;
          color: #999;
        }
        .el-icon-arrow-right {
          float: right;
          font-size: 0.15rem;
          margin-top: 0.15rem;
          margin-left: 0.03rem;
        }
      }
      .detailCommon {
        height: 0.53rem;
        padding: 0.1875rem 0;
        .baseimg {
          width: 0.375rem;
          height: 0.422rem;
          float: left;
          img {
            width: 0.375rem;
            height: 0.422rem;
          }
        }
        div:last-child {
          float: left;
          margin-left: 0.1rem;
          h4 {
            font-size: 0.16rem;
            color: #333;
            font-weight: 400;
            height: 0.21rem;
          }
          p {
            font-size: 0.12rem;
            color: #999; 
            height: 0.16rem;
          }
        }
      }
    }
    // 开通会员
    .applyVip {
      width: 3.59rem;
      height: 1.07rem;
      padding-left: 0.164rem;
      background-color: #fff;
      margin-bottom: .118rem;
      header {
        background-color: #fff;
        height: 0.46rem;
        line-height: 0.46rem;
        border-bottom: 0.01rem solid #f5f5f5;
        padding-right: 0.164rem;
        font-size: 0.16rem;
        color: #333;
      }
      .applyAppBuy {
        padding-right: 0.164rem;
        font-size: 0.16rem;
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
      }
      .applyVipLeft {
        float: left;
        height: 0.6rem;
        line-height: 0.6rem;
        border: none;
        color: #333;
        font-weight: 400;
        font-family: Microsoft Yahei;
        span:first-child {
          color: #333;
        }
        span:last-child {
          font-weight: 700;
          color: #f60;
        }
      }
      .applyAppRight {
        float: right;
        border: 0.01rem solid #f60;
        border-radius: 0.05rem;
        line-height: 0.27rem;
        height: 0.27rem;
        width: 0.6rem;
        margin-top: 0.2rem;
        text-align: center;
        font-size: 0.16rem;
        color: #f60;
      }
    }
    // 兑换,购买
    .convertCommon {
          background-color: #fff;
          // height: .46rem;
    // line-height: .46rem;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 .164rem;
    margin-bottom: .117rem;
    overflow: hidden;
    span:first-child {
      height: .46rem;
          color: #333;
      line-height: .46rem;
      font-size: .14rem;
      float: left;
    }
    span:last-child {
      font-size: .12rem;
    color: #999;
    height: .46rem;
      line-height: .46rem;
    margin-right: .05rem;
    float: right;
    }
    .el-icon-arrow-right {
          float: right;
          font-size: 0.15rem;
          margin-top: 0.15rem;
          margin-left: 0.03rem;
        }

    }
  }
}
</style>