<template>
  <div class="search">
    <headCom :head="head"></headCom>
    <section class="form">
      <el-input type="text" v-model="food" placeholder="请输入商家或美食名称" required clearable></el-input>
      <button @click="search(food,geohash)">提交</button>
    </section>
    <!-- 搜索商家 -->
    <section class="show" v-if="food != 0 && storeArr.length != 0 ">
      <h4>商家</h4>
      <ul>
        <li  v-for="(value,index) in storeArr" :key="index" @click="gotoFood(value.id)">
          <div class="storeImg">
            <img :src="'http://elm.cangdu.org/img/' + value.image_path" alt>
          </div>
          <div class="storeItem">
            <p>
              <span>{{value.name}}</span>
            </p>
            <p>月售 {{value.recent_order_num}} 单</p>
            <p>20元起送 / 距离{{value.distance}}公里</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- 搜索历史 -->
    <section class="searchHis" v-if="food == 0 && Object.keys($store.state.searchStoreHis).length">
      <h4>搜索历史</h4>
      <ul>
        <li v-for="(value,key,index) in this.$store.state.searchStoreHis" :key="index" >
          <span @click="search(value,geohash)">{{value}}</span>
          <i class="el-icon-close" @click="delect(value)"></i>
        </li>
      </ul>
      <footer @click="claerHis()">清空搜索历史</footer>
    </section>
    <!-- 无搜索结果 -->
    <section class="erro" v-if="food != 0 && erro">很抱歉,无搜索结果</section>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      head: {
        left:
          "<a href='#/search'><span class='iconfont icon-sousuo'></span></a>",
        cont: "<p>搜索</p>",
        right: ""
      },
      food: "",
      geohash: localStorage.getItem("geohash"),
      storeArr: "",
      erro: false,
    };
  },
  created() {
    console.log(
      // localStorage.getItem("name"),
      // localStorage.getItem("address"),
      // localStorage.getItem("geohash"),
      
      this.$store.state.searchStoreHis
    );
  },
  methods: {
    search(food,geohash1) {    
      this.food = food;    
      food&&(this.$store.state.searchStoreHis[food] = food);
      // food||(this.$store.state.searchStoreHis[food] = food);
      console.log( this.$store.state.searchStoreHis);
      const searchUrl = "https://elm.cangdu.org/v4/restaurants";
      this.$http({
        method: "get",
        url: searchUrl,
        params: {
          geohash: geohash1,
          keyword: food
        }
      }).then(res => {
        console.log(res);
        this.storeArr = res.data;
        console.log(this.storeArr.length)
        if (res.data.length) {
          this.erro = false;
        } else {
          this.erro = true;
        }
      });      
    },
    gotoFood(id) {
       this.$router.push({name:'shop',query:{id:id}})
    },
    claerHis() {
    this.$store.state.searchStoreHis.length = 0;
    this.$store.state.searchStoreHis = {};
    },
    delect(value){
      // food 是自己在 state.JS 中的searchStoreHis 里面增加的属性,,删除自己增加的(不是在data中定义的属性)时,是不会触发更新的,可以通过更改地址触发更新
      let olddata = this.$store.state.searchStoreHis;
      delete olddata[value];
      this.$store.state.searchStoreHis = {...olddata};
    }
  } 
};
</script>
<style lang="scss" scoped>
.search {
  section.questionDetail_cont {
           padding-top: .45rem;
  }
  .form {
    padding: 0.57rem 0.12rem 0.12rem;
    background-color: #fff;
    div {
      height: 0.34rem;
      width: 2.55rem;
    }
    input {
      border: 0.01rem solid #e4e4e4;
      font-size: 0.16rem;
      color: #333;
      height: 0.34rem;
      width: 2.569rem;
      outline: none;
      border-radius: 0.03rem;
      background-color: #f2f2f2;
      font-weight: 700;
      padding: 0 0.06rem;
    }
    button {
      width: 0.64rem;
      height: 0.34rem;
      border: 0.02rem solid #3190e8;
      margin-left: 0.05rem;
      font-size: 0.18rem;
      color: #fff;
      border-radius: 0.04rem;
      background-color: #3190e8;
      font-weight: 700;
      padding: 0 0.06rem;
    }
  }
  .show {
    h4 {
      font-size: 0.14rem;
      line-height: 0.46rem;
      text-indent: 0.2rem;
      font-weight: 700;
      color: #666;
    }
    ul {
      background-color: #fff;
      li {
        padding: 0.117rem;
        border-bottom: 0.0057rem solid #e4e4e4;
        overflow: hidden;
        .storeImg {
          width: 0.4rem;
          margin-right: 0.06rem;
          float: left;
          img {
            width: 0.4rem;
          }
        }
        .storeItem {
          padding-bottom: 0.06rem;
          border-bottom: 0.0057rem solid #e4e4e4;
          float: left;
          p {
            line-height: 0.21rem;
            font-size: 0.14rem;
            color: #333;
            font-weight: 400;
            font-family: Microsoft Yahei;
          }
        }
      }
    }
  }
  .searchHis {
    h4 {
      font-size: 0.14rem;
      line-height: 0.46rem;
      text-indent: 0.2rem;
      font-weight: 700;
      color: #666;
    }
    ul {
      background-color: #fff;
      li {
        padding: 0 0.117rem;
        border-bottom: 0.0057rem solid #e4e4e4;
        align-items: center;
        overflow: hidden;
        span {
          display: inline-block;
          width: 80%;
          height: 0.46rem;
          line-height: 0.46rem;
        }
        i {
          font-weight: 800;
          font-size: 0.27rem;
          margin-top: 0.1rem;
          float: right;
        }
      }
    }
    footer {
      height: 0.46rem;
      line-height: 0.46rem;
      background-color: #fff;
      color: #3190e8;
      font-weight: 700;
      text-align: center;
    }
  }
  .erro {
    margin-top: 0.029rem;
    height: 0.41rem;
    line-height: 0.41rem;
    text-align: center;
    font-size: 0.14rem;
    color: #333;
    background-color: #fff;
    text-align: center;
  }
}
</style>
