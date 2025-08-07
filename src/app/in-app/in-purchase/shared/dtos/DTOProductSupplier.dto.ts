import { DTOCoin } from "./DTOCoin.dto";
import { DTOOrigin } from "./DTOOrigin.dto";

export class DTOProductSupplier {
    code: number = 0;
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

    dtoOrderCode!: number;
    
    dtoOrigin: DTOOrigin[] = [];
    dtoCoin: DTOCoin[] = [];
}

