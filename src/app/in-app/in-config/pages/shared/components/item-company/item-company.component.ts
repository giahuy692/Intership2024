import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { itemConpany } from '../../dtos/item-company';
import { Company } from '../../dtos/company';
import { Observable, BehaviorSubject } from 'rxjs'; 
import { companyData } from '../../../config004-hamper-detail/data-test';


@Component({
  selector: 'app-item-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.scss']
})
export class ItemCompanyComponent{
  isSelectedCompany: boolean = true
  private itemCompanySelectedSubject = new BehaviorSubject<any[]>([]);
  itemCompanySelected$ = this.itemCompanySelectedSubject.asObservable();
  // @Input() company: Array<Company> = []
  @Input() important: boolean = false
  @Input() totalPrice: number = 0
  @Output() itemCompany = new EventEmitter<any[]>();
  company: Array<Company> = companyData

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

  
  selectedItem1: any
  selectedItem2: any
  selectedItem3: any
  selectedItem4: any
  selectedItem5: any
  

  handleSelectedItem(selectedItem1: any, selectedItem2: any, selectedItem3: any, selectedItem4: any, selectedItem5: any){
    const selectedItems = [{level1: selectedItem1}, {level2: selectedItem2}, {level3: selectedItem3},{level4: selectedItem4},{level5: selectedItem5}];
    this.itemCompanySelectedSubject.next(selectedItems);
    console.log(selectedItems);
  }

  onSelectionChange(event: any, itemChange: number) {
    const selectedValue = event.selected ? event.selected : null;
    this.onItemChange(selectedValue, itemChange);
  }


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
    this.handleSelectedItem(this.selectedItem1, this.selectedItem2, this.selectedItem3, this.selectedItem4, this.selectedItem5)

  }

  defaultItem = { id: -1, name: "--- Chọn ---"};
  searchType1: Array<{ id:number, name:string, child:any }>;
  searchType2: Array<{ id:number, name:string, child:any }>;
  searchType3: Array<{ id:number, name:string, child:any }>;
  searchType4: Array<{ id:number, name:string, child:any }>;
  searchType5: Array<{ id:number, name:string, child:any }>;

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
