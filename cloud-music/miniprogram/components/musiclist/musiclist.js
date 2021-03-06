// components/musiclist/musiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: {
      type: Array
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      const ds = event.currentTarget.dataset;
      this.setData({
        playingId: ds.id
      })
      app.setPlayingId(ds.id)
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.id}&index=${ds.index}`,
      })
      
    }
  }
})
