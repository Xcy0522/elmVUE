<template>
  <div class="coupon">
    <headCom :head="head"></headCom>
    <section class="content">
      <ul>
        <li v-for="(value,index) in hisHongbao" :key="index">
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
            <div class="timeRight">
              <img :src="pastImg" alt="">
            </div>
          </section>
          <footer v-if="(value.limit_map)">
            <p>{{value.limit_map.restaurant_flavor_ids}}</p>
          </footer>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
let pastImg = require('../../../images/past.png')
export default {
  name: "city",
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>历史红包</span>",
        right: ""
      },
      city_id: localStorage.getItem("userId"),
      hisHongbao: "",
      pastImg,
      // islimit: false,
    };
  },
  created() {
    this.hongbaoHistoyr();
  },
  methods: {
    hongbaoHistoyr() {
      const url =
        "https://elm.cangdu.org/promotion/v2/users/" +
        this.city_id +
        "/expired_hongbaos";
      this.$http({
        method: "get",
        url: url,
        params: {
          limit: " 20",
          offset: "0"
        }
      }).then(res => {
        // console.log(res);
        this.hisHongbao = res.data;
        // if(res.limit_map) {
        //   this.islimit = true;
        // } else {
        //    this.islimit = false;
        // }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.coupon {
  .content {
    padding: 0.68438rem 0.11719rem 0.23438rem;
    ul {
      li {
        background:#fff url(../../../images/huabian2.png) repeat-x;
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
              color: #ccc;
              font-weight: 700;
            }
            span:nth-child(2) {
              font-size: 0.35rem;
              color:  #ccc;
            }
            span:nth-child(3) {
              font-size: 0.16rem;
              color:  #ccc;
              font-weight: 700;
            }
            span:nth-child(4) {
              font-size: 0.16rem;
              color:  #ccc;
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
              color: #999;
              margin-left: 0.16rem;
            }
            p {
              line-height: 0.16rem;
              margin-left: 0.16rem;
              font-size: 0.1rem;
              color: #ccc;
              white-space: nowrap;
            }
          }
          .timeRight {
            font-size: 0.18rem;
            color:#ccc;
            img {
              opacity: .6;
            }
          }
        }
        footer {
          background-color: #f9f9f9;
          padding: 0.09375rem;
          border-bottom-left-radius: 0.05rem;
          border-bottom-right-radius: 0.05rem;
          p {
            list-style-type: disc;
            font-size: 0.14rem;
            color: #ccc;
            margin-left: 0.09375rem;
          }
        }
      }
    }
  }
}
</style>