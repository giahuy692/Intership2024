import { DTOItemCompany } from "./DTOItemCompany.dto";

export class DTOCompany{
    code?: number;
    name?: string;
    required?: boolean;
    state?: boolean;
    itemCompany?: DTOItemCompany[]
}