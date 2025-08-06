export class DTOAttributeProduct {
    code: number = 1;
    code1Dropdown: number = 0;
    label1Dropdown: string = '';
    code2Dropdown: number = 0;
    label2Dropdown: string = '';
    code3Dropdown: number = 0;
    label3Dropdown: string = '';
    code4Dropdown: number = 0;
    label4Dropdown: string = '';
    code5Dropdown: number = 0;
    label5Dropdown: string = '';
    code6Dropdown: number = 0;
    label6Dropdown: string = '';
    code7Dropdown: number = 0;
    label7Dropdown: string = '';

    unit: string = '';
    shipper: string = '';
    maker: string = '';

    productSize: SizeInfo = new SizeInfo();
    productInner: SizeInfo = new SizeInfo();
    productCarton: SizeInfo = new SizeInfo();
    productPallet: SizeInfo = new SizeInfo();
    productPacking: SizeInfo = new SizeInfo();

    productSpecificationConversion: {
        inner: number;
        carton: number;
        pallet: number;
    };

    expiry: Date | string = '';
    expiryWarningDays: number = 30;
    isManageExpiry: boolean = true;
    daysFromManufacture: number = 0;

    specifications: string = '';
}

export class SizeInfo {
    size1: number = 12;
    size2: number = 12;
    size3: number = 12;
    weight: number = 120;
}

