import {post} from './config/post.js'

const messageListApi = params => post(`/user/messageList`, params)
const messageInfotApi = params => post(`/user/messageInfo`, params)
const projectNewsApi = params => post(`/user/projectNews`, params) //工程动态

export {
  messageListApi,
  messageInfotApi,
  projectNewsApi
}