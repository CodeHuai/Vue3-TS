import network from '@/service'
import { IDataType } from '../../types'


export const getPageListData = (url: string, queryInfo: any) => {
  return network.post<IDataType>({
    url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return network.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return network.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return network.patch<IDataType>({
    url: url,
    data: editData
  })
}
