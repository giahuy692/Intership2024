import { core } from "@angular/compiler"
import { DTOProduct } from "./DTOProduct.dto"

export class DTOHamperTest{
    State?: string 
    CompanyList?: any[]
    TotalPrice?: number
    Currency?: string
    OtherInfo?: string
    ProductList?: DTOProduct[]
    InfoHamber?: {
        barcode?: string,
        vietnameseName?: string,
        englishName?: string,
        japaneseName?: string,
        origin?: number,
        vietnameseMaterial?: string,
        englishMaterial?: string,
        japaneseMaterial?: string,
        image?: string,
        baseUnit?: number,
        productSize?:{
          long?: number,
          width?: number,
          height?: number,
          weight?: number
        },
        innerSize?:{
          long?: number,
          width?: number,
          height?: number,
          weight?: number
        },
        cartonSize?: {
          long?: number,
          width?: number,
          height?: number,
          weight?: number
        },
        palletSize?: {
          long?: number,
          width?: number,
          height?: number,
          weight?: number
        },
        innerBaseUnit?: number,
        cartonBaseUnit?: number,
        palletInnerBaseUnit?: number
      }
}