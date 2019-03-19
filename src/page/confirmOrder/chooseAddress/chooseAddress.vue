<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <section class="top_on_on">
      <ul class="con_on" v-if="con.length!=0">
        <li v-for="(con, index) in con" :key="index" @click="userInfo(con, index)" >
          <span class="iconfont icon-dui1 on" :class="{img_on:select==index}"></span>
          <div class="message">
            <header>
              <span class="name_on">{{con.name}}</span>
              <span class="age_on">{{con.sex}}</span>
              <span class="phone_on">{{con.phone}}</span>
            </header>
            <div class="botoom_on">
              <span :style="{backgroundColor:setbagcolor(con)}">{{con.tag}}</span>
              <p>{{con.address}}</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- a链接, 点击添加 -->
    </section>
    <a class="click_on" href="#/confirmOrder/chooseAddress/addAddress">
      <img
        data-v-a8946476
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABCFJREFUWAnNmUtsU0cUhs9cQkKCAwgJpxgJqWqXEQS84CHaIpZsKAhKu2JNUwISsAWFLSBBxGPNihYqqmxYIqCIx8I8qi5bIVXCYLdSW2ISHIiH84091sW5wQ8w10e69r3jmTnfnczj/CdGWrT0WO6zkpVt2jwt1qbEmJTec2FZLctqWVbvM4GR8czIwJ/ulyY/TDP1N56fSE5NT/5gxG63VgabaWuM/G7F/NLb3Xfm9t7+fKNtGwLcfDafeP7aHrQih3RkEnTevyCwX37aY9av7JZP+ufJsoWBu7SO/POiJH/r9WxiRu7+NS03HxftxMtS2ZcxBb05sajLnLw+nCzUA60LuHYst0NH65yCDdDZls8XyLer+2TNivkyr27rsvsZpX7w5JX8+GhSrv3xslxoTE5H9fv7IwNXygXRn3O6sNaa9Fj+iPZ9VOHMUKpbDmxKyKrl86N7arD0t6ev5NStgjzMTovOUasAo5mR5DGj91FdRAJuuGR7i9n8BSt2VxAYe/CLhPluqC+qfctlFx9OyslfC7ZUsjqQ5nJPKrnnzjdmqrbDoLaAkfNwiZ7Ant225IPD4ZMXpm98MBDOp/qu5ZkFWP6z2l00vLB7qVmni6BdRt/48JD4rvX1FnFlQfys+5Z7u3bChUHu6UofHv/P6r6q01J2hhdOdQTZSiqr1TDnWoFbezonXM0avvDJYoQBFt9HFZB9jq2E1fqhF4R39q5vfOIbBsdSqewAOSF0dA9RxlYSl3nfsMAEhwMsFqf2KXmCTfh997n3eTl8wwALR2oV0JrS1zxwQsRtnoHzHpaAqEQn5iBnK8dX3AYDLDDBFlRCJvlKD/5Gz9Z2vgQMsOADNuZgmodWthXatcNCLOlAJ6QLMgmZOsWqLMoWVCJhF8t1CiCxpTON0rv0xo1gtTCCstnTodH69/e7EHOWxxBLSoMpcXGY+5hVNZ4CzwJblwY4TxWxnzB95ZLoeTjXm9bi+5FrtH5te/8MCwYbiwTl5TQE351g6BlnysYicYAInE6xKouysVwygBGTdYqhBCuWUckh4zzcUGmI+orbYECmwgFbgOJHVKNbkYZxGwywwASb2xFR/IChW+M2z+CZHCDpCF0sBUQ1ujUuw7cT9srimBTEAZIr0fDhBGCI6rjM+4bF528cIEDkSnQUcyh+RPXHNnxWsg05x1IBcHGXh+lo2QkkelSJR0lHHL76v338b/s3b3zgq5wCkdGwJobprRGkwCWNTud/Ih2B4j++dXFLGpm+6hmHA3CFom4rmp/J7E/urk0iVeeg74wKJHJoQEMUfzvmJH3St4dzPiMyXLNG0IN2dPrNQ/LdsQnMMORcKWDUFwInnAKmHeGSTwEzzzjn25YCDoOSjiALgdBHt4Z/q3fP2dq2JHqU84/1b4g3B4s+pKLE0ioAAAAASUVORK5CYII="
        height="24"
        width="24"
      >
      <span>&nbsp;新增收货地址</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: false,
      user_id: "",
      con: [],
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "选择地址",
        right:
          "<a href='#/login'>登录/注册</a>"
      }
    };
  },
  created() {
    // console.log(this.$route);
    if(localStorage.getItem("username")) {
       this.head.right = " <a href='#/profile'><span class='iconfont'>&#xe60e;</span></a>"
    }
    this.user_id = localStorage.getItem("userId");
    this.end_on();
    
  },
  methods: {
    userInfo(v, index) {
      this.select=index;
      //vuex
      // this.$set(this.$store.state,'content_on',v);
      this.$store.state.content_on = v;
      this.$router.push({name: 'confirmOrder'});
    },
    end_on() {
    //  " https://elm.cangdu.org/v1/users/:user_id/addresses"
    //  console.log(this.user_id)
      const url = "https://elm.cangdu.org/v1/users/" + this.user_id + "/addresses";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        console.log(res,"con.....");
        this.con = res.data;
      });
    },
    setbagcolor(value){
      if (value.tag == "家") {
       return '#ff5722';
      } else if (value.tag == "公司") {
       return 'rgb(76, 217, 100)';
        
      } else if (value.tag == "学校") {
       return 'rgb(49, 144, 232)';
      }else{
        return '#ff5722';
      }
    },
    // clear() {
    //   const url = "https://elm.cangdu.org/v1/users/:user_id/addresses/:address_id"
    // }
  }
};
</script>

<style lang="scss" scoped>
.top_on_on {
  padding-top: 0.5rem;
  .con_on {
    line-height: 0.3rem;

    li {
      padding: 0.15rem;
      border-bottom: 0.01rem solid #f5f5f5;
      display: flex;
      align-items: center;
      position: relative;
    }
    .on {
      opacity: 0;
    }
    .img_on {
      font-size: 0.2rem;
      color: #4cd964;
      opacity: 1;
    }
    .message {
      margin-left: 0.1rem;
      display: inline-block;
      .name_on {
        font-size: 0.18rem;
        font-weight: 700;
      }
      .age_on {
        font-size: 0.15rem;
        font-weight: 400;
      }
    }
    .botoom_on {
      span {
        border-radius: 0.05rem;
        color: white;
      }
      p {
        display: inline-block;
      }
    }
    .onClick {
      margin-right: .3rem;
      position:absolute;
      right: 0;
      background: white;
      font-size: 0.2rem;
      line-height: 0.3rem;
      width: 0.3rem;
      border-radius: 0.5rem;
      outline: none;
      border: none;
    }
  }
}
.click_on {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 0.5rem;
  text-align: center;
  background: white;
  color: #3190e8;
}
</style>
