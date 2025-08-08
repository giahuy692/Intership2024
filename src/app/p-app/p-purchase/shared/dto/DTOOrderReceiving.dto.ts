import { DTOOrderInvoice } from "./DTOOrderInvoice.dto"

export class DTOOrderReceiving{
    Code: number = 0
    StatusName: string = ''
    ReceivedTime: Date | string
    FinishedTime: Date | string
    Remark: string = ''
    ListInvoice: DTOOrderInvoice[]
}