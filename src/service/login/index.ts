import network from '@/service'
import type { IAccount, ILoginType } from './types'
import type {IDataType} from '../types'


// 登陆
export function fetchLoginByAccount(account: IAccount) {
  return network.post<IDataType<ILoginType>>({
    url: '/login',
    data: account
  })
}


// 查询登陆用户的信息
export function requestUserInfoById(id: number) {
  return network.get<IDataType>({
    url: `/users/${id}`
  })
}

// 请求用户菜单栏
export function requestUserMenusByRoleId(id: number) {
  return network.get<IDataType>({
    url: `/role/${id}/menu`
  })
}
