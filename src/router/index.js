import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/login/login'
import City from '@/page/city/city'
import Home from '@/page/home/home'
import Search from '@/page/search/search'
import Forget from '@/page/forget/forget'
import Msite from '@/page/msite/msite'
import Food from '@/page/food/food'


import Profile from '@/page/profile/profile'
import Info from '@/page/profile/username/info'
import Setusername from '@/page/profile/username/setusername'
import Address from '@/page/profile/address/address'
import Add from '@/page/profile/address/add'
import Adddetail from '@/page/profile/address/addDetail'

import Benefit from '@/page/benefit/benefit'
import HbDescription from '@/page/benefit/children/hbDescription'
import HbHistory from '@/page/benefit/children/hbHistory'
import Exchange from '@/page/benefit/children/exchange'
import Commend from '@/page/benefit/children/commend'
import Coupon from '@/page/benefit/children/Coupon'

import Balance from '@/page/balance/balance'
import Detail from '@/page/balance/detail/detail'

import Points from '@/page/points/points'
import Detail1 from '@/page/points/detail1/detail1'


import Order from '@/page/order/order'
import OrderDetail from '@/page/order/orderDetail/orderDetail'
import Store from '@/page/store/store'

import Vipcard from '@/page/vipcard/vipcard'
import InvoiceRecord from '@/page/vipcard/children/invoiceRecord'
import UseCart from '@/page/vipcard/children/useCart'
import VipDescription from '@/page/vipcard/children/vipDescription'

import ConfirmOrder from '@/page/confirmOrder/confirmOrder'
import Payment from '@/page/confirmOrder/children/payment'

import Shop from '@/page/shop/shop'
import ShopDetail from '@/page/shop/shopDetail'
import ShopDetaila from '@/page/shop/foodDetail1'
import ShopSafe from '@/page/shop/shopSafe'


import Service from '@/page/service/service'
import QuestionDetail from '@/page/service/questionDetail'
import Download from '@/page/download/download'
// import Search from '@/page/search/search'
import Buffer1 from '@/components/buffer/buffer'

//  订单
// import ConfirmOrder from '@/page/confirmOrder/confirmOrder'
import Remark from '@/page/confirmOrder/remark/remark'
import Invoice from '@/page/confirmOrder/invoice/invoice'
import ChooseAddress from '@/page/confirmOrder/chooseAddress/chooseAddress'
import AddAddress from '@/page/confirmOrder/chooseAddress/addAddress/addAddress'
import SearchAddress from '@/page/confirmOrder/chooseAddress/addAddress/searchAddress/searchAddress'













Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/buffer',
            name: 'buffer',
            component: Buffer1
        },



        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/forget',
            name: 'forget',
            component: Forget
        },
        {
            path: '/city/:id',
            name: 'city',
            component: City
        },
        {
            path: '/msite',
            name: 'msite',
            component: Msite
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },

        {
            path: '/food',
            name: 'food',
            component: Food
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/profile/info',
            name: 'info',
            component: Info
        },
        {
            path: '/profile/info/setusername',
            name: 'setusername',
            component: Setusername
        },
        {
            path: '/profile/info/address',
            name: 'address',
            component: Address
        },
        {
            path: '/profile/info/address/add',
            name: 'add',
            component: Add
        },
        {
            path: '/profile/info/address/add/addDetail',
            name: 'addDetail',
            component: Adddetail
        },
        {
            path: '/benefit',
            name: 'benefit',
            component: Benefit
        },
        {
            path: '/benefit/hbDescription',
            name: 'hbDescription',
            component: HbDescription
        },
        {
            path: '/benefit/hbHistory',
            name: 'hbHistory',
            component: HbHistory
        },
        {
            path: '/benefit/exchange',
            name: 'exchange',
            component: Exchange
        },

        {
            path: '/benefit/commend',
            name: 'commend',
            component: Commend
        },
        {
            path: '/benefit/coupon',
            name: 'coupon',
            component: Coupon
        },

        {
            path: '/balance',
            name: 'balance',
            component: Balance
        },
        {
            path: '/balance/detail',
            name: 'detail',
            component: Detail
        },

        {
            path: '/shop',
            name: 'shop',
            component: Shop,
            children: [{
                path: 'shopDetail',
                name: 'shopDetail',
                component: ShopDetail,
            }]
        },
        {
            path: '/shopDetaila',
            name: 'shopDetaila',
            component: ShopDetaila,
        },
        {
            path: '/shopDetaila/shopSafe',
            name: 'shopSafe',
            component: ShopSafe,
        }, {
            path: '/points',
            name: 'points',
            component: Points
        },
        {
            path: '/points/detail1',
            name: 'detail1',
            component: Detail1
        },

        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/order/orderDetail',
            name: 'orderDetail',
            component: OrderDetail
        },
        {
            path: '/store',
            name: 'store',
            component: Store
        },
        {
            path: '/vipcard',
            name: 'vipcard',
            component: Vipcard,
        },
        {
            path: '/vipcard/invoiceRecord',
            name: 'invoiceRecord',
            component: InvoiceRecord
        },
        {
            path: '/vipcard/useCart',
            name: 'useCart',
            component: UseCart
        },
        {
            path: '/vipcard/vipDescription',
            name: 'vipDescription',
            component: VipDescription
        },

        {
            path: '/service',
            name: 'service',
            component: Service
        },
        {
            path: '/service/questionDetail',
            name: 'questionDetail',
            component: QuestionDetail
        },

        // {
        //   path: '/confirmOrder',
        //   name: 'confirmOrder',
        //   component: ConfirmOrder
        // },
        {
            path: '/confirmOrder/payment',
            name: 'payment',
            component: Payment
        },
        {
            path: '/download',
            name: 'download',
            component: Download
        },



        {
            path: '/confirmOrder',
            name: 'confirmOrder',
            component: ConfirmOrder,
        },
        {
            path: '/confirmOrder/chooseAddress',
            name: 'chooseAddress',
            component: ChooseAddress
        },
        // 订单备注页
        {
            path: '/confirmOrder/remark',
            name: 'remark',
            component: Remark
        },
        // 发票
        {
            path: '/confirmOrder/invoice',
            name: 'invoice',
            component: Invoice
        },
        {
            path: '/confirmOrder/chooseAddress/addAddress',
            name: 'addAddress',
            component: AddAddress
        },
        {
            path: '/confirmOrder/chooseAddress/addAddressarchAddress',
            name: 'searchAddress',
            component: SearchAddress
        }


    ]
})