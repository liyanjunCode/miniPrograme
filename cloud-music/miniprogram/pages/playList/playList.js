// pages/playList/playList.js
const db = wx.cloud.database({
  env: "cloud-fun-1a4ff0"
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getSwiper();
   
  },
  _getSwiper() {
    db.collection('swiper').get().then((res) => {
      this.setData({
        imageList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name: 'playList'
    }).then((res) => {
      console.log(res, 111)
    })
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

  }
})