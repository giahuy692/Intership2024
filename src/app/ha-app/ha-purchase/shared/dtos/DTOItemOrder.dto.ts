import { DTOItemSupplier } from "./DTOItemSupplier.dto";

export class DTOItemOrder {
    priceBuy: number;
    priceRetail: number;
    priceReference: number;
    reserveQuantity: number;
    quantitySold: number;
    revenue: number;
    commercialConditions: DTOCommercialConditions[];
    MinimumQuantity: number;
    QuantityFirst: number;
    purchasingUnit: DTOPurchasingUnit[];
    po: string;
    Vat: number;
    coin: DTOCoin[];
    timeBuyFirst: Date;
    timeEstimatedDelivery: Date;
    descript: string;
    product: DTOItemSupplier[];

    constructor(
        priceBuy: number,
        priceRetail: number,
        priceReference: number,
        reserveQuantity: number,
        quantitySold: number,
        revenue: number,
        commercialConditions: DTOCommercialConditions[],
        MinimumQuantity: number,
        QuantityFirst: number,
        purchasingUnit: DTOPurchasingUnit[],
        po: string,
        Vat: number,
        coin: DTOCoin[],
        timeBuyFirst: Date,
        timeEstimatedDelivery: Date,
        descript: string,
        product: DTOItemSupplier[],
    ) {
        this.priceBuy = priceBuy;
        this.priceRetail = priceRetail;
        this.priceReference = priceReference;
        this.reserveQuantity = reserveQuantity;
        this.quantitySold = quantitySold;
        this.revenue = revenue;
        this.commercialConditions = commercialConditions;
        this.MinimumQuantity = MinimumQuantity;
        this.QuantityFirst = QuantityFirst;
        this.purchasingUnit = purchasingUnit;
        this.po = po;
        this.Vat = Vat;
        this.coin = coin;
        this.timeBuyFirst = timeBuyFirst;
        this.timeEstimatedDelivery = timeEstimatedDelivery;
        this.descript = descript;
        this.product = product;
    }
}

export class DTOCoin {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class DTOCommercialConditions {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class DTOPurchasingUnit {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
