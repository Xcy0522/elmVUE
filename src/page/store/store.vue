 <template>
  <div class="forget">
    <headCom :head="head"></headCom>
     {{msg}}
    <h1>请重新进入商城</h1>

  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      msg: "我是store页面..",
       head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>商城</span>",
        right: ""
      }
     
    };
  },
  created() {
   
  },
  methods: {
   
  }
} 
</script>

<style lang="scss" scoped>
h1,.forget {
  padding-top:.45rem; 
  line-height: 0.4rem;
  text-align: center;
}
</style>