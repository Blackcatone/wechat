// pages/goods_list/index.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    // 接口需要的参数
    QueryParams:{
      query:"",
      cid: "",
      pagenum: 1,
      pagesize: 10
    },
    goodsList:[],
    totalPages:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.QueryParams.cid = options.cat_id
    // console.log(this.data.QueryParams);

    this.getGoodsList()
  },

  // 获取商品列表
  async getGoodsList() {
    const {data:res} = await request({url:"/goods/search", data:this.data.QueryParams})
    
    console.log(res);
    // 获取总条数
    let {total} = res.message
    // 计算总页数
    this.data.totalPages = Math.ceil(total/this.data.QueryParams.pagesize)
    
    this.setData({
      // 数组拼接 将之前的数组数据和新请求来的数据进行拼接显示
      goodsList:[...this.data.goodsList,...res.message.goods]
    })
    wx.stopPullDownRefresh()
  },
  // 获取用户点击的change事件改变显示
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
    
  },
  // 微信的onReachBottom下拉触底事件回调
  onReachBottom() {
    if (this.data.QueryParams.pagenum>=this.data.totalPages) {
      wx.showToast({title: '没有下一页数据了'});
        
    }else{
      this.data.QueryParams.pagenum++
      this.getGoodsList()
    }
    
  },
  onPullDownRefresh() {
    this.setData({
      goodsList:[]
    })
    this.data.QueryParams.pagenum = 1
    this.getGoodsList()
    
  }
})