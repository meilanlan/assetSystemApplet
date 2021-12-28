import {post} from './config/post.js'

const getConfirmPersonnelApi = params => post(`/project/getConfirmPersonnel`, params) //获取审核人列表
const addNeedsApi = params => post(`/project/addNeeds`, params) //提交

export {
  getConfirmPersonnelApi,
  addNeedsApi
}