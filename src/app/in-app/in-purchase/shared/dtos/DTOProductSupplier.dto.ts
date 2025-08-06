import { DTOCoin } from "./DTOCoin.dto";
import { DTOOrder } from "./DTOOrder.dto";
import { DTOOrigin } from "./DTOOrigin.dto";
import { DTOSupplier } from "./DTOSupplier.dto";

export class DTOProductSupplier {
    code: number ;
    barcode: number = 1;
    name: string = "";
    nameJapan: string = "";
    codeBill: number = 1;
    nameBill: string = "";
    classify: string = "";
    img: string = "";
    priceBuy: number = 1;
    priceRetail: number = 1;
    priceReference: number = 1;

    dtoSupplierCode!: number;
    dtoSupplier?: DTOSupplier;

    dtoOrderCode!: number;
    dtoOrder?: DTOOrder;
    
    dtoOrigin: DTOOrigin[] = [];
    dtoCoin: DTOCoin[] = [];

    constructor (code: number) { this.code = code; }
}

