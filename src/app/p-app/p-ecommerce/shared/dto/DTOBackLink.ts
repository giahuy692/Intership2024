import { DTOFormGroup } from "src/app/p-app/p-layout/dto/DTOFormGroup"

export class DTOBackLink {
    Code: number = 0
    Domain: string = ''

    constructor() {
    }
}

export type IDTOBackLink = DTOFormGroup<DTOBackLink>