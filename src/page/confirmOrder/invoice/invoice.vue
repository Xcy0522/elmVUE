<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <section class="invoice_on">
      <span class="left_on">不需要开发票</span>
      <span @click="but=!but" class="iconfont icon-dui1" :class="{'on':but}"></span>
    </section>
    <section class="bottom">
      <button @click="jump_on()" class="click_on">确定</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      but: false,
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "选择发票抬头",
        right: ""
      }
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    jump_on(){
      this.$router.push({name: 'confirmOrder'})
    }
  },
};
</script>

<style lang="scss" scoped>
.invoice_on {
  margin-top: 0.6rem;
  padding: 0 0.15rem;
  background: white;
  line-height: 0.58rem;
  font-size: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon-dui1 {
    color: #999;
  }
  .on {
    color: #4cd964;
  }
}
.bottom {
  margin-top: 0.1rem;
  padding: 0 0.15rem;
  .click_on {
    width: 100%;
    height: 0.46rem;
    line-height: 0.46rem;
    font-size: 0.2rem;
    color: white;
    border-radius: 0.05rem;
    background: #4cd964;
    outline: none;
    border: none;
  }
}
</style>
