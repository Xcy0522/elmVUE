<template>
  <div class="invoiceRecord">
     <headCom :head="head"></headCom>
     <section>
      <h4>没有购买记录</h4> 
     </section>
     {{msg}}
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      msg: "我是购买记录页面..",
       head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>购买记录</span>",
        right: ""
      },
     
    };
  },
  created() {
   
  },
  methods: {
   
  }
} 
</script>

<style lang="scss" scoped>
section {
  padding-top: .45rem;
}
</style>