import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { DTOQuestion } from '../../shared/dto/DTOQuestion.dto';
import { DTOQuestionGroup } from '../../shared/dto/DTOQuestionGroup.dto';
import { QuestionGroupAPIService } from '../../shared/services/question-api.service';
import { Ps_UtilObjectService } from 'e2e/utils/utility.object';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { PayslipService } from '../../shared/services/payslip.service';
import { DTOAnswer } from '../../shared/dto/DTOAnswer.dto';
import { DTOCompetence } from '../../shared/dto/DTOCompetence.dto';
import { DTOQuestionType } from '../../shared/dto/DTOQuestionType.dto';
import { PKendoEditorComponent } from 'src/app/p-app/p-layout/components/p-kendo-editor/p-kendo-editor.component';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { takeUntil } from 'rxjs/operators';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { ComboBoxComponent, DropDownListComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-hri008-question-bank-detail',
  templateUrl: './hri008-question-bank-detail.component.html',
  styleUrls: ['./hri008-question-bank-detail.component.scss']
})
export class Hri008QuestionBankDetailComponent {

  // Biến editor
  @ViewChild('contentEditor') editorRef: PKendoEditorComponent;
  @ViewChild('dropCompetence') DropCompetenceRef: DropDownListComponent;
  @ViewChild('combobox') comboBoxRef!: ComboBoxComponent;

  // Biến đã load phân quyền API
  justLoadedChangePermissionAPI: boolean = true

  // Biến state phân nhóm câu hỏi
  QuestionGroupState: State = {
    filter: {
      filters: [
        { field: 'StatusID', operator: 'eq', value: 2, ignoreCase: true },
      ],
      logic: 'or',
    },
    sort: [],
  };

  // Biến disabled
  isHide: boolean = false;

  // Biến loading
  isLoading: boolean = false;

  // Biến data câu hỏi
  dataQuestion: DTOQuestion = new DTOQuestion();

  // Biến data gốc của DTOQuestion
  tempQuestion: DTOQuestion = new DTOQuestion();

  // Biến data phân nhóm câu hỏi
  dataListQuestionGroupFilter: DTOQuestionGroup[];

  // Biến data năng lực
  dataQuestionCompetence: DTOCompetence[] = [];
  
  // Biến danh sách năng lực
  ListCompetence: DTOCompetence[] = [];

  // Biến data đáp án
  dataAnswer: DTOAnswer = new DTOAnswer();

  // Biến danh sách đáp án review giả lập
  reviewListAnser: DTOAnswer[] = [];

  // Biến danh sách đáp án
  ListAnswer: DTOAnswer[] = [];

  // Biến danh sách đáp án review thực tế
  realListAnser: DTOAnswer[] = [];

  // Biến mã đáp án đúng cuối cùng
  lastItemIsRightCode: number = 0;

  // Biến mã đáp án sai cuối cùng
  lastItemNotRightCode: number = 0;

  // Biến danh sách Yes/No khi lấy câu hỏi
  answersYesNo: DTOAnswer[] = [];

  // Biến giá trị cũ
  tempOldValue: any;

  // Biến giá trị thay đổi level
  valueChangeLevel: number = null;

  // Biến giá trị thay đổi level name
  valueQuestionLevelName: string = null;

  // Biến giá trị thay đổi năng lực
  valueQuestionCompetenceName: string = null;

  // Biến giá trị thay đổi điểm
  oldMarkValue: number;

  // Biến state năng lực
  CompetenceState: State = {
    filter: { filters: [], logic: 'and' },
    sort: [],
  };

  // Biến dialog  
  openedDialog: boolean = false;
  openLevelDialog: boolean = false;
  openedDialogTypeQuestion: boolean = false;
  openDeleteCompetenceDialog: boolean = false;

  // Biến giá trị thay đổi loại câu hỏi
  valueChangeTypeQuestion: DTOQuestionType = new DTOQuestionType();

  tempValueCompetenceDialog: DTOCompetence = new DTOCompetence();

  // Biến callback lấy file
  getFileCallback: Function;

  // Biến callback lấy folder
  getFolderCallback: Function;

  // Biến giá trị thay đổi tên câu hỏi
  valueQuestionName: string = null;

  // Biến disabled loại đánh giá
  isTypeOfEvaluation: boolean = false;

  // Biến danh sách level
  listLevel: { Code: number, Level: string }[] = [
    { Code: 1, Level: 'Mức độ 1' },
    { Code: 2, Level: 'Mức độ 2' },
    { Code: 3, Level: 'Mức độ 3' },
    { Code: 4, Level: 'Mức độ 4' },
    { Code: 5, Level: 'Mức độ 5' },
  ];

  listBtnStatus: { text: string, code: string, class: string, link: number}[] = [];

  // Biến danh sách loại câu hỏi
  ListQuestionType = new Subject<any>();

  // Biến danh sách cách tính điểm
  ListEvaluationType = new Subject<any>();

  // Biến danh sách unsubscribe
  ngUnsubscribe = new Subject<void>();

  // Biến danh sách đáp án 1 lựa chọn
  answersOneChoice: any[] = [];

  // Biến danh sách đáp án đa lựa chọn
  answersMultiChoice: any[] = [];
  
  justLoadedPer: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isAllPers: boolean = false;
  isCanCreate: boolean = false;
  isAllowed: boolean = false;

  constructor( 
    public menuService: PS_HelperMenuService,
    private serviceQuestionApi: QuestionGroupAPIService,
    public servicePayslip: PayslipService,
    public layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.menuService.changePermissionAPI().subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.servicePayslip.getCacheQuestion().subscribe((res) => {
          this.dataQuestion = res
          this.APIGetQuestion(this.dataQuestion);
          this.APIGetListQuestionGroupTree(this.QuestionGroupState);
          this.APIGetListQuestionType();
          this.APIGetListEvaluationType();
          this.APIGetListAnswer(this.dataQuestion);
          this.APIGetListQuestionCompetence(this.CompetenceState);
          this.getFileCallback = this.onGetFile.bind(this); // Lấy file ảnh 
          this.getFolderCallback = this.onGetFolder.bind(this); // Lấy folder ảnh
        });
      }
    });

    this.menuService
    .changePermission()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedPer) {
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');
        this.isAllPers = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCanCreate = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isAllowed = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;
        this.justLoadedPer = false;
      }
    });
  }

  // Hàm xử lý khi ấn breadcrumb
  reloadData() {
    this.APIGetQuestion(this.dataQuestion);
  }
  
  onShowBtnStatus () {
    this.listBtnStatus = [];
    let allOrCreat = this.isAllPers || this.isCanCreate;
    let allOrAllow = this.isAllPers || this.isAllowed;
    let Status = this.dataQuestion.StatusID;
    if(allOrCreat && (Status === 0 || Status ===4) && this.dataQuestion.Code > 0) {
      this.listBtnStatus.push({
        text: 'GỬI DUYỆT',
        class: 'k-button btn-hachi hachi-primary',
        code: 'redo',
        link: 1,
      })
    }
    if (allOrAllow && (Status === 1 || Status === 3) && this.dataQuestion.Code > 0) {
      this.listBtnStatus.push({
        text: 'PHÊ DUYỆT',
        class: 'k-button btn-hachi hachi-primary',
        code: 'check-outline',
        link: 2,
      });
      this.listBtnStatus.push({
        text: 'TRẢ VỀ',
        class: 'k-button btn-hachi hachi-warning hachi-secondary',
        code: 'undo',
        link: 4,
      });
    }
    if (allOrAllow && Status === 2 && this.dataQuestion.Code > 0) {
      this.listBtnStatus.push({
        text: 'NGƯNG HIỂN THỊ',
        class: 'k-button btn-hachi hachi-warning',
        code: 'minus-outline',
        link: 3,
      });
      this.isHide = true;
    }
    if (allOrCreat && this.dataQuestion.Code > 0 && !Ps_UtilObjectService.hasListValue(this.realListAnser) && !Ps_UtilObjectService.hasListValue(this.dataQuestion.ListCompetence) && this.dataQuestion.StatusID === 0) {
      this.listBtnStatus.push({
        text: 'XÓA CÂU HỎI',
        class: 'k-button btn-hachi hachi-warning',
        code: 'trash',
        link: 5,
      });
    }
    if (allOrCreat && this.dataQuestion.Code > 0) {
      this.listBtnStatus.push({
        text: 'THÊM MỚI',
        class: 'k-button btn-hachi hachi-primary',
        code: 'plus',
        link: 6,
      });
    }
  }

  handleBtnStatus(item: { text: string, class: string, code: string, link: any}) {
    const dto: DTOQuestion[] = [this.dataQuestion];
    switch (item.link) {
      case 1:
        if (this.onCheckFeild()) {
          let listStatus = [];
          listStatus.push(this.dataQuestion);
          let StatusID = parseInt(item.link);
          this.APIUpdateQuestionStatus(listStatus, StatusID);
        }
        break;
      case 2: 
        if(this.onCheckFeild()) {
          let listStatus = [];
          listStatus.push(this.dataQuestion);
          let StatusID = parseInt(item.link);
          this.APIUpdateQuestionStatus(listStatus, StatusID);
        }
        break;
      case 3: 
        if(this.onCheckFeild()) {
          let listStatus = [];
          listStatus.push(this.dataQuestion);
          let StatusID = parseInt(item.link);
          this.APIUpdateQuestionStatus(listStatus, StatusID);
        }
        break;
      case 4: 
        if(this.onCheckFeild()) {
          let listStatus = [];
          listStatus.push(this.dataQuestion);
          let StatusID = parseInt(item.link);
          this.APIUpdateQuestionStatus(listStatus, StatusID);
        }
        break;
      case 5: 
        this.openedDialog = true;
        break;
      case 6: 
        this.dataQuestion = new DTOQuestion();
        this.onShowBtnStatus();
        break;
    }
  }

  onCheckFeild(): boolean {
    let isValid = true;
    if (!Ps_UtilObjectService.hasValueString(this.dataQuestion.Remark)) {
      this.layoutService.onError('Vui lòng nhập tóm tắt câu hỏi')
      isValid = false;
    }
    if (!Ps_UtilObjectService.hasValue(this.dataQuestion.CategoryName)) {
      this.layoutService.onError('Vui lòng chọn phân nhóm câu hỏi')
      isValid = false;
    }
    if (!Ps_UtilObjectService.hasValue(this.dataQuestion.Duration)) {
      this.layoutService.onError('Vui lòng nhập thời gian làm bài')
      isValid = false;
    }
    if (this.dataQuestion.TypeOfQuestion == 1 || this.dataQuestion.TypeOfQuestion == 4) {
      if (!Ps_UtilObjectService.hasListValue(this.realListAnser)) {
        this.layoutService.onError('Vui lòng tạo câu trả lời cho câu hỏi');
        return false;
      }

      if (this.realListAnser.some(x => !Ps_UtilObjectService.hasValueString(x.Answer))) {
        this.layoutService.onError('Vui lòng nhập đầy đủ nội dung cho các câu trả lời');
        return false;
      }

      if (!this.realListAnser.some(x => x.IsRight)) {
        this.layoutService.onError('Vui lòng chọn đáp án đúng');
        return false;
      }
    }
    if (this.dataQuestion.TypeOfQuestion == 2 ) {
      if (this.dataQuestion.TypeOfEvaluation == 1 ||
          this.dataQuestion.TypeOfEvaluation == 2 ||
          this.dataQuestion.TypeOfEvaluation == 3) {
        if (!Ps_UtilObjectService.hasListValue(this.realListAnser)) {
          this.layoutService.onError('Vui lòng tạo câu trả lời cho câu hỏi');
          return false;
        }

        if (this.realListAnser.some(x => !Ps_UtilObjectService.hasValueString(x.Answer))) {
          this.layoutService.onError('Vui lòng nhập đầy đủ nội dung cho các câu trả lời');
          return false;
        }

        if (!this.realListAnser.some(x => x.IsRight)) {
          this.layoutService.onError('Vui lòng chọn ít nhất 1 đáp án đúng');
          return false;
        }
      }
    }
    if (this.dataQuestion.TypeOfQuestion == 3 ) {
      if (!Ps_UtilObjectService.hasValue(this.dataQuestion.RefAnswer)) {
        this.layoutService.onError('Vui lòng nhập đáp án gợi ý cho câu hỏi!');
        return false;
      }
    }
    if (!this.dataQuestion.AppliedCompetenceTest &&
        !this.dataQuestion.AppliedPreTest &&
        !this.dataQuestion.AppliedEventTest) {
      this.layoutService.onError('Vui lòng chọn ít nhất một phạm vi áp dụng!');
      isValid = false;
    }

    if(!Ps_UtilObjectService.hasValue(this.dataQuestion.LevelID)) {
      this.layoutService.onError('Vui lòng chọn mức độ khó!')
      isValid = false;
    }
    if(this.dataQuestion.ListCompetence.length == 0) {
      this.layoutService.onError('Vui lòng chọn năng lực')
    }

    return isValid;
  }
  
  // Hàm xử lý khi chọn level
   onSelectionChangeLevel(event: any) {
    this.ListCompetence.forEach((v) => {
      if (v.Code == event.Level) {
        this.valueQuestionLevelName = v.CompetenceName;
      }
    });
    this.valueChangeLevel = event.Code;
    if (
      this.dataQuestion.LevelID !== 0 &&
      this.dataQuestion.ListCompetence.length !== 0
    ) {
      this.openLevelDialog = true;
    } else {
      this.dataQuestion.LevelID = this.valueChangeLevel;
      this.APIUpdateQuestion(this.dataQuestion, ['LevelID']);
      //this.onLoadFilter(this.dataQuestion);
    }
  }

  // Hàm xử lý khi load filter
  // onLoadFilter(res: DTOQuestion) {
  //   var compositeFilter: CompositeFilterDescriptor = {
  //     logic: 'and',
  //     filters: [],
  //   };
  //   if (res.ListCompetence.length !== 0) {
  //     res.ListCompetence.forEach((v) => {
  //       var competenceFilter: FilterDescriptor = {
  //         field: 'Competence',
  //         operator: 'neq',
  //         value: v.Competence,
  //         ignoreCase: true,
  //       };
  //       compositeFilter.filters.push(competenceFilter);
  //     });
  //   }

  //   const LevelIDFilter: FilterDescriptor = {
  //     field: 'LevelID',
  //     operator: 'eq',
  //     value: res.LevelID,
  //     ignoreCase: true,
  //   };
  //   compositeFilter.filters.push(LevelIDFilter);

  //   this.CompetenceState.filter = compositeFilter;

  //   this.APIGetListQuestionCompetence(this.CompetenceState);
  // }


  // #region API
  // Hàm gọi API Cây danh sách nhóm câu hỏi
  APIGetListQuestionGroupTree(filter: State) {
    const ctx = `Lấy danh sách phân nhóm câu hỏi`;
    this.isLoading = true;

    this.serviceQuestionApi.GetListQuestionGroupTree(filter)
      .subscribe({
        next: (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.dataListQuestionGroupFilter = res.ObjectReturn;
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx} thất bại: ${error}`);
        }
      });
  }
  // Hàm gọi API danh sách loại câu hỏi
  APIGetListQuestionType() {
    const ctx = `Lấy danh sách loại câu hỏi`;
    this.isLoading = true;

    this.serviceQuestionApi.GetListQuestionType()
      .subscribe({
        next: (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.ListQuestionType.next(res.ObjectReturn)
          } 
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx} thất bại: ${error}`);
        }
      });
  }

  // Hàm gọi API danh sách cách tính điểm
  APIGetListEvaluationType() {
    const ctx = `Lấy danh sách cách tính điểm`;
    this.isLoading = true;

    this.serviceQuestionApi.GetListEvaluationType()
      .subscribe({
        next: (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.ListEvaluationType.next(res.ObjectReturn)
          } 
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx} thất bại: ${error}`);
        }
      });
  }

  // Hàm gọi API cập nhật câu hỏi
  APIUpdateQuestion(dto: DTOQuestion, property: Array<string>, skipReloadAnswers: boolean = false) {
    const ctx = dto.Code === 0 ? 'Thêm mới câu hỏi' : 'Cập nhật câu hỏi';
    this.isLoading = true;

    this.serviceQuestionApi.UpdateQuestion(dto, property)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.layoutService.onSuccess(`${ctx} thành công`);
            this.dataQuestion = { ...res.ObjectReturn };
            if (property.includes('Code')) {
              const updatedDto: DTOQuestion = res.ObjectReturn;
              this.APIGetQuestion(updatedDto);
            }
            // Chỉ reload answers khi cần thiết
            if (!skipReloadAnswers) {
              this.APIGetListAnswer(this.dataQuestion);
            }
            
          } else {
            this.layoutService.onError(`${ctx} thất bại: ${res.ErrorString}`);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx} thất bại: ${error}`);
        }
      });
  }

  // Hàm gọi API xóa câu hỏi
  APIDeleteQuestion(arr: DTOQuestion[]) {
    this.isLoading = true;
    var ctx = `Đã xảy ra lỗi khi xóa câu hỏi`
    this.serviceQuestionApi.DeleteQuestion(arr).subscribe(
      res => {
        if (
          Ps_UtilObjectService.hasValue(res) &&
          res.StatusCode == 0
        ) {
          this.isLoading = false;
          this.layoutService.onSuccess('Xóa câu hỏi thành công');
          this.dataQuestion = new DTOQuestion();
          this.ListAnswer = [];
          this.ListCompetence = [];
          this.editorRef.valueChange.emit('');
        }
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx}: ${error}`);
      }
    );
  }

  // Hàm gọi api lấy câu hỏi
  APIGetQuestion(dto: DTOQuestion) {
    const ctx = `Lấy câu hỏi`;
    this.isLoading = true;

    if (dto.Code != 0) {
      this.serviceQuestionApi.GetQuestion(dto)
        .subscribe({
          next: (res: any) => {
            this.isLoading = false;
            if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
              this.dataQuestion = res.ObjectReturn;
              this.tempQuestion = { ...res.ObjectReturn };
              this.isHide = false;
              if (this.dataQuestion.TypeOfQuestion != 3) {
                this.APIGetListAnswer(this.dataQuestion);
              } else {
                this.onShowBtnStatus();
              }
            } else {
              this.layoutService.onError(`${ctx} thất bại: ${res}`);
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.layoutService.onError(`${ctx} thất bại: ${error}`);
          }
        });
    } else {
      this.isLoading = false;
    }
  }

  APIUpdateQuestionStatus(dto: DTOQuestion[], statusID: number) {
    this.isLoading = true;
    this.serviceQuestionApi
      .UpdateQuestionStatus(dto, statusID)
      .subscribe(
        (res: any) => {
          if (
            Ps_UtilObjectService.hasValue(res) &&
            res.StatusCode == 0
          ) {
            this.isLoading = false;
            this.layoutService.onSuccess(
              'Cập nhật trạng thái câu hỏi thành công!'
            );
            this.APIGetQuestion(this.dataQuestion);
            // this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
            // this.APIGetListQuestion(this.gridState);
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái của câu hỏi: ${error}`);
          // this.APIGetListQuestion(this.gridState);
        }
      );
  }

  // Lấy danh sách đáp án theo câu hỏi
  APIGetListAnswer(dtoQuestion: DTOQuestion) {
    this.isLoading = true;
    var ctx = `Đã xảy ra lỗi khi lấy danh sách câu trả lời của câu hỏi`
    let GetListAnswer: any;
    if (this.dataQuestion.TypeOfQuestion !== 3) {
      GetListAnswer = this.serviceQuestionApi.GetListAnswer(dtoQuestion)
        .subscribe(
          res => {
            if (
              Ps_UtilObjectService.hasValue(res) &&
              res.StatusCode == 0
            ) {
              this.isLoading = false;
              this.ListAnswer = res.ObjectReturn;
              
              // Đồng bộ reviewListAnser cho tất cả loại câu hỏi có đáp án
              this.reviewListAnser = Array.isArray(res.ObjectReturn) 
                ? res.ObjectReturn.map((a: DTOAnswer) => ({ ...a }))
                : [];
              
              // Đồng bộ mảng Yes/No hiển thị nếu là câu hỏi Yes/No
              if (this.dataQuestion.TypeOfQuestion === 4) {
                this.answersYesNo = this.reviewListAnser.map(x => ({ ...x }));
              }
              
              this.realListAnser = res.ObjectReturn.slice();
              if (this.dataQuestion.TypeOfQuestion !== 4) {
                for (let i = this.ListAnswer.length; i < 4; i++) {
                  this.ListAnswer.push({
                    Code: 0, Company: 1, Answer: '',
                    ColumnID: null, Question: this.dataQuestion.Code, IsRight: false,
                    Mark: 0, MarkID: 0, RowID: null, IsRow: true, Remark: '',
                    CreateBy: null, CreateTime: null, LastModifiedBy: null, LastModifiedTime: null, RefID: null
                  });
                }
              }
              this.onShowBtnStatus();
              this.handleArrMark();
            }
          },
          (error) => {
            this.isLoading = false;
            this.layoutService.onError(`${ctx}: ${error}`);
          }
        );
    } else {
      this.isLoading = false;
      // Reset reviewListAnser cho câu hỏi tự luận
      this.reviewListAnser = [];
    }
  }

  // Hàm API gọi cập nhật đáp án
  APIUpdateAnswer(dtoAnswer: DTOAnswer, item?: any, skipReload: boolean = false) {
    const ctx = dtoAnswer.Code === 0 ? 'Thêm mới đáp án' : 'Cập nhật đáp án';
    this.isLoading = true;

    this.serviceQuestionApi.UpdateAnswer(dtoAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.layoutService.onSuccess(`${ctx} thành công`);
          const updatedAnswer = res.ObjectReturn;
          if (item) {
            item.Code = updatedAnswer.Code;
            item.RowID = updatedAnswer.RowID;
            item.MarkID = updatedAnswer.MarkID;
            item.IsRight = updatedAnswer.IsRight;
            item.Mark = updatedAnswer.Mark;
          }

          const index = this.reviewListAnser.findIndex(a => a.Code === updatedAnswer.Code);
          if (!skipReload) {
            this.APIGetListAnswer(this.dataQuestion);
          }
          if (index >= 0) {
            this.reviewListAnser[index] = { ...this.reviewListAnser[index], ...updatedAnswer };
          } else {
            this.reviewListAnser.push({ ...updatedAnswer });
          }
        } else {
          this.layoutService.onError(`${ctx} thất bại: ${res}`);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx} thất bại: ${error}`);
      }
    });
  }

  // Hàm gọi API xóa đáp án
  APIDeleteAnswer(dtoAnswer: DTOAnswer[]) {
    if (!dtoAnswer || dtoAnswer.length === 0) return;
    this.isLoading = true;

    this.serviceQuestionApi.DeleteAnswer(dtoAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          // Xóa đáp án khỏi ListAnswer
          this.ListAnswer = this.ListAnswer.filter(
            (item) => !dtoAnswer.some((answer) => answer.Code === item.Code)
          );
          // Nếu dùng Kendo Grid, cần gán lại slice để trigger change detection
          this.ListAnswer = [...this.ListAnswer];

          // Xóa khỏi reviewListAnser
          this.reviewListAnser = this.reviewListAnser.filter(
            r => !dtoAnswer.some(a => a.Code === r.Code)
          );
          this.reviewListAnser = [...this.reviewListAnser];

          // Tính lại điểm cho các đáp án còn lại
          if (this.dataQuestion.TypeOfEvaluation === 1) {
            const checked = this.ListAnswer.find(a => a.IsRight);
            if (checked) {
              checked.Mark = 100;
              this.updateMarksBatch([checked], 'Cập nhật điểm thành công');
            }
          } else if (this.dataQuestion.TypeOfEvaluation === 2) {
            const checked = this.ListAnswer.filter(a => a.IsRight);
            if (checked.length > 0) {
              const base = Math.floor(100 / checked.length);
              let sum = 0;
              checked.forEach((a, idx) => {
                a.Mark = base;
                sum += base;
              });
              if (sum < 100) checked[checked.length - 1].Mark += (100 - sum);
              this.updateMarksBatch(checked, 'Cập nhật điểm thành công');
            }
          }
          if (this.dataQuestion.TypeOfQuestion !== 4) {
            for (let i = this.ListAnswer.length; i < 4; i++) {
              this.ListAnswer.push({
                Code: 0, Company: 1, Answer: '', ColumnID: null,
                Question: this.dataQuestion.Code, IsRight: false, Mark: 0, MarkID: 0,
                RowID: null, IsRow: true, Remark: '', CreateBy: null,
                CreateTime: null, LastModifiedBy: null, LastModifiedTime: null, RefID: null
              });
            }
          }
          this.layoutService.onSuccess('Xóa đáp án thành công');
          this.APIGetListAnswer(this.dataQuestion);
        } else {
          this.layoutService.onError(`Xóa đáp án thất bại: ${res.ErrorString}`);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.layoutService.onError(`Lỗi xóa đáp án: ${err}`);
      }
    });
  }

  // Hàm gọi API UpdateMark và cập nhật reviewListAnser
  APIUpdateMarkSingle(dtoAnswer: DTOAnswer, item?: any) {
    this.isLoading = true;

    this.serviceQuestionApi.UpdateMark(dtoAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.layoutService.onSuccess(`Cập nhật điểm thành công`);
          const updatedAnswer = res.ObjectReturn;

          this.reviewListAnser = this.reviewListAnser.map(a => ({
            ...a,
            IsRight: a.Code === updatedAnswer.Code
          }));
          if (item) {
            item.Mark = updatedAnswer.Mark;
            item.IsRight = true;
          }

        } else {
          this.layoutService.onError(`Cập nhật điểm thất bại: ${res}`);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`Cập nhật điểm thất bại: ${error}`);
      }
    });
  }

  // Hàm gọi API UpdateMark và cập nhật reviewListAnser
APIUpdateMarkMutil(dtoAnswer: DTOAnswer, item?: any, suppressNotify?: boolean) {
  this.isLoading = true;

  this.serviceQuestionApi.UpdateMark(dtoAnswer).subscribe({
    next: (res: any) => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
        if (!suppressNotify) this.layoutService.onSuccess(`Cập nhật điểm thành công`);
        
        const updatedAnswer = res.ObjectReturn;

        this.reviewListAnser = this.reviewListAnser.map(a =>
          a.Code === updatedAnswer.Code
            ? { ...a, IsRight: updatedAnswer.IsRight, Mark: updatedAnswer.Mark }
            : a
        );

        if (item) {
          item.Mark = updatedAnswer.Mark ?? item.Mark;
          // đồng bộ IsRight nếu có
          if (updatedAnswer.IsRight !== undefined) item.IsRight = updatedAnswer.IsRight;
        }
      } else {
        if (!suppressNotify) {
          this.layoutService.onError(`Cập nhật điểm thất bại: ${res}`);
        }
      }
    },
    error: (error) => {
      this.isLoading = false;
      if (!suppressNotify) {
        this.layoutService.onError(`Cập nhật điểm thất bại: ${error}`);
      }
    }
  });
}

// Cập nhật nhiều mark nhưng chỉ hiện 1 thông báo/sai 1 lần
  updateMarksBatch(arr: DTOAnswer[], successMsg: string = 'Cập nhật điểm thành công', failMsg: string = 'Cập nhật điểm thất bại') {
    if (!arr || arr.length === 0) return;

    this.isLoading = true;
    let pending = arr.length;
    let anyError = false;

    arr.forEach(a => {
      // gọi APIUpdateMarkMutil nhưng tắt notify cho từng call
      this.APIUpdateMarkMutil(a, a, true);
      // Bởi vì APIUpdateMarkMutil là bất đồng bộ, chúng ta cần đếm subscribe hoàn tất.
      // Nếu muốn chặt chẽ hơn, gọi serviceQuestionApi.UpdateMark trực tiếp và subscribe ở đây.
      this.serviceQuestionApi.UpdateMark(a).subscribe({
        next: (res: any) => {
          pending--;
          if (!(res && res.StatusCode === 0)) anyError = true;
          if (pending === 0) {
            this.isLoading = false;
            if (!anyError) this.layoutService.onSuccess(successMsg);
            else this.layoutService.onError(failMsg);
          }
        },
        error: (err) => {
          pending--;
          anyError = true;
          if (pending === 0) {
            this.isLoading = false;
            this.layoutService.onError(failMsg + `: ${err}`);
          }
        }
      });
    });
  }


  // Hàm gọi API xóa điểm
 APIDeleteMark(arrAnswer: DTOAnswer[]) {
  if (!arrAnswer || arrAnswer.length === 0) return;
  this.isLoading = true;

  this.serviceQuestionApi.DeleteMark(arrAnswer).subscribe({
    next: (res: any) => {
      this.isLoading = false;
      if (res && res.StatusCode === 0) {
        arrAnswer.forEach(a => {
          a.Mark = 0;
        });

        this.ListAnswer = this.ListAnswer.map(l =>
          arrAnswer.some(a => a.Code === l.Code) ? { ...l, IsRight: false, Mark: 0 } : l
        );

        this.reviewListAnser = this.reviewListAnser.map(r =>
          arrAnswer.some(a => a.Code === r.Code) ? { ...r, IsRight: false, Mark: 0 } : r
        );

        // Chỉ xử lý tính lại cho TypeOfEvaluation=3
        if (this.dataQuestion.TypeOfEvaluation === 3) {
            this.recalculateMarksType3();
        }
      } else {
        this.layoutService.onError('Xóa điểm thất bại');
      }
    },
    error: (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Lỗi xóa điểm: ${err}`);
    }
  });
}

  // Lấy danh sách khía cạnh/năng lực
  APIGetListQuestionCompetence(filter: State) {
    const ctx = 'Lấy danh sách khía cạnh/năng lực';
    this.isLoading = true;

    this.serviceQuestionApi.GetListQuestionCompetence(filter)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasListValue(res.ObjectReturn)) {
            this.ListCompetence = []; // reset trước khi push

            res.ObjectReturn.forEach((item: DTOCompetence, i) => {
              if (item.Parent === null || item.Parent === undefined) {
                item['Order'] = i + 1;
                this.ListCompetence.push(item);
                if (Ps_UtilObjectService.hasListValue(item.ListChilds)) {
                  item.ListChilds.forEach((child: DTOCompetence, j) => {
                    child['Order'] = j + 1;
                    this.ListCompetence.push(child);
                  });
                }
              }
            });
            this.dataQuestionCompetence = this.ListCompetence.slice();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx} thất bại: ${err}`);
        }
      });
  }

  APIUpdateQuestionCompetence(dto: DTOCompetence) {
    this.isLoading = true;
    var ctx = `${dto.Code == 0 ? 'thêm mới' : 'cập nhật'} khía cạnh của câu hỏi`

    this.serviceQuestionApi
      .UpdateQuestionCompetence(dto)
      .subscribe(
        (res: any) => {
          if (
            Ps_UtilObjectService.hasValue(res) &&
            res.StatusCode == 0
          ) {
            this.isLoading = false;
            this.APIGetQuestion(this.dataQuestion);
            this.layoutService.onSuccess(`${ctx} thành công!`);
            this.APIGetListQuestionCompetence(this.CompetenceState)
            this.onShowBtnStatus();
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx}: ${error}`);
          this.APIGetQuestion(this.dataQuestion);
        }
      );
    }
  
    APIDeleteQuestionCompetence(item: DTOCompetence[]) {
      this.isLoading = true;
      const ctx = `xóa khía cạnh của câu hỏi`;
    
      this.serviceQuestionApi.DeleteQuestionCompetence(item)
        .subscribe(
          (res: any) => {
            if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
              this.isLoading = false;
              this.layoutService.onSuccess(`${ctx} thành công!`);
    
              // load lại câu hỏi để refresh danh sách competence
              this.APIGetQuestion(this.dataQuestion);
              this.APIGetListQuestionCompetence(this.CompetenceState)
            } else {
              this.isLoading = false;
              this.layoutService.onError(`${ctx} thất bại!`);
            }
          },
          (error) => {
            this.isLoading = false;
            this.layoutService.onError(`${ctx}: ${error}`);
          }
        );
    }
    

  // Reset lại toàn bộ danh sách đáp án khi đổi loại câu hỏi
  resetReviewAll() {
    this.reviewListAnser = [];
    this.answersOneChoice = [];
    this.answersMultiChoice = [];
    this.answersYesNo = [];
  }

  // endregion

  // #region Xử lý Update
  // Hàm xử lý cập nhật câu hỏi
  handleUpdateQuestion(property: Array<string>, skipReloadAnswers: boolean = false) {
    if (!this.dataQuestion.QuestionID) return;

    // if (property.includes("Remark") && this.dataQuestion.Remark.trim() === '') {
    //   return;
    // }

    // if (property.includes("Duration")  && this.dataQuestion.Duration === 0 ) {
    //   return;
    // }
    
    if (this.dataQuestion.Code === 0) {
      this.dataQuestion.TypeOfQuestion = 1;
      this.dataQuestion.TypeOfQuestionName = 'Câu hỏi 1 lựa chọn';
      
      property.push('TypeOfQuestion', 'TypeOfQuestionName');
    }
    property = Array.from(new Set(property));
    this.APIUpdateQuestion(this.dataQuestion, property, skipReloadAnswers);
  }

  // Hàm xử lý cập nhật dropdown list
  onSelectionChangeDropdownList(e: any, title: string) {
    if (title === "phannhom") {
      this.dataQuestion.Category = e.Code;
      this.dataQuestion.CategoryName = e.CategoryName;
      this.handleUpdateQuestion(["Category", "CategoryName"]);
    }
    if (title == 'loaicauhoi') {
      if (
        this.dataQuestion.Code !== 0 &&
        this.realListAnser.length != 0 &&
        Ps_UtilObjectService.hasValue(this.dataQuestion.TypeOfQuestion)
      ) {
        this.openedDialogTypeQuestion = true;
        this.valueChangeTypeQuestion = e;
      } else {
        switch (e.TypeData) {
          case 1:
            this.dataQuestion.TypeOfQuestion = e.TypeData;
            this.dataQuestion.TypeOfQuestionName = e.TypeOfQuestion;
            this.dataQuestion.TypeOfEvaluation = null;
            this.dataQuestion.TypeOfEvaluationName = null;
            this.handleUpdateQuestion(['TypeOfQuestion', 'TypeOfQuestionName', 'TypeOfEvaluation', 'TypeOfEvaluationName']);
            break;
          case 2:
            this.dataQuestion.TypeOfQuestion = e.TypeData;
            this.dataQuestion.TypeOfQuestionName = e.TypeOfQuestion;
            this.dataQuestion.TypeOfEvaluation = 1;
            this.dataQuestion.TypeOfEvaluation = 1;
            this.dataQuestion.TypeOfEvaluationName = 'Chọn đúng tất cả đáp án';
            this.handleUpdateQuestion(['TypeOfQuestion', 'TypeOfQuestionName', 'TypeOfEvaluation', 'TypeOfEvaluationName']);
            break;
          case 3:
            this.dataQuestion.TypeOfQuestion = e.TypeData;
            this.dataQuestion.TypeOfQuestionName = e.TypeOfQuestion;
            this.dataQuestion.TypeOfEvaluation = null;
            this.dataQuestion.TypeOfEvaluationName = null;
            this.dataQuestion.Min = 0;
            this.dataQuestion.Max = 4000;
            this.handleUpdateQuestion(['TypeOfQuestion', 'TypeOfQuestionName', 'TypeOfEvaluation', 'TypeOfEvaluationName', 'Min', 'Max']);
            break;
          case 4:
            this.dataQuestion.TypeOfQuestion = e.TypeData;
            this.dataQuestion.TypeOfQuestionName = e.TypeOfQuestion;
            this.dataQuestion.TypeOfEvaluation = null;
            this.dataQuestion.TypeOfEvaluationName = null;
            this.handleYesNO();
            break;
        }
      }
    }

    if (title === "cachtinhdiem") {
      this.dataQuestion.TypeOfEvaluation = e.TypeData;
      this.dataQuestion.TypeOfEvaluationName = e.TypeOfEvaluation;
      this.handleUpdateQuestion(["TypeOfEvaluation", "TypeOfEvaluationName"]);
    }
  }

  // Hàm xử lý khi chọn Yes/No
  handleYesNO() {
    // Đảm bảo set loại câu hỏi là Yes/No
    this.dataQuestion.TypeOfQuestion = 4;
    this.dataQuestion.TypeOfQuestionName = this.dataQuestion.TypeOfQuestionName || 'Câu hỏi Yes/No';
    this.dataQuestion.TypeOfEvaluation = null;
    this.dataQuestion.TypeOfEvaluationName = null;

    const yesAnswer = new DTOAnswer();
    yesAnswer.Answer = "Yes";
    yesAnswer.Code = 0;
    yesAnswer.ColumnID = null;
    yesAnswer.Company = 1;
    yesAnswer.CreateBy = null;
    yesAnswer.CreateTime = null;
    yesAnswer.IsRight = false;
    yesAnswer.IsRow = true;
    yesAnswer.LastModifiedBy = null;
    yesAnswer.LastModifiedTime = null;
    yesAnswer.Mark = 0;
    yesAnswer.MarkID = 0;
    yesAnswer.Question = this.dataQuestion.Code;
    yesAnswer.RefID = null;
    yesAnswer.Remark = null;
    yesAnswer.RowID = null;

    const noAnswer: DTOAnswer = { ...yesAnswer, Answer: "No" } as DTOAnswer;

    // Tạo 2 đáp án Yes/No, bỏ qua reload để tránh gọi API nhiều lần
    this.APIUpdateAnswer(yesAnswer, undefined, true);
    this.APIUpdateAnswer(noAnswer, undefined, true);

    // Cập nhật lại thông tin câu hỏi về loại câu hỏi
    this.handleUpdateQuestion([
      'TypeOfQuestion',
      'TypeOfQuestionName',
      'TypeOfEvaluation',
      'TypeOfEvaluationName'
    ], true);

    // Chỉ gọi 1 lần duy nhất để reload answers sau khi tạo xong
    setTimeout(() => {
      this.APIGetListAnswer(this.dataQuestion);
    }, 100);
  }

  // Hàm xử lý khi mở dropdown list
  onOpenDropList(type: string) {
    if (type == 'khiacanh') {
      let questionCompetence = { ...this.dataQuestion };
      this.tempOldValue = questionCompetence;
    }
  }

  // Hàm xử lý lưu nội dung editor
  onSaveContentEditor(content: string) {
    this.dataQuestion.Question = content;
    if (this.dataQuestion.Question == null) {
      return;
    }
    this.handleUpdateQuestion(["Question"]);
  }

  // Hàm xử lý cập nhật checkbox của block phạm vi áp dụng
  onChangeCheckedScope(title: string) {
    if(title == 'AppliedCompetenceTest') {
      this.dataQuestion.AppliedCompetenceTest == true
      this.handleUpdateQuestion(["AppliedCompetenceTest"]);
    }
    if(title == 'AppliedPreTest') {
      this.dataQuestion.AppliedPreTest == true;
      this.handleUpdateQuestion(["AppliedPreTest"]);
    }
    if(title == 'AppliedEventTest') {
      this.dataQuestion.AppliedEventTest == true;
      this.handleUpdateQuestion(["AppliedEventTest"]);
    }
  }
  // endregion

  // #region Xử lý Block phương án trả lời

  // Hàm thêm đáp án
  onAddAnswer() {
    const addRow = {
      Code: 0,
      Company: 1,
      Answer: '',
      ColumnID: null,
      Question: this.dataQuestion.Code,
      IsRight: false,
      Mark: 0,
      MarkID: 0,
      RowID: null,
      IsRow: true,
      Remark: '',
      CreateBy: null,
      CreateTime: null,
      LastModifiedBy: null,
      LastModifiedTime: null,
      RefID: null,
      ReasonChooseAnswerForAppeal: null,
    };
    this.ListAnswer.push(addRow);
  }
  

  // Khi blur khỏi input câu trả lời
  onInputAnswer(item: any) {
    if (!item) return;

    const dtoAnswer: DTOAnswer = new DTOAnswer();
    dtoAnswer.Code = item.Code;
    dtoAnswer.Question = this.dataQuestion.Code;
    dtoAnswer.Answer = item.Answer.trim();
    dtoAnswer.IsRight = item.isActive;
    dtoAnswer.Mark = item.Mark;
    dtoAnswer.Remark = item.Remark;

    this.APIUpdateAnswer(dtoAnswer, item);
  }

  // Khi focus vào input
  focusAnswer(item: any) {
    if (!item.Answer || item.Answer.trim() === '') {
      item.IsRight = false;
    }
  }

 // Khi bấm nút xoá
  onDeleteAnswer(answer: DTOAnswer) {
    if (!answer) return;
    this.APIDeleteAnswer([answer]);
  }

  // hàm xử lý Khi chọn radio
  onOptionChange(answer: any) {
    if (!answer) return;
    // TypeOfQuestion === 1
    if (this.dataQuestion.TypeOfQuestion === 1) {
      this.answersOneChoice = this.answersOneChoice.map(a => ({
        ...a,
        IsRight: a === answer
      }));

      const dtoAnswer: DTOAnswer = new DTOAnswer();
      dtoAnswer.Code = answer.Code;
      dtoAnswer.Answer = this.dataAnswer.Answer;
      dtoAnswer.Question = this.dataQuestion.Code;
      dtoAnswer.IsRight = true; 
      dtoAnswer.IsRow = true;
      dtoAnswer.Mark = 100;

      this.APIUpdateMarkSingle(dtoAnswer);
      return;
    }

  }

  // Hàm xử lý khi thay đổi nội dung editor
  onEditorValueChange(data: string, type: number) {
    if (type == 1) {
      this.dataQuestion.RefAnswer = data;
    } else {
      this.dataQuestion.Question = data;
    }
  }

  // Hàm xử lý khi thay đổi checkbox (cho câu hỏi đa lựa chọn)
  handleCheckBoxChange(item: DTOAnswer) {
    if (!item) return;

      if (!item.IsRight) {
        // Bỏ tick → xóa mark và reload danh sách từ server
        item.Mark = 0;
        this.APIDeleteMark([item]);
        
        // Reload danh sách đáp án để lấy dữ liệu mới từ server
        setTimeout(() => {
          this.APIGetListAnswer(this.dataQuestion);
        }, 300);
        return;
      }

    // Tick mới
    if (this.dataQuestion.TypeOfEvaluation === 1) {
      // Chỉ 1 đáp án đúng
      this.ListAnswer.forEach(ans => {
        ans.IsRight = ans.Code === item.Code;
        ans.Mark = ans.Code === item.Code ? 100 : 0;
      });
      this.reviewListAnser.forEach(r => {
        r.IsRight = r.Code === item.Code;
        r.Mark = r.Code === item.Code ? 100 : 0;
      });
      this.APIUpdateMarkMutil(item, item);

    } else if (this.dataQuestion.TypeOfEvaluation === 2) {
      // Chia đều 100 điểm
      const checked = this.ListAnswer.filter(a => a.IsRight);
      if (checked.length > 0) {
        const base = Math.floor(100 / checked.length);
        let sum = 0;
        checked.forEach((a, idx) => {
          a.Mark = base;
          sum += base;
        });
        if (sum < 100) checked[checked.length - 1].Mark += (100 - sum);

        // Đồng bộ reviewList
        this.reviewListAnser.forEach(r => {
          const found = checked.find(c => c.Code === r.Code);
          if (found) {
            r.IsRight = true;
            r.Mark = found.Mark;
          } else {
            r.IsRight = false;
            r.Mark = 0;
          }
        });

        // Cập nhật API
        checked.forEach(a => this.APIUpdateMarkMutil(a, a, false));
      }
    } else if (this.dataQuestion.TypeOfEvaluation === 3) {
      // Trừ các đáp án sai - tính lại toàn bộ
      this.recalculateMarksType3();
    }
  }

  // Hàm xử lý khi thay đổi radio button Yes/No
  handleYesNoChange(selectedItem: DTOAnswer) {
    if (!selectedItem) return;

    // Với Yes/No, chỉ có 1 đáp án được chọn
    this.answersYesNo.forEach(answer => {
      if (answer.Code === selectedItem.Code) {
        answer.IsRight = true;
        answer.Mark = 100;
        this.APIUpdateMarkMutil(answer, answer);
      } else {
        if (answer.IsRight) {
          // Bỏ chọn đáp án khác
          answer.IsRight = false;
          answer.Mark = 0;
          this.APIDeleteMark([answer]);
        }
      }
    });

    // Đồng bộ với ListAnswer và reviewListAnser
    this.ListAnswer.forEach(ans => {
      const yesNoItem = this.answersYesNo.find(yn => yn.Code === ans.Code);
      if (yesNoItem) {
        ans.IsRight = yesNoItem.IsRight;
        ans.Mark = yesNoItem.Mark;
      }
    });

    this.reviewListAnser.forEach(review => {
      const yesNoItem = this.answersYesNo.find(yn => yn.Code === review.Code);
      if (yesNoItem) {
        review.IsRight = yesNoItem.IsRight;
        review.Mark = yesNoItem.Mark;
      }
    });
  }

  // Hàm xử lý tick / bỏ tick hoặc nhập điểm
  onCalculateMark(item: DTOAnswer, action: 'not' | 'input') {
    if (!item) return;

    const typeEval = this.dataQuestion.TypeOfEvaluation;

    // TypeOfEvaluation = 1 → tick = 100, bỏ tick = 0
    if (typeEval === 1) {
      if (action === 'not') {
        if (item.IsRight) {
          item.Mark = 100;
          this.updateMarksBatch([item], 'Cập nhật điểm thành công');
        } else {
          this.APIDeleteMark([item]);
        }
      }
      if (action === 'input') {
        // Nhập tay → update answer (APIUpdateAnswer) - bạn đã có
        this.APIUpdateAnswer(item, item);
      }
      return;
    }

    // TypeOfEvaluation = 2 → chia đều 100
    if (typeEval === 2) {
      let checkedAnswers = this.ListAnswer.filter(a => a.IsRight && a.Answer && a.Answer.trim() !== '');

      if (action === 'not') {
        if (!item.IsRight) {
          this.APIDeleteMark([item]);
          checkedAnswers = this.ListAnswer.filter(a => a.IsRight && a.Answer && a.Answer.trim() !== '');
        }
        if (checkedAnswers.length > 0) {
          const base = Math.floor(100 / checkedAnswers.length);
          let sum = 0;
          checkedAnswers.forEach((a, idx) => {
            a.Mark = base;
            sum += base;
          });
          if (sum < 100) {
            checkedAnswers[checkedAnswers.length - 1].Mark += (100 - sum);
          }
          this.updateMarksBatch(checkedAnswers, 'Cập nhật điểm thành công');
        }
      }

      if (action === 'input') {
        // Khi người dùng nhập item.Mark -> chia phần còn lại cho các đáp án khác
        if (!checkedAnswers.some(a => a.Code === item.Code)) {
          checkedAnswers.push(item); // đảm bảo item thuộc checked
        }
        const others = checkedAnswers.filter(a => a.Code !== item.Code);
        let remain = 100 - (item.Mark ?? 0);
        if (remain < 0) remain = 0;

        if (others.length > 0) {
          const perOther = Math.floor(remain / others.length);
          let sum = 0;
          others.forEach((a, idx) => {
            a.Mark = perOther;
            sum += perOther;
          });
          const leftover = remain - sum;
          if (leftover > 0) {
            // cộng phần dư vào phần tử cuối
            others[others.length - 1].Mark += leftover;
          }
          // batch update: update others và item
          const toUpdate = [...others, item];
          this.updateMarksBatch(toUpdate, 'Cập nhật điểm thành công');
        } else {
          // chỉ có 1 đáp án được tick -> item nhận 100 (người có thể nhập khác, nhưng đảm bảo tổng)
          item.Mark = Math.min(100, item.Mark ?? 0);
          this.updateMarksBatch([item], 'Cập nhật điểm thành công');
        }
      }
    }

    // TypeOfEvaluation = 3 → Trừ các đáp án sai
    if (typeEval === 3) {
      if (action === 'not') {
        // Khi tick/bỏ tick → tính lại toàn bộ
        this.recalculateMarksType3();
      }
      
      if (action === 'input') {
        // Khi nhập điểm thủ công
        if (item.IsRight) {
          // Đáp án đúng: chỉ cho phép nhập số dương
          if (item.Mark < 0) {
            item.Mark = 0;
          }
        } else {
          // Đáp án sai: chỉ cho phép nhập số âm
          if (item.Mark > 0) {
            item.Mark = 0;
          }
        }
        this.APIUpdateAnswer(item, item);
      }
    }
  }

 // Hàm xử lý khi thay đổi cách tính điểm cho TypeOfEvaluation = 3 (Trừ các đáp án sai)
 recalculateMarksType3() {
   if (this.dataQuestion.TypeOfEvaluation !== 3) return;

   const checked = this.ListAnswer.filter(a => a.IsRight && a.Answer && a.Answer.trim() !== '');
   const unchecked = this.ListAnswer.filter(a => !a.IsRight && a.Answer && a.Answer.trim() !== '');

   // --- xử lý nhóm tick (đáp án đúng) - chia đều 100 điểm ---
   if (checked.length > 0) {
     const base = Math.floor(100 / checked.length);
     let sum = 0;
     checked.forEach((a, i) => {
       a.Mark = base;
       sum += base;
     });
     // bù chênh lệch vào đáp án cuối
     if (sum < 100) checked[checked.length - 1].Mark += (100 - sum);
   }

   // --- xử lý nhóm không tick (đáp án sai) - chia đều -100 điểm ---
   if (unchecked.length > 0) {
     const base = Math.floor(-100 / unchecked.length);
     let sum = 0;
     unchecked.forEach((a, i) => {
       a.Mark = base;
       sum += base;
     });
     // bù chênh lệch vào đáp án cuối
     if (sum > -100) unchecked[unchecked.length - 1].Mark += (-100 - sum);
   }

   // Đồng bộ reviewListAnser
   this.reviewListAnser.forEach(r => {
     const foundChecked = checked.find(c => c.Code === r.Code);
     const foundUnchecked = unchecked.find(u => u.Code === r.Code);
     
     if (foundChecked) {
       r.IsRight = true;
       r.Mark = foundChecked.Mark;
     } else if (foundUnchecked) {
       r.IsRight = false;
       r.Mark = foundUnchecked.Mark;
     }
   });

   // Gọi API update cho tất cả đáp án có thay đổi
   const toUpdate = [...checked, ...unchecked];
   toUpdate.forEach(a => this.APIUpdateMarkMutil(a, a, true));
 }
  // Hàm xử lý khi focus điểm
  onFocusMark(item: DTOAnswer) {
    this.oldMarkValue = item.Mark; // lưu lại điểm cũ
  }


  // Khi blur khỏi textbox câu trả lời
  onInputAnswerChange(item: DTOAnswer) {
    if (!item || !item.Answer?.trim()) return;
    this.APIUpdateAnswer(item, item);
  }


// Hàm xử lý mảng liên quan đó đáp án phần câu đúng/sai/check đầu/ non-check cuổi..
  handleArrMark() {
    const selectedItems = this.ListAnswer.filter(
      (item) => item.IsRight && item.Answer !== ''
    );
    const itemLastChecked = selectedItems[selectedItems.length - 1]; // Lấy item cuối cùng được checked
    this.lastItemIsRightCode = itemLastChecked?.Code;
    const AnswerFalseList = this.ListAnswer.filter(
      // Lấy item không được checked
      (item) => item.IsRight === false
    );
    const itemLastNotCheck = AnswerFalseList[AnswerFalseList.length - 1]; //Lấy item cuối cùng không được check
    this.lastItemNotRightCode = itemLastNotCheck?.Code;
  }

  // Khi blur combobox
onBlurComboBox() {
  // Reset filter lại full list khi blur
  this.dataQuestionCompetence = this.ListCompetence.slice();
}

// Khi focus combobox
onFocusComboBox() {
  // Có thể load lại dữ liệu nếu cần
  if (!this.ListCompetence || this.ListCompetence.length === 0) {
    this.APIGetListQuestionCompetence(this.CompetenceState);
  }
}


  // Hàm xử lý khi filter
  handleFilter(value: string) {
    this.dataQuestionCompetence = this.ListCompetence.filter(
      (s) => s.CompetenceName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  // Hàm xử lý khi disabled item bên trong dropdown của khía cạnh
  isItemDisabled(itemArgs: { dataItem: any; index: number }) {
    return itemArgs.dataItem.Parent === null;
  }
  
  // Khi chọn Competence trong combobox
  onValueChangeCompetence(value: DTOCompetence): void {
    const item: DTOCompetence = {
      ...value,
      Question: this.dataQuestion.Code,
      LevelID: this.dataQuestion.LevelID,
      Code: value.Code ?? 0
    };
  
    if (item.LevelID > 0 && Ps_UtilObjectService.hasValue(value)) {
      this.APIUpdateQuestionCompetence(item);
    } else {
      this.layoutService.onError('Vui lòng chọn mức độ khó!');
      this.DropCompetenceRef.reset();
    }
  
    this.comboBoxRef.reset(); // luôn reset để chọn lại được
  }
  
  onDeleteCompetence(item: DTOCompetence) {
    this.tempValueCompetenceDialog = item;  
    this.valueQuestionCompetenceName = item.CompetenceName;
    this.openDeleteCompetenceDialog = true;
  }

  onCloseDialogLevel() {
    
  }

  onCloseDialog () {
    this.openedDialog = false;
  }

  onDeleteDialog(type: string) {
    if(type === 'yes'){
      this.APIDeleteQuestion([this.dataQuestion]);
      this.openedDialog = false;
    }
  }

  // 
  onCloseDialogTypeQuestion() {
    this.dataQuestion.TypeOfQuestion = this.tempQuestion.TypeOfQuestion
    this.openedDialogTypeQuestion = false;
  }

  // 
  onChangeDialogTypeQuestion(status: string): void {
    if (status == 'yes') {
      // Reset các mảng đáp án trước khi chuyển loại
      this.ListAnswer = [];
      this.reviewListAnser = [];
      this.answersYesNo = [];
      switch (this.valueChangeTypeQuestion.TypeData) {
        case 1:
          this.dataQuestion.TypeOfQuestion = 1;
          //this.isTypeOfEvaluation = true;
          this.dataQuestion.TypeOfQuestion = this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName = this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = null;
          this.dataQuestion.TypeOfEvaluationName = null;
          this.handleUpdateQuestion(['TypeOfQuestion', 'TypeOfQuestionName', 'TypeOfEvaluation', 'TypeOfEvaluationName']);
          this.openedDialogTypeQuestion = false;
          break;
        case 2:
          this.dataQuestion.TypeOfQuestion = 2;
          //this.isTypeOfEvaluation = false;
          this.dataQuestion.TypeOfQuestion = this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName = this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = 1;
          this.dataQuestion.TypeOfEvaluation = 1;
          this.dataQuestion.TypeOfEvaluationName = 'Chọn đúng tất cả đáp án';
          this.handleUpdateQuestion(['TypeOfQuestion', 'TypeOfQuestionName', 'TypeOfEvaluation', 'TypeOfEvaluationName']);
          this.openedDialogTypeQuestion = false;
          break;
        case 3:
          this.dataQuestion.TypeOfQuestion = 3;
          //this.isTypeOfEvaluation = true;
          this.dataQuestion.TypeOfQuestion = this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName = this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = null;
          this.dataQuestion.TypeOfEvaluationName = null;
          this.handleUpdateQuestion(['TypeOfQuestion', 'TypeOfQuestionName', 'TypeOfEvaluation', 'TypeOfEvaluationName']);
          this.openedDialogTypeQuestion = false;
          break;
        case 4:
          this.dataQuestion.TypeOfQuestion = 4;
          //this.isTypeOfEvaluation = true;
          this.dataQuestion.TypeOfQuestion = this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName = this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = null;
          this.dataQuestion.TypeOfEvaluationName = null;
          this.handleYesNO();
          this.openedDialogTypeQuestion = false;
          break;
      }
    } else {
      this.openedDialogTypeQuestion = false;
    }
  }
  
  handleDialogLevel() {
    
  }

  onCloseDialogCompetence() {
    this.openDeleteCompetenceDialog = false;

  }

  handleDialogCompetence() {
      let temp = [];
      this.tempValueCompetenceDialog.ListChilds.forEach((v) => {
        temp.push(v);
      });
      this.APIDeleteQuestionCompetence(temp);
    this.openDeleteCompetenceDialog = false;
  }

  onGetFile() {}

  onGetFolder() {}

  // endregion
  ngOnDestroy(): void{
    this.ngUnsubscribe.unsubscribe();
  }

}
