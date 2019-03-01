<template>
  <div class="forget">
    <headCom :head="head"></headCom>
    {{msg}}
    <footGuide></footGuide>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      msg: "我是order页面..",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i></a>",
        cont: "<span>订单列表</span>",
        right: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
</style>