<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <section class="remark">
      <header>快速备注</header>
      <ul>
        <li>
          <span @click="select=1" class="left_top" :class="{'on':select==1}">不要辣</span>
          <span @click="select=2" class="content_span" :class="{'on':select==2}">少点辣</span>
          <span @click="select=3" class="right_top" :class="{'on':select==3}">多点辣</span>
        </li>
        <li class="num1">
          <span @click="select2=!select2" :class="{'on':select2}">不要香菜</span>
        </li>
        <br>
        <li class="num2">
          <span @click="select3=!select3" :class="{'on':select3}">不要洋葱</span>
        </li>
        <li class="num3">
          <span @click="select4=!select4" :class="{'on':select4}">多点醋</span>
        </li>
        <li class="num4">
          <span @click="select5=!select5" :class="{'on':select5}">多点葱</span>
        </li>
        <br>
        <li>
          <span @click="select6=!select6" class="left_on" :class="{'on':select6}">去冰</span>
          <span @click="select6=!select6" class="right_on" :class="{'on':!select6}">少冰</span>
        </li>
      </ul>
    </section>
    <!-- 备注留言 -->
    <section class="bottom_con">
      <header>其他备注</header>
      <textarea id="" cols="40" rows="7" placeholder="请输入备注内容(可不填)" v-model="remarks"></textarea>
    </section>
    <section class="but_but">
      <button @click="on()">确定</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: false,
      select1: false,
      select2: false,
      select3: false,
      select4: false,
      select5: false,
      select6: false,
      select7: false,
      con: [],
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "订单备注",
        right: ""
      },
      remarks:'',
    };
  },
  created() {
    console.log(this.$route);
    this.remark_on();
  },
  methods: {
    remark_on() {
      const url = "https://elm.cangdu.org/v1/carts/1/remarks";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        // console.log(res);
      });
    },
    on() {
      let aa = this.totalPrice();
      this.$store.state.description = aa;
      this.$router.push({name: 'confirmOrder'});
    },
    totalPrice (){
      var totalP = '';
      if(this.select==1){
        totalP+='不要辣,';
      }
      if(this.select==2){
        totalP+='少要辣,';
      }
      if(this.select==3){
        totalP+='多要辣,';
      }
      if(this.select2){
        totalP+='不要香菜,';
      }
      if(this.select3){
        totalP+='不要洋葱,';
      }
      if(this.select4){
        totalP+='不要醋,';
      }
      if(this.select5){
        totalP+='多点葱花-';
      }
      if(this.select6){
        totalP+='去冰-';
      }else{
        totalP+='少冰-';
      }
      totalP+=this.remarks
      return totalP;
    }
  }
};
</script>

<style lang="scss" scoped>
.remark {
  margin-top: 0.6rem;
  padding: 0 0.15rem 0.2rem;
  background: white;
  header {
    height: 0.46rem;
    line-height: 0.46rem;
  }
  ul {
    height: 1.37rem;
    line-height: 0.35rem;
    li {
      display: inline-block;
      margin-bottom: 0.1rem;
      margin-right: 0.15rem;
      font-size: 0;
      span {
        border: 0.01rem solid #3190e8;
        padding: 0.05rem 0.06rem;
        font-size: 0.16rem;
      }
      .on {
        background: #3190e8;
        color: white;
      }
      .left_top,
      .left_on {
        border-top-left-radius: 0.05rem;
        border-bottom-left-radius: 0.05rem;
      }
      .right_top,
      .right_on {
        border-top-right-radius: 0.05rem;
        border-bottom-right-radius: 0.05rem;
      }
      .content_span {
        border-left: none;
        border-right: none;
      }
      .left_on {
        border-right: none;
      }
    }
    .num1,
    .num2,
    .num3,
    .num4 {
      span {
        border-radius: 0.05rem;
      }
    }
  }
}
.bottom_con {
  margin-top: 0.1rem;
  background: white;
  padding: 0 0.15rem 0.2rem;
  header {
    line-height: 0.46rem;
  }
  textarea {
    padding: 0.1rem;
    border: 0.01rem solid #eee;
    border-radius: 0.05rem;
    background: #f9f9f9;
    font-size: 0.15rem;
    color: #666;
    outline: none;
  }
}
.but_but {
  padding: 0 0.15rem;
  button {
    width: 100%;
    height: 0.46rem;
    background: #4cd964;
    color: white;
    font-size: 0.16rem;
    border-radius: 0.05rem;
    outline: none;
    border: none;
  }
}
</style>
