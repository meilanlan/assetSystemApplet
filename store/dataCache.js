
const MAPPOI = 'mapPoi' // 个人定位经纬度
const settokenStore = token => {
  try {
    uni.setStorageSync('token', token)
  } catch (e) {
    console.log(e);
  }
}

const gettokenStore = () => {
  var value = '';
  try {
    value = uni.getStorageSync('token')
  } catch (e) {
    console.log(e)
  }
  return value;
}
const setInfoStore = (KEY, data) => {
  try {
    uni.setStorageSync(KEY, data)
  } catch(e) {
    console.log(e)
  }
}
const getInfoStore = (KEY) => {
  let value = ''
  try {
    value = uni.getStorageSync(KEY)
  }catch(e) {
    console.log(e)
  }
  return value
}


export {
  MAPPOI,
  settokenStore,
  gettokenStore,
  setInfoStore,
  getInfoStore
}