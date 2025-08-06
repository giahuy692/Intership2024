import { DTOOrder } from "./DTOOrder.dto";

export class DTOPurchasingUnit {
    code: number;
    name: string = ""; 

    dtoOrderCode!: number;
    dtoOrder?: DTOOrder;
    
    constructor (code: number) {this.code = code}
}