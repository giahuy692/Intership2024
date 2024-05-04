import { Component, Input } from '@angular/core';
import { itemConpany } from '../../dtos/item-company';
import { Company } from '../../dtos/company';

@Component({
  selector: 'app-item-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.scss']
})
export class ItemCompanyComponent {
  companyImportant: boolean = true
  totalPrice: number = 0
  isSelectedCompany: boolean = false
  typeOfMoney: Array<String> = [
    "VND"
  ]
  public listItems: Array<string> = [
    "Baseball",
    "Basketball",
    "Cricket",
    "Field Hockey",
    "Football",
    "Table Tennis",
    "Tennis",
    "Volleyball",
  ];

  company: Array<Company> = [
    {
      code: 1,
      name: "Áp dụng tại công ty TNHH Việt Hạ Chí",
      itemConpany: [
        {
          id: 1,
          name: 'Thức uống',
          child: [
            {
              id: 11,
              name: 'Thức uống có ga',
              child: [
                {
                  id: 111,
                  name: 'Nước ngọt',
                  child: [
                    {
                      id: 1111,
                      name: 'Nước ngọt cola',
                      child: [
                        {
                          id: 11111,
                          name: 'Coca Cola',
                          child: []
                        },
                        {
                          id: 11112,
                          name: 'Pepsi',
                          child: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 12,
              name: 'Thức uống không ga',
              child: [
                {
                  id: 121,
                  name: 'Nước sữa chua',
                  child: [
                    {
                      id: 1211,
                      name: 'Sữa chua Vinamilk',
                      child: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Đồ ăn',
          child: [
            {
              id: 21,
              name: 'Món chính',
              child: [
                {
                  id: 211,
                  name: 'Mì',
                  child: [
                    {
                      id: 2111,
                      name: 'Mì xào',
                      child: []
                    },
                    {
                      id: 2112,
                      name: 'Mì hủ tiếu',
                      child: []
                    }
                  ]
                }
              ]
            },
            {
              id: 22,
              name: 'Tráng miệng',
              child: [
                {
                  id: 221,
                  name: 'Kem',
                  child: [
                    {
                      id: 2211,
                      name: 'Kem vani',
                      child: []
                    },
                    {
                      id: 2212,
                      name: 'Kem dâu',
                      child: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]

  // foodCategories: Array<itemConpany> = [
  //   {
  //     id: 1,
  //     name: 'Thức uống',
  //     child: [
  //       {
  //         id: 11,
  //         name: 'Thức uống có ga',
  //         child: [
  //           {
  //             id: 111,
  //             name: 'Nước ngọt',
  //             child: [
  //               {
  //                 id: 1111,
  //                 name: 'Nước ngọt cola',
  //                 child: [
  //                   {
  //                     id: 11111,
  //                     name: 'Coca Cola',
  //                     child: []
  //                   },
  //                   {
  //                     id: 11112,
  //                     name: 'Pepsi',
  //                     child: []
  //                   }
  //                 ]
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         id: 12,
  //         name: 'Thức uống không ga',
  //         child: [
  //           {
  //             id: 121,
  //             name: 'Nước sữa chua',
  //             child: [
  //               {
  //                 id: 1211,
  //                 name: 'Sữa chua Vinamilk',
  //                 child: []
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'Đồ ăn',
  //     child: [
  //       {
  //         id: 21,
  //         name: 'Món chính',
  //         child: [
  //           {
  //             id: 211,
  //             name: 'Mì',
  //             child: [
  //               {
  //                 id: 2111,
  //                 name: 'Mì xào',
  //                 child: []
  //               },
  //               {
  //                 id: 2112,
  //                 name: 'Mì hủ tiếu',
  //                 child: []
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         id: 22,
  //         name: 'Tráng miệng',
  //         child: [
  //           {
  //             id: 221,
  //             name: 'Kem',
  //             child: [
  //               {
  //                 id: 2211,
  //                 name: 'Kem vani',
  //                 child: []
  //               },
  //               {
  //                 id: 2212,
  //                 name: 'Kem dâu',
  //                 child: []
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  selectedItem1: any
  selectedItem2: any
  selectedItem3: any
  selectedItem4: any
  selectedItem5: any

  onItemChange(event: any, itemchange:number) {
    switch (itemchange){
      case 1:
        this.selectedItem1 = event; 
        this.selectedItem2 = null;
        this.selectedItem3 = null;
        this.selectedItem4 = null;
        this.selectedItem5 = null;
        break
      case 2:
        this.selectedItem2 = event;
        this.selectedItem3 = null;
        this.selectedItem4 = null;
        this.selectedItem5 = null;
        break
      case 3:
        this.selectedItem3 = event;
        this.selectedItem4 = null;
        this.selectedItem5 = null;
        break
      case 4:
        this.selectedItem4 = event;
        this.selectedItem5 = null;
        break
      case 5:
        this.selectedItem5 = event;
        break
    }

  }

  public searchType1: Array<{ id:number, name:string, child:any }>;
  public searchType2: Array<{ id:number, name:string, child:any }>;
  public searchType3: Array<{ id:number, name:string, child:any }>;
  public searchType4: Array<{ id:number, name:string, child:any }>;
  public searchType5: Array<{ id:number, name:string, child:any }>;

  constructor() {
      this.searchType1 = this.company[0].itemConpany.slice();
  }

  handleFilter(value: string, level: number) {
    switch (level) {
        case 1:
          this.searchType1 = this.company[0].itemConpany.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
        case 2:
          this.searchType2 = this.selectedItem1?.child.filter((s: { name: string }) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
        case 3:
          this.searchType3 = this.selectedItem2?.child.filter((s: { name: string }) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
        case 4:
          this.searchType4 = this.selectedItem3?.child.filter((s: { name: string }) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
        case 5:
          this.searchType5 = this.selectedItem4?.child.filter((s: { name: string }) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
      }
  }

  handleClear():void{
    this.selectedItem1 = null;
    this.selectedItem2 = null;
    this.selectedItem3 = null;
    this.selectedItem4 = null;
    this.selectedItem5 = null;
  }
}
