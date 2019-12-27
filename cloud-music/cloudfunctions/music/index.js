// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init({ env: 'cloud-fun-1a4ff0' })
const db = cloud.database()
const TcbRouter = require('tcb-router')
const BASE_URL = 'http://musicapi.xiecheng.live'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'desc')
      .get()
      .then((res) => {
        return res
      })
  })
  app.router('musicList', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId)).then((res) => {
      return JSON.parse(res)
    })
  })
  app.router('player', async (ctx) => {
    ctx.body = await rp(BASE_URL + + `/song/url?id=${event.musicId}`)
  })
  app.router('lyric', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/lyric?id=${event.musicId}`)
  })
  return app.serve();
}