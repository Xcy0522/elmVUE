<template>
  <div>
    <headCom :head="head">

    </headCom>
    <div class="cityCounter">
      <form v-on:submit.prevent="submit">
        <div class="cityForm">
          <el-input type="text" v-model="adress" placeholder="请输入学校,商务楼,地址" required clearable></el-input>
          <br>
          <button >提交</button>
        </div>
      </form>

      <p class="searchHistory" v-if="isshow">搜索历史</p>
      <ul v-else class="searchCou">
        <li v-for="(value,index) in data" :key="index" @click="gotomsite(value.name,value.address,value.geohash)">
          <h4 class="ellipsis">{{value.name}}</h4>
          <p class="ellipsis" v-if="isP">{{value.address}}</p>
        </li>
      </ul>
      <ul class="history" v-if="Object.values($store.state.cityHis).length">
        <li v-for="(value,k,index) in this.$store.state.cityHis" :key="index" @click="gotomsite2(value[3])">
          <h4>{{k}}</h4>
          <p>{{value[1]}}</p>
        </li>
        <footer @click="clear()">清空所有</footer>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      head: {
          left:
        "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
      cont: "<span></span>",
      right: "<a href='#/home'>切换城市</a>",
      },    
      adress: "",
      data: "",
      isshow: true,
      isP: true,
      cityArr:[],
    };
  },
  created() {
    // 获取action里面的请求
    this.$store.dispatch("getCity",()=> {
       this.head.cont = "<span>" + this.$store.state.city.name + "</span>";
    });
  },
  methods: {

    submit() {
      this.issubmit = true;
      if (this.adress && this.issubmit) {
        const urlSearchAdress = "https://elm.cangdu.org/v1/pois";
        this.$http({
          method: "get",
          url: urlSearchAdress,
          params: {
            city_id: this.$route.params.id,
            keyword: this.adress
          }
        }).then(res => {
          // console.log(res);
          if (res.data.length !== 0) {
            this.data = res.data;           
            this.isP = true;
            this.isshow = false;
            this.ishis = false;
          } else {
            this.data = [{ name: "很抱歉,无搜索结果" }];
            this.isshow = false; 
            this.isP = false;
          }
        });
      }
    },
    gotomsite(name,address,geohash){
      // 把cityArr数组的第一个值作为对象的key值,去重
      this.cityArr = [name,address,geohash];
      this.$store.state.cityHis[name] = this.cityArr;

      this.$store.state.city = {name:name,address:address,geohash:geohash}  
      
      localStorage.setItem("name" , name);
      localStorage.setItem("address" , address);
      localStorage.setItem("geohash" , geohash);    

      this.$router.push({name:"msite",query:{geohash}})
    },
    gotomsite2(geohash){      
      // localStorage.setItem("name" , name);
      // localStorage.setItem("address" , address);
      localStorage.setItem("geohash" , geohash); 
      this.$router.push({name:"msite",query:{geohash}})
    },
    clear(){
      this.ishis = false;
      this.$store.state.cityHis = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.cityCounter {
  padding-top: 0.55rem;
  .cityForm {
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding: 0.1rem 0.19rem 0;
    input {
      border: 1px solid #e4e4e4;
      padding: 0 0.07rem;
      width: 100%;
      height: 0.32rem;
      font-size: 0.18rem;
      box-sizing: border-box;
      margin-bottom: 0.09rem;
      color: #333;
    }
    button {
      width: 100%;
      height: 0.32rem;
      border: none;
      outline: none;
      border-radius: 0.02rem;
      background-color: #3190e8;
      font-size: 0.2rem;
      color: #fff;
      margin-bottom: 0.09rem;
    }
  }
  .searchHistory {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-left: 0.11rem;
    font-size: 0.14rem;
    height: 0.18rem;
    line-height: 0.18rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }
  .searchCou {
    list-style: none;
    font-style: normal;
    text-decoration: none;
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    li {
      padding-top: 0.15rem;
      margin: 0 auto;
      border-bottom: 1px solid #e4e4e4;
      h4 {
        margin: 0 auto 0.08rem;
        width: 90%;
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #333;
      }
      p {
        width: 90%;
        margin: 0 auto 0.13rem;
        font-size: 0.12rem;
        height: 0.16rem;
        line-height: 0.16rem;
        color: #999;
      }
    }
  }
  .history {
    background-color: #fff;
    border-top: 0.01rem solid #e4e4e4;
    li {
      margin: 0 auto;
      padding-top: 0.15rem;
      border-bottom: 0.01rem solid #e4e4e4;
      h4 {
        margin: 0 auto 0.19rem;
        width: 90%;
        font-size: 0.16rem;
        color: #333;
      }
      p {
        width: 90%;
        margin: 0 auto 0.19rem;
        font-size: 0.13rem;
        color: #999;
      }
    }
    footer {
      font-size: 0.14rem;
      color: #666;
      text-align: center;
      line-height: .46rem;
      background-color: #fff;
    }
  }
}
</style>
