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
  let taskList = []
  // 因为云数据库只能每次查询100条， 所以需算出按100条查，需查询几次
  for (let i = 0; i < PageNum; i++) {
    let promise = playlistCollection.skip(i * MAX_LImIT).limit(MAX_LImIT).get()
    taskList.push(promise)
  }
  let list = {
    data: []
  }
  // 获取到数据库中所有的歌曲列表
  if (taskList.length > 0) {
    list = (await Promise.all(taskList)).reduce((prev, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  // 从接口获取歌曲推荐列表
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  const databaseList = []
  // 循环数据库和接口的歌曲对比去重
  for (let i = 0, l = playlist.length; i<l;i++) {
    let flag = true
    for (let j = 0, len = list.data.length; j < len; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      databaseList.push(playlist[i])
    }
  }
  // 将数据库不存在的歌曲存入数据库
  for (let i = 0, l = databaseList.length; i < l; i++) {
    playlistCollection.add({
      data:{
        ...databaseList[i],
        createTime: db.serverDate()
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log('插入失败')
    })
  }
  return databaseList.length
}