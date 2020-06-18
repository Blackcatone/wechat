import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情页面数据
    goodsObj:[]

  },

  // 全局的商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    const {goods_id} = options

    this.getGoodsDetail(goods_id)
  },
  
  // 请求获取商品详情的数据
  async getGoodsDetail(goods_id) {
    const {data:res} = await request({url:"/goods/detail", data:{goods_id}})
    let goodsObj = res.message
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // 一些ipone不识别webp格式的图片将webp格式用正则替换成jpg格式的(前端处理图片格式兼容).replace(/\.webp/g, '.jpg')
        // 一班让后台处理图片兼容问题
        goods_introduce:goodsObj.goods_introduce,
        pics:goodsObj.pics
      }
    })
    
  },
  
  // 给轮播图添加点击放大预览事件
  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
    
  },
  
  // 点击加入购物车
  handleCartAdd() {
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart')||[];
    // 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if (index===-1) {
      //购物车缓存中没有这个商品的id  然后添加这个商品到数组缓存中
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo)
    }else{
      // 缓存数组中已经存在这个商品对象就给这个商品对象的num+1
      cart[index].num++
    }
    //  把购物车从新添加到缓存中
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
      
  }
 
})