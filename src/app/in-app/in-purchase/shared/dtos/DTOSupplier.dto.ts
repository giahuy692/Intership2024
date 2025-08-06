import { DTOProductSupplier } from "./DTOProductSupplier.dto";

export class DTOSupplier {
    code: number;
    name: string = "";
    date?: Date;
    state: string = "";
    descrip: string = "";

    dtoProductSupplier: DTOProductSupplier[];

    constructor (code: number) { this.code = code};
}