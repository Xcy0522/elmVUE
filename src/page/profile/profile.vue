<template>
  <div class="forget">
    <div class="forget_top">
      <headCom :head="head"></headCom>
      <header>
        <div class="headerBotton">
          <span class="iconfont icon-face"></span>
          <div class="headerLeft">
            <router-link v-if="isusername" :to="{name:'login'}" tag="p">登录/注册</router-link>
            <router-link v-else :to="{name:'info'}" tag="p">{{username}}</router-link>
            <i class="el-icon-mobile-phone"></i>
            <span>暂无绑定手机号</span>
          </div>
          <div class="iconRight">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </header>
      <!-- 中间余额 -->
      <el-row>
        <router-link :to="{name:'balance'}">
          <el-col :span="8">
            <div class="grid-content">
              <span>
                <b>0.00</b>元
              </span>
              <br>
              <span>我的余额</span>
            </div>
          </el-col>
        </router-link>
        <!-- 优惠 -->
        <router-link :to="{name:'benefit'}">
          <el-col :span="8">
            <div class="grid-content">
              <span>
                <b>{{num}}</b>个
              </span>
              <br>
              <span>我的优惠</span>
            </div>
          </el-col>
        </router-link>
        <!-- 积分 -->
        <router-link :to="{name:'points'}">
          <el-col :span="8">
            <div class="grid-content">
              <span>
                <b>0</b>分
              </span>
              <br>
              <span>我的积分</span>
            </div>
          </el-col>
        </router-link>
      </el-row>
      <!-- 中下,服务列表  -->
      <ul class="order">
        <router-link :to="{name:'order'}" tag="li">
          <span class="iconfont icon-icon--copy-copy"></span>
          <div>我的订单</div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link :to="{name:'store'}" tag="li">
          <span class="iconfont icon-gouwu"></span>
          <div>积分商城</div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link :to="{name:'vipcard'}" tag="li">
          <span class="iconfont icon-huangguan"></span>
          <div>饿了吗会员卡</div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
      <ul class="serve">
        <router-link :to="{name:'service'}" tag="li">
          <div class="icon"></div>
          <div class="word">服务中心</div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link :to="{name:'download'}" tag="li">
          <span class="iconfont icon-eliaomo"></span>
          <div class="word">下载饿了吗App</div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
    </div>
    <footGuide></footGuide>
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
        cont: "<span>我的</span>",
        right: ""
      },
      username: localStorage.getItem("username"),
      user_id: localStorage.getItem("userId"),
      isusername: true,
      num: "0"
    };
  },
  created() {
    this.getUsername();
    if (localStorage.getItem("username")) {
      this.isusername = false;
      this.$store.dispatch("hongbao", [
        this.user_id,
        (data, num) => {
          this.hongbaoArr = data;
          this.num = num;
          console.log(this.hongbaoArr);
        }
      ]);
    }
  },
  methods: {
    getUsername() {
      const urlUsername = "https://elm.cangdu.org/v1/user";
      this.$http({
        method: "get",
        url: urlUsername,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.forget_top {
  header {
    height: 0.9rem;
    background-color: #3190e8;
    padding-top: 0.45rem;
    overflow: hidden;
    .headerBotton {
      padding: 0.16rem 0.14rem;
      .icon-face {
        font-size: 0.6rem;
        color: white;
        float: left;
      }
      .headerLeft {
        width: 2.4rem;
        height: 0.48rem;
        margin-left: 0.11rem;
        float: left;
      }
      p {
        margin-top: 0.04rem;
        margin-bottom: 0.09rem;
        font-weight: 700;
        font-size: 0.18rem;
        color: #fff;
      }
      i {
        color: white;
        width: 0.11rem;
        height: 0.17rem;
      }
      span {
        margin-left: 0.05rem;
        display: inline-block;
        font-size: 0.12rem;
        color: #fff;
      }
      .iconRight {
        margin-top: 0.16rem;
        float: right;
      }
    }
  }
  .el-row {
    .el-col {
      height: 0.84rem;
      background-color: #fff;
      text-align: center;
    }
    span:first-child {
      height: 0.25rem;
      display: inline-block;
      padding: 0.2rem 0 0.11rem;
      color: #333;
      font-size: 0.14rem;
      b {
        display: inline-block;
        font-size: 0.25rem;
        color: #f90;
        font-weight: 700;
        // line-height: 1rem;
        font-family: Helvetica Neue, Tahoma;
      }
    }
    span:last-child {
      font-size: 0.14rem;
      color: #666;
      font-weight: 400;
      padding-bottom: 0.11rem;
    }
  }
  .order {
    margin-top: 0.1rem;
    background: #fff;
    li {
      overflow: hidden;
      height: 0.42rem;
      line-height: 0.21rem;
      .iconfont {
        margin-left: 0.1rem;
        font-size: 0.1.5rem;
        float: left;
        margin-top: 0.1rem;
      }
      div {
        margin-left: 0.06rem;
        width: 3rem;
        float: left;
        height: 0.21rem;
        font-weight: 400;
        line-height: 0.21rem;
        border-bottom: 1px solid #f1f1f1;
        padding: 0.1rem 0.06rem 0.1rem 0;
        font-size: 0.16rem;
        color: #333;
        display: flex;
        justify-content: space-between;
      }
      .el-icon-arrow-right {
        float: right;
        margin-top: 0.1rem;
        margin-left: 0.1rem;
      }
      .icon-gouwu {
        color: orangered;
      }
      .icon-eliaomo {
        color: yellow;
      }
    }
  }
  .serve {
    margin-top: 0.1rem;
    background: #fff;
    li {
      overflow: hidden;
      height: 0.42rem;
      line-height: 0.21rem;
      .icon {
        width: 0.163rem;
        height: 0.163rem;
        margin: 0.12rem 0 0.1rem 0.15rem;
        background-color: skyblue;
        float: left;
      }
      .iconfont {
        margin-left: 0.1rem;
        font-size: 0.1.5rem;
        float: left;
        margin-top: 0.1rem;
      }
      .word {
        margin-left: 0.06rem;
        width: 3rem;
        float: left;
        height: 0.21rem;
        font-weight: 400;
        line-height: 0.21rem;
        border-bottom: 1px solid #f1f1f1;
        padding: 0.1rem 0.06rem 0.1rem 0;
        font-size: 0.16rem;
        color: #333;
        display: flex;
        justify-content: space-between;
      }
      .el-icon-arrow-right {
        float: right;
        margin-top: 0.1rem;
        margin-left: 0.1rem;
      }
    }
  }
}
</style>