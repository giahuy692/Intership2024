export class DTOEvaluationType {
    Code: 0
    StatusID: number
    CreateBy: string
    CreateTime: string
  LastModifiedBy: string = ''
  LastModifiedTime: Date | string = null
    TypeOfEvaluation: string
    TypeData: number
    Remark?: string
    StatusName: string
  constructor() {}
}
