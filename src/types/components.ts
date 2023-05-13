// Modal
export interface IModalConfig {
  pageName: string
  pageParam: string
  formItems: any[]
  modalRules?: any[]
  queryData: any
  editKey: string
  header?: {
    addTitle?: string
    editTitle?: string
  }
  layout?: {
    labelWidth?: number
    size?: string
  }
}

export interface IModalProps {
  modalConfig: IModalConfig
}
