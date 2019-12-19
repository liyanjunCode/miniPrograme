// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init()
const db = cloud.database()
const URL = 'http://musicapi.xiecheng.live/personalized'
// 云函数入口函数
console.log(db)
const playListCollection = db.collection('playList')
exports.main = async (event, context) => {
  // const count = await playListCollection.count()
  const wxContext = cloud.getWXContext()
  // 获取推荐的歌单列表
  let resData = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  for (let i = 0; i < resData.length;i++) {
    playListCollection.add({
      data: {
        ...resData[i],
        createTime: db.serverDate()
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
  
  return {
    event,
    res: resData
  }
}