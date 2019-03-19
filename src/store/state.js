const state = {
    username:"", // 用户名
    // userId:"", // 用户id存在localStorage
    city:{
      name:'郑州'
    }, // 城市列表数组
    // geohash:
    userInfo:{},
    cityId:'32', // 当前选择城市的id
    cityHis: {}, // 城市历史记录
    searchStoreHis: {},  // 搜索商铺历史
    addAddress:[],  //add界面新增收货地址信息
    newAddress:'', // 最新输入的添加地址
    addCityName:'' ,// 新增地址城市名字
    carts:{}, // 加入购物车储存信息   
    
    shopInfo:{
      entities: {}, // 加入购物车请求的参数
      ListInfo: {},  // 分累计数
      cartInfo: {},  // 食物计数
    },

    hognbaoNum:'' , // 红包数量
    hognbaoArr:[], // 红包数组
    questionDetailArr: '',//服务中心问题详情数组
    content_on:'', // 
  }

  export default state;