import { DTOItemSupplier } from "./DTOItemSupplier.dto";

export class DTOItemOrder {
    priceBuy?: number;
    priceRetail?: number;
    priceReference?: number;
    reserveQuantity?: number;
    quantitySold?: number;
    revenue?: number;
    commercialConditions?: DTOCommercialConditions[];
    MinimumQuantity?: number;
    QuantityFirst?: number;
    purchasingUnit?: DTOPurchasingUnit[];
    po?: string;
    Vat?: number;
    coin?: DTOCoin[];
    timeBuyFirst?: Date;
    timeEstimatedDelivery?: Date;
    descript?: string;
    product?: DTOItemSupplier[];
    stateOrder?: string;
}

export class DTOCoin {
    name?: string;
}

export class DTOCommercialConditions {
    name?: string;
}

export class DTOPurchasingUnit {
    name?: string;
}
