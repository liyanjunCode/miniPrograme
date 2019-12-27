// pages/playList/playList.js
const db = wx.cloud.database({
  env: "cloud-fun-1a4ff0"
});
const MAX_LIMIT = 15;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    playlist: [],
    pageNum: 0,
    loadStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getSwiper();
    this._getPlayList();
  },
  _getSwiper() {
    db.collection('swiper').get().then((res) => {  
      this.setData({
        imageList: res.data
      })
    })
  },
  _getPlayList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'playlist',
        start: this.data.playlist.length,
        count: MAX_LIMIT
      },
      success: res => {
        this.setData({
          playlist: [...this.data.playlist,...res.result.data],
          loadStatus: res.result.data.length ? false : true
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onReachBottom(res) {
    if (this.data.loadStatus) { return}
    this.setData({
      loadStatus: true
    })
    this._getPlayList();
  },
  onPullDownRefresh (res) {
    this.setData({
      playlist: []
    })
    this._getSwiper();
    this._getPlayList();
  }
})