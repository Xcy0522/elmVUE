<template>
  <div class="wrap_top">
    <headCom :head="head"></headCom>
    <!-- 在线客服 -->
    <div class="service_content">
      <div class="left">
        <p>
          <span class="iconfont icon-face"></span>
          <br>在线客服
        </p>
      </div>
      <div class="right">
        <p>
          <span class="iconfont icon-biao"></span>
          <br>在线客服
        </p>
      </div>
    </div>
    <!-- 热门问题  -->
    <h4 class="problem">热门问题</h4>
    <div class="vip">
<<<<<<< HEAD
      <section class="showDel">       
          <ul class="wrap">
            <li class="queDetail" v-for="(v,i) in Object.values(con).length/2" :key="i"  >
              <div style="display: inline-block" v-if='(Object.values(con)[2*(v-1)-1]!=Object.values(con)[2*v-1])' @touchend="gotoDetail(Object.values(con)[2*v])">
                {{Object.values(con)[2*v-1]}}  <span class="iconfont icon-you"></span>
=======
      <section>       
          <ul>
            <li v-for="(v,i) in Object.values(con).length/2" :key="i"   v-show='(Object.values(con)[2*(v-1)-1]!=Object.values(con)[2*v-1])' @touchend="gotoDetail(Object.values(con)[2*v])">
              <div style="display: inline-block">
                {{Object.values(con)[2*v-1]}}                
>>>>>>> 2e7dab203563a268f90253dca9a6739aa984dbd3
              </div>
            </li>
          </ul>        
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      con: {},
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "服务中心",
        right: ""
      }
    };
  },
  created() {
    this.service_on();
  },
  methods: {
    service_on() {
      const url = "https://elm.cangdu.org/v3/profile/explain";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        // 删除index属性
        delete res.data.index;//js方法
        this.$set(this,'con',res.data);         
        console.log(this.con,"..................") 
      });
    },
    gotoDetail(canshu){
      console.log(canshu)
      this.$store.state.questionDetail = canshu;      
      this.$router.push({name:'questionDetail'})
    }
  }
};
</script>

<style lang="scss" scoped>
.service_content {
  margin-top: 0.5rem;
  height: 1rem;
  border-bottom: 0.01rem solid #f5f5f5;
  background: white;
  text-align: center;
  p {
    margin-top: 0.2rem;
  }
  .left {
    float: left;
    width: 50%;
    height: 100%;
    border-right: 0.01rem solid #f5f5f5;
  }
  .right {
    width: 49%;
    height: 100%;
    float: right;
  }
}
.problem {
  height: 0.71rem;
  line-height: 0.71rem;
  font-size: 0.18rem;
  background: white;
  border-bottom: 0.01rem solid #f5f5f5;
  padding-left: 0.15rem;
}
.vip {
  .showDel {
    .wrap {
      line-height: 0.47rem;
      font-size: 0.13rem;
      color: #666;
      background: white;
      .queDetail {
        border-bottom: 0.01rem solid #f5f5f5;
        padding: 0 0.15rem;
      }
    }
  }
}

</style>
