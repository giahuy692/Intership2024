export class DTOSale {
    id: string;
    businessOnline: boolean;
    businessStore: {
        all: boolean;
        cH1: boolean;
        cH2: boolean;
        cH3: boolean;
        cH4: boolean;
        cH5: boolean;
        cH6: boolean;
        
    };

    constructor(
        id: string,
        businessOnline: boolean,
        businessStore: {
            all: boolean;
            cH1: boolean;
            cH2: boolean;
            cH3: boolean;
            cH4: boolean;
            cH5: boolean;
            cH6: boolean;
        },
    ) {
        this.id = id;
        this.businessOnline = businessOnline;
        this.businessStore = businessStore;
    }
}
