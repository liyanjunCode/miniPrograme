// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init({ env:'cloud-fun-1a4ff0' })
const db = cloud.database()
const playlistCollection = db.collection('playlist')
const URL = 'http://musicapi.xiecheng.live/personalized'
const MAX_LImIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const countResult = await playlistCollection.count()
  const count = countResult.total
  const PageNum = Math.ceil(count / 100)
  const taskList = []
  for (let i = 0; i < PageNum; i++) {
    playlistCollection.skip(i * MAX_LImIT).limit(MAX_LImIT).get()
  }
  console.log(PageNum)
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}