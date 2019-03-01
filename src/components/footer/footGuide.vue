<template>
  <div class="footGuide">
    <el-row>
      <el-col :span="6">
        <router-link to="/msite" class="grid-content bg-purple">
          <span class="iconfont icon-elm" v-if="$route.name!='msite'"></span>
          <span class="iconfont icon-elm--active icon-opt" v-else></span>
          <div class="title">外卖</div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/search" class="grid-content bg-purple-light">
          <span class="iconfont icon-zhinanzhen" :class="$route.name=='search'&&'icon-opt'"></span>
          <div class="title">搜索</div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/order" class="grid-content bg-purple">
          <span class="iconfont icon-icon--copy-copy" :class="$route.name=='order'&&'icon-opt'"></span>
          <br>
          <div class="title">订单</div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/profile" class="grid-content bg-purple-light">
          <span class="iconfont icon-touxiang" v-if="$route.name=='profile'"></span>
          <span class="iconfont icon-zhaomugongyingshangshangji" v-else></span>
          <br>
          <div class="title">我的</div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "footGuide",
  data() {
    return {
      msg: "footGuide",
      tabPosition: "top",
      isopt: true
    };
  }
};
</script>

<style lang="scss" >
.footGuide {
  width: 100%;
  height: 0.457rem;
  position: fixed;
  bottom: 0rem;
  text-align: center;
  z-index: 1000;
  background-color: white;
  a {
    display: inline-block;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 0.07rem;
    color: #333;
    font-size: 0.12rem;
  }
  .el-col {
    font-size: 0.12rem;
    line-height: 0.16rem;
    .iconfont {
      font-size: 0.2rem;
      font-weight: 500;
    }
    .icon-touxiang {
      color: #3190e8;
      line-height: 0.2rem;
    }
    .icon-opt {
      color: #3190e8;
      font-weight: 700;
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
