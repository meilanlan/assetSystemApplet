import {post} from './config/post.js'

const messageListApi = params => post(`/user/messageList`, params)
const messageInfotApi = params => post(`/user/messageInfo`, params)

export {
  messageListApi,
  messageInfotApi
}