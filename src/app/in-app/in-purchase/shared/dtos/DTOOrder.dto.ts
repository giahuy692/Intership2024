import { DTOCoin } from "./DTOCoin.dto";
import { DTOCommercialConditions } from "./DTOCommercialConditions.dto";
import { DTOProductSupplier } from "./DTOProductSupplier.dto";
import { DTOPurchasingUnit } from "./DTOPurchasingUnit.dto";

export class DTOOrder {
    code: number = 0;
    priceVat: number = 1;
    reserveQuantity: number = 10;
    quantitySold: number = 1;
    revenue: number = 100000;
    minimumQuantity: number = 1;
    quantityFirst: number = 1;
    po: string = "PO001";
    vat: number = 10;
    timeBuyFirst?: {
        dateFirst: Date | string;
        dateEnd: Date | string;
    };
    timeEstimatedDelivery?: {
        dateFirst: Date | string;
        dateEnd: Date | string;
    };
    descript: string = "";
    stateOrder: string = "";

    dtoCommercialConditions: DTOCommercialConditions[] = [];
    dtoPurchasingUnit: DTOPurchasingUnit[] = [];
    dtoCoin: DTOCoin[] = [];
    dtoProductSupplier: DTOProductSupplier[] = [];
}
