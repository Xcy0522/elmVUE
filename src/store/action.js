
import axios from 'axios'

const actions = {
    //异步请求...
    //城市信息
    getCity(context, cb){
      const url = "https://elm.cangdu.org/v1/cities/" + context.state.cityId;
      axios({
        method: "get",
        url
      }).then(response => {
        console.log(response.data);
        //这里使用了ES6的语法
        // console.log(response); //请求成功返回的数据;
        context.state.city = response.data;
        cb();
        // city.head.cont = "<span>" + context.state.city.name + "</span>";
      });
    },

    // copy第二中方法,传入this作为第二个参数

  // getCity(context, city1) {
  //   const url = "https://elm.cangdu.org/v1/cities/" + context.state.cityId;
  //   axios({
  //     method: "get",
  //     url
  //   }).then(response => {
  //     console.log(response.data);
  //     //这里使用了ES6的语法
  //     // console.log(response); //请求成功返回的数据;
  //     context.state.city = response.data;
  //     // cb();
  //     city1.head.cont = "<span>" + context.state.city.name + "</span>";
  //   });
  // },




    // 获取红包
  hongbao(context,userId) {
    const hongbaoUrl = "https://elm.cangdu.org/promotion/v2/users/" + userId[0] + "/hongbaos"
    axios({
      method: "get",
      url: hongbaoUrl,
      params: {
        limit: 20,
        offset: 0
      }
    }).then((res) => {
      console.log(res)
      // context.state.hongbaoArr = {...res.data};
      context.state.hongbaoNum = res.data.length;
      userId[1](res.data,res.data.length)
    })
  },



    //示例..参数Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment(context) {
            context.commit('increment');
            const url = "https://elm.cangdu.org/v1/cities";
            axios({
                method: "get",
                url,
                params: {
                  type:"guess"
                }
              }).then(response => {
                //这里使用了ES6的语法
                console.log(response); //请求成功返回的数据;
                // context.state.city=response.data;
              });
    }
}


export default actions;