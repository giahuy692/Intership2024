export class DTOProperty {
    g1: DTOG1[];
    g2: DTOG2[];
    g3: DTOG3[];
    g4: DTOG4[];
    g5: DTOG5[];
    shipper: string;
    market: string;
    unit: BaseUnit[];
    productSize: { size1: number; size2: number; size3: number };
    productInner: { size1: number; size2: number; size3: number };
    productCarton: { size1: number; size2: number; size3: number };
    productPallet: { size1: number; size2: number; size3: number };
    productPacking: { size1: number; size2: number; size3: number };
    productSpecificationConversion: { inner: number; carton: number; pallet: number };
    expiry: Date;
    specifications: string;
    dateUse: Date;

    constructor(
        g1: DTOG1[],
        g2: DTOG2[],
        g3: DTOG3[],
        g4: DTOG4[],
        g5: DTOG5[],
        shipper: string,
        market: string,
        unit: BaseUnit[],
        productSize: { size1: number; size2: number; size3: number },
        productInner: { size1: number; size2: number; size3: number },
        productCarton: { size1: number; size2: number; size3: number },
        productPallet: { size1: number; size2: number; size3: number },
        productPacking: { size1: number; size2: number; size3: number },
        productSpecificationConversion: { inner: number; carton: number; pallet: number },
        expiry: Date,
        specifications: string,
        dateUse: Date
    ) {
        this.g1 = g1;
        this.g2 = g2;
        this.g3 = g3;
        this.g4 = g4;
        this.g5 = g5;
        this.shipper = shipper;
        this.market = market;
        this.unit = unit;
        this.productSize = productSize;
        this.productInner = productInner;
        this.productCarton = productCarton;
        this.productPallet = productPallet;
        this.productPacking = productPacking;
        this.productSpecificationConversion = productSpecificationConversion;
        this.expiry = expiry;
        this.specifications = specifications;
        this.dateUse = dateUse;
    }
}

export class DTOG1 {
    constructor(public id: string, public name: string) {}
}

export class DTOG2 {
    constructor(public id: string, public name: string) {}
}

export class DTOG3 {
    constructor(public id: string, public name: string) {}
}

export class DTOG4 {
    constructor(public id: string, public name: string) {}
}

export class DTOG5 {
    constructor(public id: string, public name: string) {}
}

export class BaseUnit {
    constructor(public id: string, public name: string) {}
}
