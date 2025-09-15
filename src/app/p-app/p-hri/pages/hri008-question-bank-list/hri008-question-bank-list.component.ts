import { Component } from '@angular/core';
import { DTOQuestion } from '../../shared/dto/DTOQuestion.dto';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { State } from '@progress/kendo-data-query';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { QuestionGroupAPIService } from '../../shared/services/question-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-hri008-question-bank-list',
  templateUrl: './hri008-question-bank-list.component.html',
  styleUrls: ['./hri008-question-bank-list.component.scss']
})
export class Hri008QuestionBankListComponent{

  /**
  * Trạng thái dữ liệu (State) của Grid
  * @type {State}
  */
  gridState: State = { 
    skip: 0, 
    take: 25, 
    filter: { logic: 'and', filters: [] } 
  };

  gridData: GridDataResult = { data: [], total: 0 };


  listDataQuestion: DTOQuestion[] = []

  isLoading: boolean = false

  // Biến phân quyền
  justLoadedChangePermissionAPI: boolean = true

   //dto form Packing Unit
    apiQuestionForm: FormGroup = new FormGroup({
      Code: new FormControl(0),
      Remark: new FormControl(''),
      CategoryName: new FormControl(''),
      Duration: new FormControl(0),
      StatusName: new FormControl(0), 
    })

  // Biến unsubcribe
  ngUnsubscribe = new Subject<void>();

  constructor( 
      public menuService: PS_HelperMenuService,
      private hriAPIService: QuestionGroupAPIService,
      public layoutService: LayoutService,
  ) {}

  ngOnInit(): void { 
    let that = this;

    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.APIGetListQuestion(this.gridState);
      }
    });
  }

  reloadData(){

  }

  onOpendDrawer() {

  }

  onResetFilter() {

  }

  onSearch($event) {}

  onFilterCheckboxChange() {}

  getActionDropdownCallback() {}

  onActionDropdownClickCallback() {}

  APIGetListQuestion (state: State) {
    let ctx = 'Lấy danh sách câu hỏi'
    this.isLoading = true;

    if (!state.take) { state.take = 25; }
    if (!state.skip) { state.skip = 0; }
    if (!state.filter) { state.filter = { logic: 'and', filters: []}}
    
    state.filter.filters.push({
      logic: 'or',
      filters: [
        { field: 'StatusID', operator: 'eq', value: 0 },
        { field: 'StatusID', operator: 'eq', value: 4 }
      ]
    });
    this.hriAPIService.GetListQuestion(state).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if ( Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridData = {
          data: res.ObjectReturn.Data,   // danh sách item của trang
          total: res.ObjectReturn.Total // tổng số bản ghi trong DB
        };
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`);
      }
      this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
      }
    );
  }

  gridTotal: number = 0;

  onPageChange(event: any) {
    this.gridState.skip = event.skip;
    this.gridState.take = event.take;
    this.APIGetListQuestion(this.gridState);
  }


}
