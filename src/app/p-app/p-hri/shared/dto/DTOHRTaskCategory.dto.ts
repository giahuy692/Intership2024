export class DTOHRLSTask {
    Code: number = 0;
    Company: number = 0;
    ID: string = "";
    Name: string = "";
    Description: string = "";
    Duration: number = 0;
    Status: number = 0;
    CreatedBy: string = "";
    CreatedTime: Date = new Date();
    LastModifiedBy: string = "";
    LastModifiedTime: Date = new Date();
}

export class DTOHRLSTaskCus {
    Code: number = 0;
    Company: number = 0;
    ID: string = "";
    Name: string = "";
    Description: string = "";
    Duration: number = 0;
    Status: number = 0;
    StatusName: string ='';
    CreatedBy: string = "";
    CreatedTime: Date = new Date();
    LastModifiedBy: string = "";
    LastModifiedTime: Date = new Date(); 
}