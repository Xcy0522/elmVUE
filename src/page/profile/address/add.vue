<template>
  <div class="forget">
    <headCom :head="head"></headCom>
    <form>
      <section class="formInput">
        <div>
          <input
            class="common"
            v-model="name"
            type="text"
            placeholder="请填写你的姓名"
          >
        </div>
        <div>
          <router-link :to="{name:'addDetail'}">
            <input class="common" type="text" v-model="address" placeholder="小区/写字楼/学校等 ">
          </router-link>
        </div>
        <div>
          <input class="common" type="text" v-model="detailAddress" placeholder="请填写详细送餐地址">
        </div>
        <div>
          <input :class="{commonErro: iszhengze  }" class="common" type="text" v-model="phone" placeholder="请填写能够联系到你的手机号">
          <p v-if=" iszhengze">{{phoneErro}}</p>
        </div>
        <div>
          <input :class="{commonErro: iszhengze1 }" class="common" type="text" v-model="optionalPhone" placeholder="备用联系电话(选填)">
          <p v-if=" iszhengze1">{{optionalPhoneErro}}</p>
        </div>
      </section>
      <section class="addButton">
        <button @click="addAddress()">新增地址</button>
      </section>
    </form>
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
        cont: "<span>新增地址</span>",
        right: ""
      },
      // name: this.$store.state.newAddress.name,
      name:'',
      address: this.$store.state.addCityName,
      detailAddress: "",
      phone: "",
      optionalPhone: "",
      phoneErro: "",
      iszhengze: false,
      optionalPhoneErro: "",
      iszhengze1: false
    };
  },
  created() {},
  watch: {
    phone() {
      var reg = /^1[3456789]\d{9}$/;
      console.log('aaa')
      if (this.phone.length == 0) {
        this.phoneErro = "电话不能为空";
        this.iszhengze = true;
        console.log('bb')
      }
      else if (!reg.test(this.phone)) {
        console.log("不符合正则");
        this.phoneErro = "请输入正确的手机号";
        this.iszhengze = true;
      } else {
        this.iszhengze = false;
      }
      
    },
    optionalPhone() {
      var reg = /^1[3456789]\d{9}$/;
      
      if (!reg.test(this.optionalPhone)) {
        console.log("不符合正则");
        this.optionalPhoneErro = "请输入正确的手机号";
        this.iszhengze1 = true;
      } else {
        this.iszhengze1 = false;
      }
      if (this.optionalPhone.length == 0) {
        this.optionalPhoneErro = "电话不能为空";
        this.iszhengze1 = true;
      }
    }
  },
  methods: {
    addAddress() {
      console.log(this.$store.state.addAddress);
      this.$store.state.newAddress = {
        name: this.name,
        address: this.address,
        detailAddress: this.detailAddress,
        phone: this.phone,
        optionalPhone: this.optionalPhone
      };
      this.$store.state.addAddress.push(this.$store.state.newAddress);
      console.log(this.$store.state.addAddress);
      this.$router.push({ name: "address" });
    }
  }
};
</script>

<style lang="scss" scoped>
.forget {
  form {
    padding-top: 0.5rem;
    .formInput {
      background: #fff;
      padding-top: 0.08376rem;
      div {
        padding-bottom: 0.09375rem;
        .common {
          display: block;
          width: 3.35rem;
          font-size: 0.14rem;
          margin: 0 auto;
          padding: 0.07031rem;
          background: #f2f2f2;
          border: 0.01rem solid #ddd;
          border-radius: 0.03rem;
          outline: none;
        }
        .commonErro {
           border: 0.01rem solid #ea3106;
        }
        p {
          font-size: 0.14rem;
          color: #ea3106;
          padding-left: 0.12rem;
          margin-top: 0.05rem;
        }
      }
    }
    .addButton {
      margin: 0.14rem auto;
      width: 3.52rem;

      line-height: 0.38rem;
      text-align: center;
      background: #4cd964;
      border-radius: 0.03rem;
      button {
        width: 100%;
        font-size: 0.15rem;
        color: #fff;
        line-height: 0.38rem;
        background: none;
        font-weight: 700;
        opacity: 0.8;
        border: none;
        outline: none;
      }
    }
  }
}
</style>