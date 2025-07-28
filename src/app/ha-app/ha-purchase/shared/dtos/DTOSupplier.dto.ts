import { DTOItemSupplier } from "./DTOItemSupplier.dto";

export class DTOSupplier {
    id: string;
    name: string;
    date: Date;
    state: string;
    descrip: string;
    itemList: DTOItemSupplier[];

    constructor (id: string, name: string, date: Date, state: string, descrip: string, itemList: DTOItemSupplier[]){
        this.id = id;
        this.name = name;
        this.date = date;
        this.state = state;
        this.descrip = descrip;
        this.itemList = itemList;
    }
}