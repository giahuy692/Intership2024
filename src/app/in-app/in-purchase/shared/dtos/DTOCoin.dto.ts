import { DTOOrder } from "./DTOOrder.dto";
import { DTOProductSupplier } from "./DTOProductSupplier.dto";

export class DTOCoin {
    code: number;
    name: string = "";

    dtoOrderCode!: number;
    dtoOrder?: DTOOrder;

    dtoProductSupplierCode!: number;
    dtoProductSupplier?: DTOProductSupplier;

    constructor (code: number) { this.code = code};
}