export class DTOMAKeyword {
    StatusName: string = 'Đang soạn thảo'
    Code: number = 0
    LastModifiedTime: Date | string = null
    LastModifiedBy: string = ''
    CreateTime: Date | string = null
    CreateBy: string = ''
    Company: number = 1
    KeywordVN: string = ""
    KeywordEN: string = ""
    KeywordJP: string = ""
    StatusID: number = 0
    TypeData: number = 1
    StartDate: Date
    FinishDate: Date
    AliasVN: string = ''
    AliasEN: string = ''
    AliasJP: string = ''
    ImageThumb: string = null
    ImageSmall: string = null
    ImageLarge: string = null
    OrderBy: number = 1
}