<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <div class="top_on">
      <!-- 联系人 -->
      <section class="username">
        <span class="left">联系人</span>
        <section class="right">
          <input v-model="name" type="text" placeholder="你的名字">
          <div>
            <span>
              <!-- 设置默认样式为, on :class="{'img_on':hello}"三目运算符判断是否满足 -->
              <span
                @click="hello=!hello"
                @mouseup="sex_on(1)"
                class="iconfont icon-dui1 on"
                :class="{'img_on':hello}"
              ></span>
              先生
            </span>
            <span>
              &nbsp;
              <span
                @click="hello=!hello"
                @mouseup="sex_on(2)"
                class="iconfont icon-dui1 on"
                :class="{'img_on':!hello}"
              ></span>
              女士
            </span>
          </div>
        </section>
      </section>
      <!-- 联系电话 -->
      <section class="phone_on">
        <span class="content_left">联系电话</span>
        <section class="content_right">
          <div class="phone_top">
            <input v-model="phone" type="text" placeholder="您的手机号 !">
            <img
              @click="on_()"
              data-v-13101b0b
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAHRJREFUSA1jZCAT8E59/R+m9XO2KCOMTQrNRIpiaqsdtZzaIUqUeaPBTlQwUVvRaLBTO0SJMm802IkKJmorYkSunahtOCHzRm6ck9UIAAUncnSNNiYIJTB0+ZGb4EZ9jp4W6MIfDXa6BDO6JaPBjh4idOEDAOTZCsiDM8JjAAAAAElFTkSuQmCC"
              height="20"
              width="20"
            >
          </div>
          <div class="phone_bottom">
            <input v-model="phone_on" type="text" placeholder="备选电话">
          </div>
        </section>
      </section>
      <!-- 送餐地址 -->
      <section class="room_on">
        <span class="room_left">送餐地址</span>
        <section class="room_right">
          <!-- <a href="/confirmOrder/chooseAddress/addAddress/searchAddress"> -->
          <router-link :to="{name: 'searchAddress'}">
            <input v-model="home" type="text" placeholder="小区/写字楼/学校等">
          </router-link>
          <!-- </a> -->
          <div>
            <input v-model="num" type="text" placeholder="详细地址  (如门牌号等)">
          </div>
        </section>
      </section>
      <section class="label">
        <span>标签</span>
        <input v-model="label" type="text" placeholder="无/家/学校/公司">
      </section>
      <!-- 弹窗 -->
          <section class="alter_on" v-if="button">
            <div class="alter_top">
              <span class="iconfont icon-jinggao"></span>
              <p>{{text_on}}</p>
            </div>
            <button @click="alertButton() " class="but_on">确定</button>
          </section>
    </div>
    <button @click="click_on()" class="but">确定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: false,
      phone: false,
      button: false,
      // 存储数据
      name: "", //姓名
      phone: "", //电话
      phone_on: "", //预留电话
      home: "", //地址
      num: "", //详情地址
      label: "", //标签
      sex: 1, //性别
      geohash: "", //经纬度
      tag_type: 2, //标签类型
      text_on: "",
      user_id: '',
      id: "",
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "添加地址",
        right: ""
      }
    };
  },

  created() {
    // console.log(this.$route);
    this.home = this.$store.state.location;
    this.id = localStorage.getItem("userId");
    //
    this.geohash = localStorage.getItem("geohash");
    // console.log(this.geohash);
  },
  methods: {
    on_(e) {
      let des = document.querySelectorAll(".phone_bottom");
      des[0].style.display = "block";
    },
    sex_on(index) {
      this.sex = index;
    },

    click_on() {
      if (this.tag == "家") {
        this.tag_type = 2;
      } else if (this.tag == "公司") {
        this.tag_type = 3;
        
      } else if (this.tag == "学校") {
        this.tag_type = 4;
      }
      console.log(this.tag_type, "+++");
      if (this.name == "") {
        this.button = true;
        this.text_on = "名字不能为空 !";
      } else if (this.phone == "") {
        this.button = true;
        this.text_on = "手机号格式不正确 !";
      } else if (this.home == "") {
        this.button = true;
        this.text_on = "请选择地址 !";
      } else if (this.num == "") {
        this.button = true;
        this.text_on = "请输入详细地址 !";
      } else if (this.label == "") {
        this.button = true;
        this.text_on = "标签格式错误 !";
      }   
      else if (!localStorage.getItem("username")) {
        this.button = true;
        this.text_on = " 请登录 " ;   
      } else {
        
        // console.log(this.user_id,"?????????");
        const url = "https://elm.cangdu.org/v1/users/" + this.id + "/addresses";
        this.$http({
          method: "post",
          url: url,
          data: {
            user_id: this.id, //id
            address: this.home, //地址
            address_detail: this.num, //地址详情
            geohash: this.geohash, //经纬度
            name: this.name, //姓名
            phone: this.phone, //电话
            tag: this.label, //标签
            sex: this.sex, //性别
            phone_bk: this.phone_on, //预留电话
            tag_type: this.tag_type //标签类型
          }
        }).then(res => {
          // console.log(res, "++++?????_____");
          this.$router.push({ name: "chooseAddress" });

        });
      }
    },
    alertButton(){
      this.button=!this.button;
    }
  }
};
</script>

<style lang="scss" scoped>
.top_on {
  padding: 0 0.15rem;
  margin-top: 0.5rem;
  background: white;
  position: relative;
  // 联系人
  .username {
    line-height: 0.6rem;
    border-bottom: 0.01rem solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    font-size: 0.18rem;
    .left {
      width: 1.17rem;
    }
    section {
      width: 2.4rem;
      input {
        height: 50%;
        width: 100%;
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #f5f5f5;
        outline: none;
      }
      .on {
        color: #ccc;
      }
      .img_on {
        color: #4cd964;
      }
    }
  }
  // 联系人电话
  .phone_on,
  .room_on {
    line-height: 0.6rem;
    border-bottom: 0.01rem solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    font-size: 0.18rem;
    .content_left,
    .room_left {
      width: 1.17rem;
    }
    .content_right,
    .room_right {
      width: 2.4rem;
      .phone_top {
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #f5f5f5;
      }
      input {
        width: 85%;
        height: 50%;
        font-size: 0.16rem;
        outline: none;
      }
      .phone_bottom {
        display: none;
      }
    }
  }
  // 送餐地址
  .room_right {
    div {
      border-top: 0.01rem solid #f5f5f5;
    }
  }
  .label {
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.18rem;
    span {
      display: inline-block;
      width: 1.13rem;
    }
    input {
      width: 2.26rem;
      outline: none;
      font-size: 0.16rem;
    }
  }
}
.but {
  // height: 0.5rem;
  line-height: 0.5rem;
  width: 92%;
  font-size: 0.16rem;
  color: white;
  margin: 0.15rem;
  border: 0.01rem solid #4cd964;
  border-radius: 0.1rem;
  overflow: hidden;
  outline: none;
  text-align: center;
  background: #4cd964;
}
.alter_on {
  width: 3rem;
  height: 2rem;
  position: absolute;
  top: 1.5rem;
  left: 0.35rem;
  .alter_top {
    height: 1.5rem;
    background: white;
    font-size: 0.16rem;
    text-align: center;
    padding-top: 0.1rem;
    span {
      font-size: 0.7rem;
      color: #f8cb86;
    }
    p {
      margin-top: 0.2rem;
    }
  }
  .but_on {
    width: 100%;
    height: 0.4rem;
    border: 0.01rem solid #4cd964;
    border-radius: 0.05rem;
    background: #4cd964;
    color: white;
    font-size: 0.2rem;
    font-weight: 700;
    outline: none;
  }
}
</style>
