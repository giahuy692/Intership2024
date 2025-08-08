import { DTOFormGroup } from "src/app/p-app/p-layout/dto/DTOFormGroup"

export class DTOShortLink {
    Code: number = 0
    URLDirect: string = ''
    URLTransfer: string = ''
    Title: string = ''
    Keyword: string = ''
    Description: string = ''
    Image: string = ''
    IsApproved: boolean = false
    IsChecked: boolean = false
    IsFound: boolean = false
    CheckedTime: Date = null
    CreatedTime: Date = null
    ModifiedTime: Date = null

    constructor() {
    }
}

export type IDTOShortLink = DTOFormGroup<DTOShortLink>