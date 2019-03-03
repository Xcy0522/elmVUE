<template>
  <div class="address">
    <headCom :head="head"></headCom>
    <section class="redactAddress">
      <ul>
        <li v-for="(value,index) in this.$store.state.addAddress" :key="index">
          <div class="liLeft" >
            <p>{{value.name}}</p>
          <p>{{value.phone}}</p>
          </div>
          <div class="delect" @click="delect(index)">X</div>
        </li>
        
      </ul>
      <div class="newAddress" @click="$router.push({name:'add'})">
        <span>新增地址</span>
        <i class="el-icon-arrow-right"></i>
      </div>
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
        cont: "<span>编辑地址</span>",
        right: "<span>编辑</span>"
      }
    };
  },
  created() {
    console.log(this.$store.state.addAddress)
  },
  methods: {
    delect(index){
      this.$store.state.addAddress.splice(index,1);
    }
  }
};
</script>

<style lang="scss" scoped>
.redactAddress {
  padding-top: 0.5rem;
  width: 100%;
  border-top: 0.01rem solid #d9d9d9;
  border-bottom: 0.01px solid #d9d9d9;
  li {
    height: 0.42rem;
    font-size: 0.14rem;
    background: #fff8c3;
    border-bottom: 1px solid #d9d9d9;
    padding: 0.09375rem;
    overflow: hidden;
    .liLeft {
      float: left;
      p {
      line-height: 0.21rem;
      font-size: 0.14rem;
      color: #333;
    }
    }
    .delect {
      float: right;
      font-size: .14rem;
      margin-top: .14rem;
    }    
  }
  .newAddress {
    height: .33rem;
    line-height: .33rem;
    font-size: .16rem;
    color: #333;
    margin-top: .09375rem;
    background: #fff;
    padding: .04688rem .09375rem;
    border-top: .01rem solid #d9d9d9;
    border-bottom: .01rem solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    .el-icon-arrow-right {
      font-size: .18rem;
      font-weight: 600;
      color: rgb(216, 216, 216);
      margin-top: .08rem;
    }
  }
}
</style>