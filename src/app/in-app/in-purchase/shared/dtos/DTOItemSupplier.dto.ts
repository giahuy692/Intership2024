import { DTOProperty } from "./DTOProperty.dto";
import { DTOSale } from "./DTOSale.dto";

export class DTOItemSupplier {
    code?: number
    barcode?: number;
    name?: string;
    origin?: DTOOrigin[];
    nameJapan?: string;
    idBill?: string;
    nameBill?: string;
    classify?: string;
    info?: string;
    img?: string;
    property?: DTOProperty[];
    sale?: DTOSale[];
}

export class DTOOrigin {
    name?: string;
}