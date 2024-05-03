import { Component } from '@angular/core';

@Component({
  selector: 'app-item-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.scss']
})
export class ItemCompanyComponent {
  companyImportant: boolean = true
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
}
