import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DTOItemCompany } from '../../dtos/DTOItemCompany.dto';
import { DTOCompany } from '../../dtos/DTOCompany.dto';
import { Observable, BehaviorSubject } from 'rxjs'; 
import { DataDefautCompany } from './dataDefault';

/**Component Công ty áp dụng
 * - Truyền vào dạng data [setValue]=[{code: number, name: string, child:[]}]
 * - Data trả về 
 *  - [getValue]=[{code: number, name: string, itemSelected: [{level1: string}, {level2: string}, {level3:string}, {level4:string}, {level5:string}]}]
 *  - 
**/


@Component({
  selector: 'app-item-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ItemCompanyComponent implements OnInit{
  @Input() setValue: Array<DTOCompany> = DataDefautCompany
  @Input() important: boolean = false
  @Input() totalPrice: number = 0
  @Input() disableCheckbox: boolean = false
  @Output() getValue = new EventEmitter<any>();
  @Input() isSelectedCompany: boolean = false


  selectedItem1: any = null
  selectedItem2: any = null
  selectedItem3: any = null
  selectedItem4: any = null
  selectedItem5: any = null

  typeOfMoney: Array<String> = [
    "VND"
  ]
  


  ngOnInit(): void {
    this.searchType1 = this.setValue[0].itemCompany.slice();
    this.handleSelectedItem(this.selectedItem1, this.selectedItem2, this.selectedItem3, this.selectedItem4, this.selectedItem5)
  }

  constructor() {
 
  }

  handleSelectedItem(selectedItem1: any, selectedItem2: any, selectedItem3: any, selectedItem4: any, selectedItem5: any){
    const selectedItems = {code: this.setValue[0].code,require  : this.important ,state: this.isSelectedCompany ,name: this.setValue[0].name,itemSelected: [{level1: selectedItem1}, {level2: selectedItem2}, {level3: selectedItem3},{level4: selectedItem4},{level5: selectedItem5}]}
    this.getValue.emit(selectedItems);
  }
 
  onItemChange(event: any, itemchange:number) {
    switch (itemchange){
      case 1:
        if(event === this.defaultItem){
          this.selectedItem1 = null; 
        }else{
          this.selectedItem1 = event; 
        }
        this.selectedItem2 = null;
        this.selectedItem3 = null;
        this.selectedItem4 = null;
        this.selectedItem5 = null;
        break
      case 2:
        if(event === this.defaultItem){
          this.selectedItem2 = null;
        }else{
          this.selectedItem2 = event;
        }
        this.selectedItem3 = null;
        this.selectedItem4 = null;
        this.selectedItem5 = null;
        break
      case 3:
        if(event === this.defaultItem){
          this.selectedItem3 = null;
        }else{
          this.selectedItem3 = event;
        }
        this.selectedItem4 = null;
        this.selectedItem5 = null;
        break
      case 4:
        if(event === this.defaultItem){
          this.selectedItem4 = null;
        }else{
          this.selectedItem4 = event;
        }
        this.selectedItem5 = null;
        break
      case 5:
        if(event === this.defaultItem){
          this.selectedItem5 = null;
        }else{
          this.selectedItem5 = event;
        }
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



  handleFilter(value: string, level: number) {
    switch (level) {
        case 1:
          this.searchType1 = this.setValue[0].itemCompany.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
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
    this.handleSelectedItem(this.selectedItem1, this.selectedItem2, this.selectedItem3, this.selectedItem4, this.selectedItem5)
  }
}
