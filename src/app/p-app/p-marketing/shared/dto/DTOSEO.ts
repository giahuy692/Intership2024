import { DTOFormGroup } from "src/app/p-app/p-layout/dto/DTOFormGroup"

export class DTOSEO {
    Code: number = 0
    URLDirect: string = ''
    CustomTitle: string = ''
    H1: string = ''
    CustomDescription: string = ''
    CustomKeyword: string = ''

    constructor() {
    }
}

export type IDTOSEO = DTOFormGroup<DTOSEO>