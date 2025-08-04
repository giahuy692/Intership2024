export class DTOProperty {
    g1?: DTOG1[];
    g2?: DTOG2[];
    g3?: DTOG3[];
    g4?: DTOG4[];
    g5?: DTOG5[];
    shipper?: string;
    market?: string;
    unit?: BaseUnit[];
    productSize?: { size1?: number; size2?: number; size3?: number };
    productInner?: { size1?: number; size2?: number; size3?: number };
    productCarton?: { size1?: number; size2?: number; size3?: number };
    productPallet?: { size1?: number; size2?: number; size3?: number };
    productPacking?: { size1?: number; size2?: number; size3?: number };
    productSpecificationConversion?: { inner?: number; carton?: number; pallet?: number };
    expiry?: Date;
    specifications?: string;
    dateUse?: Date;
}

export class DTOG1 {
    name?: string;
}

export class DTOG2 {
    name?: string;
}

export class DTOG3 {
    name?: string;
}

export class DTOG4 {
    name?: string;
}

export class DTOG5 {
    name?: string;
}

export class BaseUnit {
    name?: string;
}
