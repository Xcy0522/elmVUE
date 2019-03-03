<template>
  <div class="city">
    <headCom :head="head"></headCom>
    <!-- 定位城市 -->
    <div class="locationCity">
      <div class="cityTipe">
        <span>定位城市:</span>
        <span>定位不准时时,请在城市列表中选择</span>
      </div>

      <div class="guessCity" @click="goSearch(guessCity.id)">
        <span>{{guessCity.name}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- 热门城市 -->
    <div class="hotCity">
      <h4>热门城市:</h4>
      <el-row>
        <el-col :span="6" v-for="(value,index) in hotCity" :key="index">
          <div @click="goSearch(value.id)">{{value.name}}</div>
        </el-col>
      </el-row>
    </div>

    <!-- 所有城市 -->
    <el-row class="allCity">
      <el-col
        class="allCityWrap"
        :span="24"
        v-for="(value,index) in Object.keys(groupCity).sort()"
        :key="index"
      >
       <!-- 显示字母A-Z -->
        <div class="grid-content" v-if="value == 'A' ">
          <h4>{{value}}</h4>
          <span>(按字母排序)</span>
        </div>
        <div class="grid-content" v-else >{{value}}</div>
        <!-- 显示字母A-Z下的城市  -->
        <el-row class="cityContent">
          <el-col :span="6" v-for="(value,index) in groupCity[value]" :key="index">
            <div class="cityName ellipsis" @click="goSearch(value.id)">{{value.name}}</div>
          </el-col>
        </el-row>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      head: {
        left: "<a href='#/home'>ele.me</a>",
        cont: "",
        right: "<a href='#/login'>登录/注册</a>"
      },
      msg: "我是city页面..",
      guessCity: { name: "北京" },
      hotCity: [],
      groupCity: []
    };
  },
  created() {
    this.getLocationCity("guess", "guessCity");
    this.getLocationCity("hot", "hotCity");
    this.getLocationCity("group", "groupCity");
    if (localStorage.getItem("username")){
      this.head.right = "<a href='#/profile' class='iconfont icon-zhaomugongyingshangshangji'></a>";
    }
  },
  methods: {
    getLocationCity(type, container) {
      const url = "https://elm.cangdu.org/v1/cities";
      this.$http({
        method: "get",
        url,
        params: {
          type
        }
      }).then(response => {
        //这里使用了ES6的语法
        // console.log(response.data); //请求成功返回的数据
        this.$set(this, container, response.data);
      });
    },
    goSearch(id) {
      this.$store.state.cityId = id;
      localStorage.setItem("cityId",id);
      this.$router.push({ name: "city", params: { id } });
    }
  }
};
</script>

<style lang="scss">
.locationCity {
  height: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  padding-top: 0.1rem;
  .cityTipe {
    width: 3.54rem;
    height: 0.33rem;
    line-height: 0.33rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    span:first-child {
      font-size: 0.05rem;
      color: #666;
    }
    span:last-child {
      font-weight: 900;
      font-size: 0.1rem;
      color: #9f9f9f;
    }
  }
  .guessCity {
    padding: 0 0.1rem;
    height: 0.4rem;
    font-size: 0.18rem;
    line-height: 0.4rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #3190e8;
    }
  }
}

//   热门城市
.hotCity {
  height: 1.18rem;
  margin-bottom: 0.09rem;
  h4 {
    height: 0.33rem;
    line-height: 0.33rem;
    color: #666;
    text-indent: 0.1rem;
    font-weight: 400;
    font-size: 0.14rem;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }
  .el-col {
    div {
      text-align: center;
      color: #3190e8;
      border-bottom: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      height: 0.41rem;
      line-height: 0.41rem;
      // font: .6rem/1.75rem Microsoft YaHei;
    }
  }
  //  所有城市
}
//  所有城市
.allCity {
  .allCityWrap {
    margin-bottom: 0.1rem;
    border-top: 0.01rem solid #e4e4e4;
    border-bottom: 0.01rem solid #e4e4e4;
    .grid-content {
      overflow: hidden;
      height: 0.37rem;
      line-height: 0.37rem;
      h4 {
        color: #666;
        font-weight: 400;
        text-indent: 0.1rem;
        float: left;
      }
      span {
        font-size: 0.14rem;
        color: #999;
        margin-left: 0.1rem;
      }
    }
  }
  .grid-content {
    text-indent: 0.1rem;
    height: 0.37rem;
    line-height: 0.37rem;
  }
  .cityContent {
    border-top: 0.01rem solid #e4e4e4;
    .cityName {
      color: #666;
      text-align: center;
      font-size: 0.14rem;

      // 超出显示省略号
      // overflow: hidden;
      // text-overflow:ellipsis;
      // white-space: nowrap;

      height: 0.41rem;
      line-height: 0.41rem;
      border-bottom: 0.01rem solid #e4e4e4;
      border-right: 0.01rem solid #e4e4e4;
    }
  }
}
</style>