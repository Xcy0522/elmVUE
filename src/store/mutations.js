import axios from 'axios'
const mutations = {
  //事件,相当于 methods ,调用 this.$store.commit('xxx')
  //调用默认传第一个参数 : state 
  increment(state) {
    state.count++
  },


  // hongbao(state) {
  //   const hongbaoUrl = "https://elm.cangdu.org/promotion/v2/users/" + this.user_id + "/hongbaos"
  //   axios({
  //     method: "get",
  //     url: hongbaoUrl,
  //     params: {
  //       limit: 20,
  //       offset: 0
  //     }
  //   }).then((res) => {
  //     console.log(res)
  //     state.hongbaoArr = res.data;
  //     state.hongbaoNum = res.data.length;
  //   })
  // }
  
}

export default mutations;