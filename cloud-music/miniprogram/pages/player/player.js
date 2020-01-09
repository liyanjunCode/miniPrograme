// miniprogram/pages/player/player.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
let playIndex = 0
let musiclist = []
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSame: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    playIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this.loadMusic(options.musicId)
  },
  loadMusic(musicId) {
    if (app.globalData.playingId === musicId) {
      console.log(1111)
    } else {
      const musicItem = musiclist[playIndex]
      this.getPlayMusic(musicId,musicItem)
    }
  },
  getPlayMusic(musicId, musicItem) {
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'player',
        musicId
      },
      success: (res) => {
        const result = res.result.data[0]
        if (result.url === null) {
          wx.showToast({
            title: '无权播放',
          })
          return
        }
        console.log(musicItem)
        backgroundAudioManager.title = musicItem.name
        backgroundAudioManager.epname = musicItem.name
        backgroundAudioManager.singer = '许巍'
        backgroundAudioManager.src = result.url

        this.getlyric(musicId)
      }
    })
  },
  getlyric(musicId) {
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'lyric',
        musicId
      },
      success: (res) => {
        console.log(res, 333)
      }
    })
  }
})