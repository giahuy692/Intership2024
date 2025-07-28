import { DTOProperty } from "./DTOProperty.dto";
import { DTOSale } from "./DTOSale.dto";

export class DTOItemSupplier {
    id: string;
    name: string;
    origin: DTOOrigin[];
    nameJapan: string;
    idBill: string;
    nameBill: string;
    classify: string;
    info: string;
    img: string;
    property: DTOProperty[];
    sale: DTOSale[];

    constructor(
        id: string,
        name: string,
        origin: DTOOrigin[],
        nameJapan: string,
        idBill: string,
        nameBill: string,
        classify: string,
        info: string,
        img: string,
        property: DTOProperty[],
        sale: DTOSale[]
    ) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.nameJapan = nameJapan;
        this.idBill = idBill;
        this.nameBill = nameBill;
        this.classify = classify;
        this.info = info;
        this.img = img;
        this.property = property;
        this.sale = sale;
    }
}

export class DTOOrigin {
    id: string;
    name: string;

    constructor (id: string, name: string){
        this.id = id;
        this.name = name;
    }
}