// miniprogram/pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    listInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList(options.playlistId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMusicList(id) {
    wx.showLoading({
      title: '加载中',
    });
    wx.cloud.callFunction({
      name:'music',
      data: {
        $url: 'musicList',
        playlistId:id
      },
      success: res => {
        const pl = res.result.playlist
        this.setData({
          musicList: pl.tracks,
          listInfo: {
            coverImgUrl: pl.coverImgUrl,
            name: pl.name,
          }
        })
        this.setMusicList()
        wx.hideLoading();
      }
    })
  },
  setMusicList() {
    wx.setStorageSync('musiclist', this.data.musiclist)
  }
})