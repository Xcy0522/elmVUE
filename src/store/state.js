const state = {
    username: "", // 用户名
    // userId:"", // 用户id存在localStorage
    city: {
        name: '郑州'
    }, // 城市列表数组
    // geohash:
    userInfo: {},
    cityId: '32', // 当前选择城市的id
    cityHis: {}, // 城市历史记录
<<<<<<< HEAD
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
=======
    searchStoreHis: {}, // 搜索商铺历史
    addAddress: [], //add界面新增收货地址信息
    newAddress: '', // 最新输入的添加地址
    addCityName: '', // 新增地址城市名字
>>>>>>> 2e7dab203563a268f90253dca9a6739aa984dbd3

    hognbaoNum: '', // 红包数量
    hognbaoArr: [], // 红包数组
    questionDetailArr: '', //服务中心问题详情数组
    content_on: '', // 下单地址
    description: "", //下单备注
    //订单需要的数据
    shopInfo: {},
    restaurant_id: 1, //商铺ID
    geohash: "23.12497,113.26308,", //经纬度..
    cartInfo: {}, //选中食物记录
    ListInfo: {}, //类中选中食物总个数
    entities: {}, //请求参数entities 详情 使用请加Object.keys(entities);
    //商铺食物选择...历史记录
    historyCarts: {
        1: { //以商铺Id为属性..便于查找 和 保证唯一性 .. 此为示例(默认值)
            cartInfo: {}, //选中食物记录
            ListInfo: {}, //类中选中食物总个数
            entities: {}, //请求参数entities 详情 使用请加Object.keys(entities);
        }
    },

}

export default state;