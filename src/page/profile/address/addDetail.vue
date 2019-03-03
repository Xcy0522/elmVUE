<template>
  <div class="addDetail">
    <headCom :head="head"></headCom>
    <section class="form">
      <div>
        <input type="text" v-model="address" placeholder="请输入小区/写字楼/学校等">
        <button @click="confirm()">确认</button>
      </div>
      <div>
        <p>为了满足商家的送餐要求,建议您从列表中选择地址</p>
      </div>
    </section>
    <section class="point" v-if="isPoint">
      <p>找不到地址?</p>
      <p>请尝试输入小区/写字楼/学校等</p>
      <p>详细地址(如门牌号)可稍后输入哦。</p>
    </section>
    <section class="cityList" v-if="!isPoint">
      <ul>
        <li v-for="(value,index) in cityArr" :key="index" @click="$store.state.addCityName = value.name;$router.push({name:'add'}) ">
          <p>{{value.name}}</p>
          <p>{{value.address}}</p>
        </li>
      </ul>
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
        cont: "<span>搜索地址</span>",
        right: ""
      },
      address:"",
      isPoint: true,
      cityArr:'',
    };
  },
  created() {
  },
  methods: {
    confirm(){
      console.log(localStorage.getItem("cityid"))
      const cityUrl =" https://elm.cangdu.org/v1/pois";
      this.$http({
        method:"get",
        url: cityUrl,
        params:{
          city_id : localStorage.getItem("cityid"),
          keyword :  this.address,
        }
      }).then((res) => {
        console.log(res)
        console.log("这里......")
        this.cityArr = res.data;
        if(res.data.message || res.data.length == 0){
          this.isPoint = true;
        } else {
          this.isPoint = false;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.addDetail {
  .form {
    padding-top: 0.45rem;
    div:first-child {
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding: 0.117rem;
      input {
        display: block;
        width: 2.558rem;
        height: 0.19rem;
        padding: 0.09375rem;
        background: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 0.05rem;
        font-size: 0.14rem;
        outline: none;
      }
      button {
        display: block;
        width: 0.703rem;
        border: none;
        background: #3199e8;
        font-size: 0.16rem;
        color: #fff;
        border-radius: 5px;
        outline: none;
      }
    }
    div:last-child {
      background: #fff6e4;
      font-size: 0.14rem;
      color: #ff883f;
      text-align: center;
      padding: 0.04688rem 0;
    }
  }
  .point {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.15rem;
      color: #969696;
      margin-bottom: 0.09375rem;
    }
  }
  .cityList {
    ul {
      li {
        border-bottom: .01rem solid #ccc;
        padding: 0.09375rem;
        p {
          font-size: .15rem;
         color: #969696;
         line-height: .2rem;
        margin-bottom: .0469rem;
        }
      }
    }
  }
}
</style>