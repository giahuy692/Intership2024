import { DTOItemSupplier } from "./DTOItemSupplier.dto";

export class DTOSupplier {
    code: number;
    name: string = "";
    date: Date;
    state: string;
    descrip: string;
    itemList: DTOItemSupplier[];

    constructor(name?: string){
        this.name = name
    }
}


var  a = new DTOSupplier()
// var  a = new DTOSupplier("Quang")


// -> a = {name = ""}
// -> a = {name = "Quang"}