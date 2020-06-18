// pages/cart/index.js
import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
    console.log(this.data.address);
    
  },

  // 点击获取地址
  async handleChooseAddress() {  
    try {
          // 获取权限状态
          const res1 = await getSetting()
          const scopeAddress = res1.authSetting["scope.address"]
          // 判断权限状态
          if (scopeAddress === false) {
            await openSetting()
          }
          // 先引导用户的打开授权页面
          // 调用收货地址api
          let address = await chooseAddress()
          // 将用户的收货地址拼接成完整的收货地址
          address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
          console.log(address);
          // 将收货地址存入小程序缓存中
          wx.setStorageSync("address", address);
            
    } catch (error) {
      console.log(error);
      
    }
    
  }

})