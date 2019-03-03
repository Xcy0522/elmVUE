<template>
  <div>
    <!-- 导航条 -->
    <headCom :head="head"></headCom>
    <section class="title_on">
      <div class="content">
        <header>
          <span>我的积分</span>
          <section>
            <img
              data-v-10f76fe0
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAvJJREFUSA21Vk1IFVEU/s7MvOd/+U+pkZmEEBXiIgpq06KFYUmLFrZp0S4fFAW1ioi2RU9oFbQJCgoqQYIWEkKQixKK7IfMCnuEYvlSek99M7d77rzRGWfu06Du5s49P98599zzM4QCa3dyumlR2IeFEJ0gbJWiDXnxFATGiGggRuaj4UTNhA6GohjtfVMNcMQlgjghwc0oGY8mjdgCdAsGXRzprUt5dG8PGWjv+95FNt0WEBWe0Fp2As0KUxwf6d3Q75c3/IeO5GQCNj34W3DGUDpSV2H4QJduwJ4zuBQNGPVky+KELVUmZEgw/iOHuQXhsVbs5MAU3d5NlAGOOdnOuyjPK4oIp/aW4+iOEhlm1x/bEbj/OoO+Z3P4vRg25IbLaOM3sZR5+aBR4Ax39VAlOpriGPyYxdNP8zAl8cj2EhzbVYraMgPnBtIrbpAPl8SUjJPkpmLuc1S2dLYV4/LB9XjyIYvzj5eBLBnEuz01aKm20HNnGm8ncyEjnF0xspqNfJ5HpmJ7Y0wp9o9mAgA5Bxj+uqBo2+rcIAQE5IEdZmxDFdFKbv78fiqHh28yGJsOe9i4zvVpJhN+Aw+OsS1VoRqZe6/Y86D3rLxzYwx7NseRzjp4+c29iQca2GX1c0p65R/g6Q4t1Saud1Uq9gX5LrPzGu9cgIbInNeB15cbuNFdhdIYyeyZwfP8O+jkmc4GQv1Dp3BmXwXqy01cGfyFofECoVkGSBncFZfP+q+4fNMDrUWYSOfQP5rVC/o5ElsWJw34abpvLirTIHz5aetEQnTGLlhofg0urjppJCNbw0y24MMqtaVC42Gh+rkfLeK72CK01lpoltW7lsWYjO1mkRwW3KAKKW6q5PSswtn9q48JhSUxGU8Z4K7HwwKQrVazON+HZLMbSa2WPeS4g8edbm7/zYPysHAccU03EzS2fWRyDINOv0jUJz1iwAAT/+vIZAM8iYRptIGMm5wJTCu0lIyUZR1vivnlQzfwM//Fb8sfhhUzHMwI/u8AAAAASUVORK5CYII="
              height="14"
              width="14"
            >
            <span @click="click_()">积分说明</span>
          </section>
        </header>
        <p class="money_on">
          <span>0</span>
          <span class="yuan">分</span>
        </p>
        <div class="withdraw">积分兑换商城</div>
      </div>
    </section>
    <section class="message_">
        <p>最近30天积分纪录</p>
    </section>
    <section class="bottom_">
        <img data-v-10f76fe0="" src="data:image/png;base64,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">
        <p>最近30天无积分纪录</p>
        <h5>快去下单赚取大量积分吧</h5>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      head: {
        left:
          "<a href='javascript:history.back(-1)'><span class='iconfont icon-zuo'></span></a>",
        cont: "我的余额",
        right: ""
      }
    };
  },
  created() {},
  methods: {
      click_() {
          this.$router.push({name: 'detail1'});
      }
  }
};
</script>

<style lang="scss" scoped>
.title_on {
  padding: 0.05rem;
  padding-top: 0.5rem;
  width: 3.65rem;
  background: #3190e8;
  .content {
    padding: 0.08rem;
    border: 0.01rem solid #3190e8;
    border-radius: 0.05rem;
    background: white;
    header {
      display: flex;
      justify-content: space-between;
      font-size: 0.1rem;
      vertical-align: middle;
      section {
        display: flex;
        align-items: center;
        line-height: 0.05rem;
        color: #3190e8;
        img {
          margin-right: 0.05rem;
        }
      }
    }
    .money_on {
      width: 100%;
      font-size: 0.35rem;
      line-height: 0.46rem;
      .yuan {
          font-size: 0.16rem;
      }
    }
    .withdraw {
        width: 100%;
        height: 0.46rem;
        text-align: center;
        line-height: 0.46rem;
        border: 0.01rem solid #fe6d47;
        border-radius: 0.05rem;
        background: #fe6d47;
        color: white;
        font-size: 0.2rem;
    }
  }
}
.message_ {
    padding-left: 0.15rem;
    p {
        width: 100%;
        line-height: 0.46rem;
        font-size: 0.1rem;
    }
}
.bottom_ {
    margin-top: 0.3rem;
    text-align: center;
    img {
        width: 1.87rem;
        height: 1.17rem;
    }
    p, h5 {
        margin-top: 0.1rem;
    }
    p {
        font-size: 0.16rem;
    }
    h5 {
        font-size: 0.12rem;
        color: #999;
    }
}
</style>