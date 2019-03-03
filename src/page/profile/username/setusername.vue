<template>
  <div class="forget">
    <headCom :head="head"></headCom>
    <section class="setname">
      <input :class="{inputErro: changeClass}" type="text" placeholder="输入用户名" v-model="inputName">
      <div>
        <p :class="{erro: changeClass}">{{warn}}</p>
      </div>
      <section class="reset">
        <button @click="changeUsername()">确认修改</button>
      </section>
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
        cont: "<span>修改用户名</span>",
        right: ""
      },
      inputName: "",
      warn: "用户名只能修改一次 (5-24字符之间)",
      changeClass: false
    };
  },
  methods: {
    changeUsername(){
      console.log("调用changeUsername.....")
      if (this.inputName.length == 0 ) {
         this.warn = "用户名长度在5到24位之间";
        this.changeClass = true;
      } else if (this.inputName.length > 4 && this.inputName.length < 24){
        localStorage.setItem("username",this.inputName);
        this.$router.push({name:'info'})
      }
       
    }
  },
  watch: {
    inputName() {
      console.log("watch调用");
      if (this.inputName.length > 4 && this.inputName.length < 24) {
        this.warn = "用户名只能修改一次 (5-24字符之间)";
         this.changeClass = false;
      } else {
        this.warn = "用户名长度在5到24位之间";
        this.changeClass = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.setname {
  margin: 0 0.093rem;
  padding-top: 0.5rem;
  input {
    width: 3.49rem;
    background-color: #f5f5f5;
    border: 0.01rem solid #ddd;
    border-radius: 0.02rem;
    padding: 0.05rem 0.023rem;
    line-height: 0.28rem;
    font-size: 0.16rem;
    outline: none;
  }
  .inputErro {
    border: 0.01rem solid #ea3106;
  }
  p {
    width: 100%;
    font-size: 0.13rem;
    color: #666;
    height: 0.14rem;
    line-height: 0.14rem;
    padding: 0.093rem 0 0.234rem;
  }
  .erro {
    font-size: 0.13rem;
    color: #ea3106;
    padding-top: 0.0234rem;
  }
  button {
    background-color: #3199e8;
    width: 100%;
    line-height: 0.46rem;
    font-size: 0.16rem;
    color: #fff;
    border: none;
    opacity: 0.8;
    transition: all 1s;
  }
}
</style>