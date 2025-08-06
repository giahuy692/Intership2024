import { DTOAttributeProduct } from "./DTOAttributeProduct.dto";
import { DTOSale } from "./DTOSale.dto";

export class DTOItemSupplier {
    code?: number
    barcode?: number;
    name?: string;
    origin?: DTOOrigin[];
    nameJapan?: string;
    codeBill?: number;
    nameBill?: string;
    classify?: string;
    info?: string;
    img?: string;
    property?: DTOAttributeProduct[];
    sale?: DTOSale[];
}

export class DTOOrigin {
    name?: string;
}