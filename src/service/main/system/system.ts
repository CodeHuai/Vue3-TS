import network from '@/service'
import {IDataType} from '../../types'


export const getPageListData = (url: string, queryInfo: any) => {
  return network.post<IDataType>({
    url,
    data: queryInfo
  })
}
