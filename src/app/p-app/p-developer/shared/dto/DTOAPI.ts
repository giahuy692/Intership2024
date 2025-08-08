import { DTOModule } from "./DTOModule"

export class DTOModuleAPI extends DTOModule {
    ListAPI: DTOAPI[] = []
}

export class DTOAPI {
    Code: number = 0
    ModuleID: number = null
    URL: string = ''
    ServerURL: string = ''
    IsClosed: boolean = false
    OrderBy: number = null
    Remark: string = ''
    APIID: string = ''
    APIPackage: string = ''
    Variable: string = ''
    ModuleCode: string = ''
    constructor() { }
}

export class DTODevAPI {
    Module: string = ''
    ModuleChild: string = ''
    Link: string = ''

    constructor(link: string, module: string, modulechild: string = '') {
        this.Module = module
        this.ModuleChild = modulechild
        this.Link = link
    }
}