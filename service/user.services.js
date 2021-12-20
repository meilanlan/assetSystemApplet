import {post} from './config/post.js'

const userApi = params =>  post(`/user/user`,params)

export {
  userApi
}