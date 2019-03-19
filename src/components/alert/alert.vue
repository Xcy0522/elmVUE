<template>
  <!-- <div class="hello"> -->
  <div class="alert" v-if="boolean">
    <span class="iconfont icon-jinggao"></span>
    <p>{{erro}}</p>
    <div @click="boolean = !boolean">确认</div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["erro","boolean"],
  data() {
    return {
      
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.3rem;
  margin-left: -1.4rem;
  width: 2.81rem;
  height: 1.71rem;
  animation: tipMove 0.4s;
  background-color: #fff;
  padding-top: 0.3rem;
  border: 0.01rem;
  border-radius: 0.05rem;
  text-align: center;
  border-top-left-radius: 0.02rem;
  border-top-right-radius: 0.02rem;

  .icon-jinggao {
    font-size: 0.65rem;
    color: #f8cb86;
  }
  p {
    font-size: 0.14rem;
    color: #333;
    width: 0.82rem;
    height: 0.21rem;
    line-height: 0.21rem;
    text-align: center;
    margin: 0.19rem auto 0;
    padding: 0 0.1rem;
  }
  div {
    font-size: 0.14rem;
    color: #fff;
    font-weight: 700;
    margin-top: 0.19rem;
    background-color: #4cd964;
    width: 100%;
    text-align: center;
    line-height: 0.42rem;
    border: 1px;
    border-bottom-left-radius: 0.05rem;
    border-bottom-right-radius: 0.05rem;
  }
}
</style>
