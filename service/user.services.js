import {post} from './config/post.js'

const userApi = params =>  post(`/user/user`,params) // 我的
const examineApproveApi = params =>  post(`/project/examineApprove`,params) //审核列表
const allocationInfoApi = params =>  post(`/project/allocationInfo`,params) // 调拨详情
const allMaterialsListsApi = params =>  post(`/project/allMaterialsLists`,params) // 物资列表
const allocationChangeApi = params =>  post(`/project/allocationChangeProject`,params) // 待审批详情-调拨-选择调出项目
const allocationConfrimApi = params =>  post(`/project/allocationConfrim`,params) // 待审批详情-调拨-调拨提交
const scrapInfoApi = params =>  post(`/project/scrapInfo`,params) // 待审批详情报废详情
const scrapConfrimApi = params =>  post(`/project/scrapConfrim`,params) // 待审批详情报废---提交
const needsInfoApi = params =>  post(`/project/needsInfo`,params) // 待审批详情-需求
const needsConfrimApi = params =>  post(`/project/needsConfrim`,params) // 待审批详情-需求---提交
const allocationListsApi = params =>  post(`/project/allocationLists`,params) // 调拨管理(列表)
const allocationDoneApi = params =>  post(`/project/allocationDone`,params) // 调拨管理(列表)---待确认详情-确认提交


export {
  userApi,
  examineApproveApi,
  allocationInfoApi,
  scrapInfoApi,
  allMaterialsListsApi,
  allocationChangeApi,
  allocationConfrimApi,
  needsInfoApi,
  scrapConfrimApi,
  needsConfrimApi,
  allocationListsApi,
  allocationDoneApi
}