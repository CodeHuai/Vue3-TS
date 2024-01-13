export interface IRouterBaseType {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  parentId?: number
  path: string
}

export interface IRootRouterType extends IRouterBaseType {
  children?: Array<IRouterBaseType> | null
}


export interface ILoginState {
  token: string
  userInfo: any
  userMenus: Array<IRootRouterType>
}
