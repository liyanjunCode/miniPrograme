// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const rp = require('request-promise')
const URL = 'http://musicapi.xiecheng.live/personalized'

// 云函数入口函数
console.log(db, 333)
console.log(db.collection('playlist'), 333)
const playListCollection = db.collection('playlist')
exports.main = async (event, context) => {
  const countResult = await playListCollection.count()
  const total = countResult.total
  console.log(total, 1111)
  // 获取推荐的歌单列表
  let resData = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  // for (let i = 0; i < resData.length;i++) {
  //   await playListCollection.add({
  //     data: {
  //       ...resData[i],
  //       createTime: db.serverDate()
  //     }
  //   }).then((res) => {
  //     console.log('插入成功');
  //   }).catch((err) => {
  //     console.error('插入失败');
  //   })
  // }
  
  return {
    event,
    res: total
  }
}