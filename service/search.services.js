import {post} from './config/post.js'
const mapSearchApi = params => post(`/map/search`, params)
const projectListApi = params => post(`/project/projectList`, params)
const projectInfoApi = params => post(`/project/projectInfo`, params)
export {
  mapSearchApi,
  projectListApi,
  projectInfoApi
}