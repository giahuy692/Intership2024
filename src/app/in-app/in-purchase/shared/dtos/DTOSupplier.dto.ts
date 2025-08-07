import { DTOProductSupplier } from "./DTOProductSupplier.dto";

export class DTOSupplier {
    code: number = 0;
    name: string = "";
    date: Date | string;
    state: string = "";
    descrip: string = "";

    dtoProductSupplier: DTOProductSupplier[];
}

