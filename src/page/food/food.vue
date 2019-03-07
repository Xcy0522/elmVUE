<template>
  <div class="profile">
    <headCom :head="head"></headCom>
    <navCom :getList="getList"></navCom>
    <div class="content">
      <ul class="store_list">
        <li v-for="(v,k,i) in cityList" :key="i" class="store_list_li">
          <div @click="routerLink(v.latitude,v.longitude,v.id)">
            <img :src="'http://elm.cangdu.org/img/' + v.image_path" alt>
            <div class="store_list_cont">
              <span class="spana">{{v.name}}</span>
              <span class="spana">
                <b
                  v-for="(v,i) in v.supports"
                  :key="i"
                  :style="{'color':'#' + v.icon_color}"
                >{{v.icon_name}}&nbsp;</b>
              </span>
              <span class="spana">
                <el-rate
                  v-model="v.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                ></el-rate>
                <b class="colorGray">月销{{v.recent_order_num}}单</b>
              </span>
              <span class="spana">
                <i class="colorGreen">蜂鸟专送</i>
                <i class="bagGreen">准时达</i>
              </span>
              <span
                class="colorGray spana"
              >￥{{v.float_minimum_order_amount}}起送/{{v.piecewise_agent_fee.tips}}</span>
              <span class="colorGray spana">
                {{v.distance}}&nbsp;/&nbsp;
                <b>{{v.order_lead_time}}&nbsp;&nbsp;</b>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navCom from "./nav/nav";
export default {
  name: "profile",
  data() {
    return {
      msg: "我是:food",
      head: {
        left: "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "我的",
        right: ``
      },
      cityList: {}
    };
  },
  components: {
    navCom
  },
  created() {
    this.head.cont = this.$route.query.title;
    console.log(this.$route);
  },
  methods: {
    getList(query) {
      let url = "https://elm.cangdu.org/shopping/restaurants";
      this.$http({
        method: "get",
        url,
        params: {
          ...query
        }
      }).then(response => {
        //这里使用了ES6的语法
        console.log(response); //请求成功返回的数据;

        this.$set(this, "cityList", response.data);
        // container = response.data
      });
    },
    routerLink(latitude,longitude,id){
      this.$router.push({
        path:"/shop",
        query:{
          geohash: latitude + ',' + longitude,
          id:id,
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  padding-top: 0.84rem;
  .content {
    margin-top: 0;
    background-color: #fff;
    .store_list {
      font-size: 0.15rem;
      .store_list_li {
        height: 0.73rem;
        padding: 0.16rem 0.1rem;
        border-top: 0.01rem solid #f1f1f1;
        .store_list_cont {
          display: flex;
          flex-wrap: wrap;
          padding-left: 0.1rem;
          .spana {
            clear: right;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            font: 0.12rem/0.14rem PingFangSC-Regular;
            font-weight: 700;
          }
          .spana:nth-child(1)::before {
            content: "\54C1\724C";
            display: inline-block;
            font-size: 0.12rem;
            line-height: 0.15rem;
            color: #333;
            background-color: #ffd930;
            padding: 0 0.03rem;
            border-radius: 0.05rem;
            margin-right: 0.05rem;
          }
          .spana:nth-child(n + 3) {
            margin-top: 0.1rem;
          }
          .spana:nth-child(3) {
            margin-top: 0.1rem;
            color: #ff6000;
            .el-rate{
              float:left;
              padding-right: 0.05rem;
            }
            .el-rate__icon {
              margin:0;
              font-size:0.12rem;
            }
          }
          .spana:nth-child(even) {
            text-align: right;
            width: 40%;
          }
          .spana:nth-child(odd) {
            text-align: left;
            width: 60%;
          }
          .colorGray {
            color: #666;
            font-weight: 500;
            b {
              color: #3190e8;
            }
          }
          .colorGreen {
            display: inline-block;
            color: #fff;
            font-size: 0.1rem;
            font-weight: 400;
            background-color: #3190e8;
            border: 0.01rem solid #3190e8;
            padding: 0.01rem 0rem 0.01rem;
            border-radius: 0.05rem;
            transform: scale(0.8);
            transform-origin: right;
          }
          .bagGreen {
            display: inline-block;
            color: #3190e8;
            font-size: 0.1rem;
            line-height: 0.12rem;
            font-weight: 400;
            border: 0.01rem solid #3190e8;
            padding: 0.01rem 0rem 0.01rem;
            border-radius: 0.03rem;
            margin-left: 0.01rem;
            transform: scale(0.8);
            transform-origin: right;
          }
        }
        img {
          float: left;
          width: 0.63rem;
        }
      }
    }
  }
  .float_left {
    float: left;
  }
  .float_right {
    float: right;
  }
}
</style>