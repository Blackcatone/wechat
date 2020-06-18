// pages/category/index.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧栏构造数据
    leftMenuList:[],
    // 右侧栏构造数据
    rightContent:[],
    // 左侧选中标记
    currentActive:0,
    // 从新赋值scrollTop=0
    scrollTop:0
    
  },
  // 请求接口返回的总数据
  cateGoodsList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
    0 web中的本地存储和小程序的本地存储的区别
      1 写代码的方式不一样了
        web: localStorage.setItem("key", "value") localStorage.getItem("key")
        小程序: wx.setStorageSync("key", "data"); wx.getStorageSync(key);
      2 储存的方式不一样，存的时候有没有做类型转换
        web: 不管你存入的是什么类型的数据，最终都会先调用toString(),吧数据转化成字符串，然后再存进去
        小程序：不存在 类型转换这个操作，存的什么数据进去，获取的时候就是什么类型

    1.小程序数据过大缓存解决方案
      1: 先判断一下本地存储中有没有旧的数据{time:Date.now(), data:[...]}
      2: 没有旧数据 直接发送新的请求
      3: 有旧的数据 同时还没有过期 就直接使用本地的旧数据即可

    */
    const Cates = wx.getStorageSync("cates");
      
    if(!Cates) {
      console.log(333);
      
      this.getCateGoodsList();
    }else{
      console.log(222);
      
      if (Date.now() - Cates.time > 1000*10) {
        this.getCateGoodsList();
      }else{
        console.log(111);
        
        this.cateGoodsList = Cates.data
        let leftMenuList=this.cateGoodsList.map(v=>v.cat_name);
          let rightContent=this.cateGoodsList[0].children
          this.setData({
            leftMenuList,
            rightContent,
          })
      }
    }  
  },

  // 获取商品分类
  async getCateGoodsList() {
    // request({url:"/categories"})
    //   .then(res=>{       
    //       this.cateGoodsList = res.data.message
          
    //       wx.setStorageSync("cates",{time:Date.now(), data:this.cateGoodsList} );
            
    //       // 构造左侧大菜单数据
    //       let leftMenuList=this.cateGoodsList.map(v=>v.cat_name);
    //       let rightContent=this.cateGoodsList[0].children
    //       this.setData({
    //         leftMenuList,
    //         rightContent
    //       })
        
    //   })
    
    // es7的async await异步解决方法
    const res = await request({url:"/categories"})
      .then(res=>{       
          this.cateGoodsList = res.data.message
          
          wx.setStorageSync("cates",{time:Date.now(), data:this.cateGoodsList} );
            
          // 构造左侧大菜单数据
          let leftMenuList=this.cateGoodsList.map(v=>v.cat_name);
          let rightContent=this.cateGoodsList[0].children
          this.setData({
            leftMenuList,
            rightContent
          })
        
      })

  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    const {index} = e.currentTarget.dataset;
    let rightContent=this.cateGoodsList[index].children
    this.setData({
      currentActive:index,
      rightContent,
      // 将右侧内容区域的scrollTop到顶部的距离从新设置为0
      scrollTop:0
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})