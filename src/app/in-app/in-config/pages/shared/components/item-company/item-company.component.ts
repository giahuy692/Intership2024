import { Component } from '@angular/core';
import { itemConpany } from '../../dtos/item-company';

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

  foodCategories: Array<itemConpany> = [
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
  ];

  selectedCategory1: any
  selectedCategory2: any
  selectedCategory3: any
  selectedCategory4: any
  selectedCategory5: any

  onItemChange(event: any, itemchange:number) {
    switch (itemchange){
      case 1:
        this.selectedCategory1 = event; 
        this.selectedCategory2 = null;
        this.selectedCategory3 = null;
        this.selectedCategory4 = null;
        this.selectedCategory5 = null;
        break
      case 2:
        this.selectedCategory2 = event;
        this.selectedCategory3 = null;
        this.selectedCategory4 = null;
        this.selectedCategory5 = null;
        break
      case 3:
        this.selectedCategory3 = event;
        this.selectedCategory4 = null;
        this.selectedCategory5 = null;
        break
      case 4:
        this.selectedCategory4 = event;
        this.selectedCategory5 = null;
        break
      case 5:
        this.selectedCategory5 = event;
        break
    }

  }

  public data: Array<{ id:number, name:string, child:any }>;

  constructor() {
      this.data = this.foodCategories.slice();
  }

  handleFilter(value: string, level: number) {
    switch (level) {
        case 1:
          this.data = this.foodCategories.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
        case 2:
          this.data = this.selectedCategory1?.child.filter((s: { name: string }) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          break;
        default:
            break;
      }
  }

  handleClear():void{
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
    this.selectedCategory3 = null;
    this.selectedCategory4 = null;
    this.selectedCategory5 = null;
  }

  
}
