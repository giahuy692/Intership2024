import { DTOOrder } from "./DTOOrder.dto";

export class DTOCommercialConditions {
    code: number;
    name: string = ""; 

    dtoOrderCode!: number;
    dtoOrder?: DTOOrder;
    
    constructor (code: number) {this.code = code}
}