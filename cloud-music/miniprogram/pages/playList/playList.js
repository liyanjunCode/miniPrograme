// pages/playList/playList.js
const db = wx.cloud.database({
  env: "cloud-fun-1a4ff0"
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    playlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getSwiper();
    this._getPlayList()
  },
  _getSwiper() {
    db.collection('swiper').get().then((res) => {
      this.setData({
        imageList: res.data
      })
    })
  },
  _getPlayList() {
    db.collection('playlist').get().then((res) => {
      this.setData({
        playlist: res.data
      })
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
  onReachBottom(res) {
    console.log(111)
  }
})