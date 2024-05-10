import { DTOItemCompany } from "./DTOItemCompany.dto";

export class DTOCompany{
    code: number;
    name: string;
    require?: boolean;
    itemConpany: DTOItemCompany[]
}