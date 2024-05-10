import { DTOItemCompany } from "./DTOItemCompany.dto";

export class DTOCompany{
    code: number;
    name: string;
    state?: boolean;
    itemCompany: DTOItemCompany[]
}