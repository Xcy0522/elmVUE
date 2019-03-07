<template>
  <div class="wrap">
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <div class="wrap_on">
      <div class="search_on">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="mes">
        <button @click="click_on()">搜索</button>
      </div>
      <div v-if="!show" class="text_on">
        <p>找不到地址?</p>
        <p>尝试输入小区、写字楼或学校名</p>
        <p>详细地址 (如门牌号等) 可稍后输入哦</p>
      </div>
      <ul v-else>
        <li v-for="(con, index) in text_con" :key="index" @click="on_name(con)">
          <h4>{{con.name}}</h4>
          <p>{{con.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      mes: "",
      text_con: "",
      id: "",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "搜索",
        right: ""
      }
    };
  },
  created() {
    console.log(this.$route);
    this.id = sessionStorage.cityId
  },
  methods: {
    // 点击提交
    click_on() {
        this.show=!this.show;
        this.$http({
            method: "get",
            url: "https://elm.cangdu.org/v1/pois?city_id="+this.id+"&keyword="+ this.mes
        }).then(res=>{
            console.log(res);
            this.text_con = res.data;
        })

    },
    on_name(con) {
      this.$store.state.location = con.name;
      this.$router.push({name:'addAddress'});
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
//   height: 7rem;
  background: white;
  padding-bottom: 3.5rem;
  .wrap_on {
    margin-top: 0.5rem;
    .search_on {
      padding: 0.15rem;
      input {
        font-size: 0.16rem;
        color: #999;
        background-color: #f1f1f1;
        margin-right: 0.1rem;
        height: 0.4rem;
        border-radius: 0.05rem;
        padding-right: 0.5rem;
        padding-left: 0.1rem;
        outline: none;
      }
      button {
        height: 0.4rem;
        font-size: 0.16rem;
        color: #fff;
        background-color: #3190e8;
        border-radius: 0.05rem;
        outline: none;
        border: none;
        padding: 0 0.2rem;
      }
    }
    .text_on {
      margin-top: 2rem;
      text-align: center;
      color: #aaa;
      font-size: 0.13rem;
    }
    ul {
      padding: 0.15rem;
    //   display: none;
      li {
        padding: 0.15rem 0;
        border-bottom: 0.01rem solid #f5f5f5;
        line-height: 0.3rem;
        h4 {
          font-size: 0.2rem;
        }
        p {
          font-size: 0.15rem;
          color: #999;
        }
      }
    }
  }
}
</style>
