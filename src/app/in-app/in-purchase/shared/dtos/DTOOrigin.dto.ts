import { DTOProductSupplier } from "./DTOProductSupplier.dto";

export class DTOOrigin {
    code: number;
    name: string = "";

    dtoProductSupplierCode!: number;
    dtoProductSupplier?: DTOProductSupplier;

    constructor (code: number) {this.code = code}
}