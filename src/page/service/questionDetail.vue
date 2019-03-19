<template>
  <div class="questionDetail">
     <headCom :head="head"></headCom>
     <section class="questionDetail_cont">
        {{ content}}
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
        cont: "超级会员权益说明",
        right: ""
      },
      content: this.$store.state.questionDetail,    
    };
  },
  created() {
   
  },
  methods: {
   
  }
} 
</script>

<style lang="scss" scoped>
   .questionDetail {
       section.questionDetail_cont {
           padding-top: .45rem;
       }
   }
</style>