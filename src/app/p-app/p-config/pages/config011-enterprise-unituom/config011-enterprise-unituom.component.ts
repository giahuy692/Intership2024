import { Component, ViewChild } from '@angular/core';
import { DTOPackingUnit } from '../../shared/dto/DTOPackingUnit';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-config011-enterprise-unituom',
  templateUrl: './config011-enterprise-unituom.component.html',
  styleUrls: ['./config011-enterprise-unituom.component.scss']
})
export class Config011EnterpriseUnituomComponent {

  @ViewChild('formDrawer') public drawer: MatDrawer;

  // varible of grid
  loading: boolean = false

  dataUnitUom: DTOPackingUnit[] = []

  //dto form Packing Unit
  apiPackingUnitForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    VNPackingUnit: new FormControl(''),
    JPPackingUnit: new FormControl(''),
    ENPackingUnit: new FormControl(''),
    orderBy: new FormControl(null), 
    TypeData: new FormControl(1),
  })

  reloadData() {}

  onOpendDrawer() {
    this.drawer.open();
  }

  onCloseForm() {
    this.drawer.close()
  }

  onResetFilter() {}

  onSearch(e) {}

  getActionDropdownCallback(){}

  onActionDropdownClickCallback() {}

  onUpdateDistrict() {}

  openDialogDistrict() {}
}
