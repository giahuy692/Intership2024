import { DTOItemSupplier } from "./DTOItemSupplier.dto";

export class DTOSupplier {
    code?: number;
    name?: string;
    date?: Date;
    state?: string;
    descrip?: string;
    itemList?: DTOItemSupplier[];
}