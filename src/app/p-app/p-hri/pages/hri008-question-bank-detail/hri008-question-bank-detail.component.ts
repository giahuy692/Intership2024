import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { DTOQuestion } from '../../shared/dto/DTOQuestion.dto';
import { DTOQuestionGroup } from '../../shared/dto/DTOQuestionGroup.dto';
import { QuestionGroupAPIService } from '../../shared/services/question-api.service';
import { Ps_UtilObjectService } from 'e2e/utils/utility.object';
import {
  CompositeFilterDescriptor,
  distinct,
  FilterDescriptor,
  State,
} from '@progress/kendo-data-query';
import { PayslipService } from '../../shared/services/payslip.service';
import { DTOAnswer } from '../../shared/dto/DTOAnswer.dto';
import { DTOCompetence } from '../../shared/dto/DTOCompetence.dto';
import { DTOQuestionType } from '../../shared/dto/DTOQuestionType.dto';
import { PKendoEditorComponent } from 'src/app/p-app/p-layout/components/p-kendo-editor/p-kendo-editor.component';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { takeUntil } from 'rxjs/operators';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import {
  ComboBoxComponent,
  DropDownListComponent,
} from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-hri008-question-bank-detail',
  templateUrl: './hri008-question-bank-detail.component.html',
  styleUrls: ['./hri008-question-bank-detail.component.scss'],
})
export class Hri008QuestionBankDetailComponent {
  // Biến editor
  @ViewChild('contentEditor') editorRef: PKendoEditorComponent;
  @ViewChild('dropCompetence') DropCompetenceRef: DropDownListComponent;
  @ViewChild('combobox') comboBoxRef!: ComboBoxComponent;

  // Biến đã load phân quyền API
  justLoadedChangePermissionAPI: boolean = true;

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

  dataCompetence: DTOCompetence = new DTOCompetence();

  // Biến danh sách năng lực
  ListCompetence: DTOCompetence[] = [];

  // Biến data năng lực đã chọn
  selectedCompetences: DTOCompetence[] = [];

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
  CompetenceState: { filter: CompositeFilterDescriptor } = {
    filter: { logic: 'and', filters: [] },
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
  listLevel: { Code: number; Level: string }[] = [
    { Code: 1, Level: 'Mức độ 1' },
    { Code: 2, Level: 'Mức độ 2' },
    { Code: 3, Level: 'Mức độ 3' },
    { Code: 4, Level: 'Mức độ 4' },
    { Code: 5, Level: 'Mức độ 5' },
  ];

  listBtnStatus: { text: string; code: string; class: string; link: number }[] =
    [];

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
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.menuService.changePermissionAPI().subscribe((res) => {
      if (
        Ps_UtilObjectService.hasValue(res) &&
        this.justLoadedChangePermissionAPI
      ) {
        this.justLoadedChangePermissionAPI = false;
        this.servicePayslip.getCacheQuestion().subscribe((res) => {
          this.dataQuestion = res;
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
          this.isAllPers =
            this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
          this.isCanCreate =
            this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
          this.isAllowed =
            this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;
          this.justLoadedPer = false;
        }
      });
  }

  // Hàm xử lý khi ấn breadcrumb
  reloadData() {
    this.APIGetQuestion(this.dataQuestion);
  }

  onShowBtnStatus() {
    this.listBtnStatus = [];
    let allOrCreat = this.isAllPers || this.isCanCreate;
    let allOrAllow = this.isAllPers || this.isAllowed;
    let Status = this.dataQuestion.StatusID;
    if (
      allOrCreat &&
      (Status === 0 || Status === 4) &&
      this.dataQuestion.Code > 0
    ) {
      this.listBtnStatus.push({
        text: 'GỬI DUYỆT',
        class: 'k-button btn-hachi hachi-primary',
        code: 'redo',
        link: 1,
      });
    }
    if (
      allOrAllow &&
      (Status === 1 || Status === 3) &&
      this.dataQuestion.Code > 0
    ) {
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
    if (
      allOrCreat &&
      this.dataQuestion.Code > 0 &&
      !Ps_UtilObjectService.hasListValue(this.realListAnser) &&
      !Ps_UtilObjectService.hasListValue(this.dataQuestion.ListCompetence) &&
      this.dataQuestion.StatusID === 0
    ) {
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

  handleBtnStatus(item: {
    text: string;
    class: string;
    code: string;
    link: any;
  }) {
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
        if (this.onCheckFeild()) {
          let listStatus = [];
          listStatus.push(this.dataQuestion);
          let StatusID = parseInt(item.link);
          this.APIUpdateQuestionStatus(listStatus, StatusID);
        }
        break;
      case 3:
        if (this.onCheckFeild()) {
          let listStatus = [];
          listStatus.push(this.dataQuestion);
          let StatusID = parseInt(item.link);
          this.APIUpdateQuestionStatus(listStatus, StatusID);
        }
        break;
      case 4:
        if (this.onCheckFeild()) {
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
      this.layoutService.onError('Vui lòng nhập tóm tắt câu hỏi');
      isValid = false;
    }
    if (!Ps_UtilObjectService.hasValueString(this.dataQuestion.Question)) {
      this.layoutService.onError('Vui lòng nhập mô tả chi tiết câu hỏi');
      isValid = false;
    }
    if (!Ps_UtilObjectService.hasValue(this.dataQuestion.CategoryName)) {
      this.layoutService.onError('Vui lòng chọn phân nhóm câu hỏi');
      isValid = false;
    }
    if (!Ps_UtilObjectService.hasValue(this.dataQuestion.Duration)) {
      this.layoutService.onError('Vui lòng nhập thời gian làm bài');
      isValid = false;
    }
    if (
      this.dataQuestion.TypeOfQuestion == 1 ||
      this.dataQuestion.TypeOfQuestion == 4
    ) {
      if (!Ps_UtilObjectService.hasListValue(this.realListAnser)) {
        this.layoutService.onError('Vui lòng tạo câu trả lời cho câu hỏi');
        return false;
      }

      if (
        this.realListAnser.some(
          (x) => !Ps_UtilObjectService.hasValueString(x.Answer)
        )
      ) {
        this.layoutService.onError(
          'Vui lòng nhập đầy đủ nội dung cho các câu trả lời'
        );
        return false;
      }

      if (!this.realListAnser.some((x) => x.IsRight)) {
        this.layoutService.onError('Vui lòng chọn đáp án đúng');
        return false;
      }
    }
    if (this.dataQuestion.TypeOfQuestion == 2) {
      if (
        this.dataQuestion.TypeOfEvaluation == 1 ||
        this.dataQuestion.TypeOfEvaluation == 2 ||
        this.dataQuestion.TypeOfEvaluation == 3
      ) {
        if (!Ps_UtilObjectService.hasListValue(this.realListAnser)) {
          this.layoutService.onError('Vui lòng tạo câu trả lời cho câu hỏi');
          return false;
        }

        if (
          this.realListAnser.some(
            (x) => !Ps_UtilObjectService.hasValueString(x.Answer)
          )
        ) {
          this.layoutService.onError(
            'Vui lòng nhập đầy đủ nội dung cho các câu trả lời'
          );
          return false;
        }

        if (!this.realListAnser.some((x) => x.IsRight)) {
          this.layoutService.onError('Vui lòng chọn ít nhất 1 đáp án đúng');
          return false;
        }
      }
    }
    if (this.dataQuestion.TypeOfQuestion == 3) {
      if (!Ps_UtilObjectService.hasValue(this.dataQuestion.RefAnswer)) {
        this.layoutService.onError('Vui lòng nhập đáp án gợi ý cho câu hỏi!');
        return false;
      }
    }
    if (
      !this.dataQuestion.AppliedCompetenceTest &&
      !this.dataQuestion.AppliedPreTest &&
      !this.dataQuestion.AppliedEventTest
    ) {
      this.layoutService.onError('Vui lòng chọn ít nhất một phạm vi áp dụng!');
      isValid = false;
    }

    if (!Ps_UtilObjectService.hasValue(this.dataQuestion.LevelID)) {
      this.layoutService.onError('Vui lòng chọn mức độ khó!');
      isValid = false;
    }
    if (this.dataQuestion.ListCompetence.length == 0) {
      this.layoutService.onError('Vui lòng chọn năng lực');
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
    }
  }

  // #region API
  // Hàm gọi API Cây danh sách nhóm câu hỏi
  APIGetListQuestionGroupTree(filter: State) {
    const ctx = `Lấy danh sách phân nhóm câu hỏi`;
    this.isLoading = true;

    this.serviceQuestionApi.GetListQuestionGroupTree(filter).subscribe({
      next: (res) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.dataListQuestionGroupFilter = res.ObjectReturn;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx} thất bại: ${error}`);
      },
    });
  }
  // Hàm gọi API danh sách loại câu hỏi
  APIGetListQuestionType() {
    const ctx = `Lấy danh sách loại câu hỏi`;
    this.isLoading = true;

    this.serviceQuestionApi.GetListQuestionType().subscribe({
      next: (res) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.ListQuestionType.next(res.ObjectReturn);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx} thất bại: ${error}`);
      },
    });
  }

  // Hàm gọi API danh sách cách tính điểm
  APIGetListEvaluationType() {
    const ctx = `Lấy danh sách cách tính điểm`;
    this.isLoading = true;

    this.serviceQuestionApi.GetListEvaluationType().subscribe({
      next: (res) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.ListEvaluationType.next(res.ObjectReturn);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx} thất bại: ${error}`);
      },
    });
  }

  // Hàm gọi API cập nhật câu hỏi
  APIUpdateQuestion(
    dto: DTOQuestion,
    property: Array<string>,
    skipReloadAnswers: boolean = false
  ) {
    const ctx = dto.Code === 0 ? 'Thêm mới câu hỏi' : 'Cập nhật câu hỏi';
    this.isLoading = true;

    this.serviceQuestionApi.UpdateQuestion(dto, property).subscribe({
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
      },
    });
  }

  // Hàm gọi API xóa câu hỏi
  APIDeleteQuestion(arr: DTOQuestion[]) {
    this.isLoading = true;
    var ctx = `Đã xảy ra lỗi khi xóa câu hỏi`;
    this.serviceQuestionApi.DeleteQuestion(arr).subscribe(
      (res) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
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
      this.serviceQuestionApi.GetQuestion(dto).subscribe({
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
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  APIUpdateQuestionStatus(dto: DTOQuestion[], statusID: number) {
    this.isLoading = true;
    this.serviceQuestionApi.UpdateQuestionStatus(dto, statusID).subscribe(
      (res: any) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
          this.isLoading = false;
          this.layoutService.onSuccess(
            'Cập nhật trạng thái câu hỏi thành công!'
          );
          this.APIGetQuestion(this.dataQuestion);
        }
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.onError(
          `Đã xảy ra lỗi khi cập nhật trạng thái của câu hỏi: ${error}`
        );
        // this.APIGetListQuestion(this.gridState);
      }
    );
  }

  // Lấy danh sách đáp án theo câu hỏi
  APIGetListAnswer(dtoQuestion: DTOQuestion) {
    this.isLoading = true;
    const ctx = `Đã xảy ra lỗi khi lấy danh sách câu trả lời của câu hỏi`;

    if (this.dataQuestion.TypeOfQuestion !== 3) {
      this.serviceQuestionApi.GetListAnswer(dtoQuestion).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            const data = Array.isArray(res.ObjectReturn)
              ? res.ObjectReturn
              : [];

            // Giữ nguyên IsRight/Mark hiện tại trên FE nếu có
            this.ListAnswer = data.map((a) => {
              const exist = this.ListAnswer?.find((l) => l.Code === a.Code);
              return exist
                ? { ...a, IsRight: exist.IsRight, Mark: exist.Mark }
                : { ...a };
            });

            this.reviewListAnser = this.ListAnswer.map((a) => ({ ...a }));

            // đáp án trống nếu cần
            if (this.dataQuestion.TypeOfQuestion !== 4) {
              for (let i = this.ListAnswer.length; i < 4; i++) {
                this.ListAnswer.push({
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
                });
              }
            }

            this.realListAnser = data.slice();
            this.onShowBtnStatus();
            this.handleArrMark();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.layoutService.onError(`${ctx}: ${err}`);
        },
      });
    } else {
      this.isLoading = false;
      this.reviewListAnser = [];
    }
  }

  // Hàm API gọi cập nhật đáp án
  APIUpdateAnswer(dtoAnswer: DTOAnswer) {
    const ctx = dtoAnswer.Code === 0 ? 'Thêm mới đáp án' : 'Cập nhật đáp án';
    this.isLoading = true;

    this.serviceQuestionApi.UpdateAnswer(dtoAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.layoutService.onSuccess(`${ctx} thành công`);
          const updatedAnswer = res.ObjectReturn;

            // === Đồng bộ lại toàn bộ các mảng ===
        const syncArray = (arr: DTOAnswer[]) => {
          const idx = arr.findIndex(a => a.Code === dtoAnswer.Code);
          if (idx >= 0) arr[idx] = { ...arr[idx], ...updatedAnswer };
          else arr.push({ ...updatedAnswer });
          return [...arr];
        };

        this.ListAnswer = syncArray(this.ListAnswer);
        this.reviewListAnser = syncArray(this.reviewListAnser);
        this.realListAnser = [...this.reviewListAnser];

        this.onShowBtnStatus();
        } else {
          this.layoutService.onError(`${ctx} thất bại: ${res}`);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx} thất bại: ${error}`);
      },
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
            (r) => !dtoAnswer.some((a) => a.Code === r.Code)
          );
          this.reviewListAnser = [...this.reviewListAnser];

          // Tính lại điểm cho các đáp án còn lại
          if (this.dataQuestion.TypeOfEvaluation === 1) {
            const checked = this.ListAnswer.find((a) => a.IsRight);
            if (checked) {
              checked.Mark = 100;
              this.updateMarksBatch([checked], 'Cập nhật điểm thành công');
            }
          } else if (this.dataQuestion.TypeOfEvaluation === 2) {
            const checked = this.ListAnswer.filter((a) => a.IsRight);
            if (checked.length > 0) {
              const base = Math.floor(100 / checked.length);
              let sum = 0;
              checked.forEach((a, idx) => {
                a.Mark = base;
                sum += base;
              });
              if (sum < 100) checked[checked.length - 1].Mark += 100 - sum;
              this.updateMarksBatch(checked, 'Cập nhật điểm thành công');
            }
          }
          if (this.dataQuestion.TypeOfQuestion !== 4) {
            for (let i = this.ListAnswer.length; i < 4; i++) {
              this.ListAnswer.push({
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
      },
    });
  }

  // Hàm gọi API UpdateMark và cập nhật reviewListAnser
  APIUpdateMarkSingle(dtoAnswer: DTOAnswer) {
    this.isLoading = true;

    this.serviceQuestionApi.UpdateMark(dtoAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.layoutService.onSuccess(`Cập nhật điểm thành công`);
          const updated = res.ObjectReturn;

          const updateAll = (arr: DTOAnswer[]) =>
          arr.map(a =>
            a.Code === updated.Code
              ? { ...a, Mark: updated.Mark, IsRight: updated.IsRight }
              : a
          );

        this.ListAnswer = updateAll(this.ListAnswer);
        this.reviewListAnser = updateAll(this.reviewListAnser);
        this.realListAnser = updateAll(this.realListAnser);

        // Gán lại để trigger change detection
        this.ListAnswer = [...this.ListAnswer];
        this.reviewListAnser = [...this.reviewListAnser];
        this.realListAnser = [...this.realListAnser];
        } else {
          this.layoutService.onError(`Cập nhật điểm thất bại: ${res}`);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`Cập nhật điểm thất bại: ${error}`);
      },
    });
  }

  // Hàm gọi API UpdateMark và cập nhật reviewListAnser
  APIUpdateMarkMutil(dtoAnswer: DTOAnswer) {
    this.isLoading = true;

    this.serviceQuestionApi.UpdateMark(dtoAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.layoutService.onSuccess(`Cập nhật điểm thành công`);

          const updatedAnswer = res.ObjectReturn;

          this.reviewListAnser = this.reviewListAnser.map((a) =>
            a.Code === updatedAnswer.Code
              ? {
                  ...a,
                  IsRight: updatedAnswer.IsRight,
                  Mark: updatedAnswer.Mark,
                }
              : a
          );
        } else {
          this.layoutService.onError(`Cập nhật điểm thất bại: ${res}`);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.layoutService.onError(`Cập nhật điểm thất bại: ${error}`);
      },
    });
  }

  // Cập nhật nhiều mark nhưng chỉ hiện 1 thông báo/sai 1 lần
  updateMarksBatch(
    arr: DTOAnswer[],
    successMsg: string = 'Cập nhật điểm thành công',
    failMsg: string = 'Cập nhật điểm thất bại'
  ) {
    if (!arr || arr.length === 0) return;

    this.isLoading = true;
    let pending = arr.length;
    let anyError = false;

    arr.forEach((a) => {
      // gọi APIUpdateMarkMutil nhưng tắt notify cho từng call
      this.APIUpdateMarkMutil(a);
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
        },
      });
    });
  }

  // Hàm gọi API xóa điểm
  APIDeleteMark(arrAnswer: DTOAnswer[], done?: () => void) {
    if (!arrAnswer || arrAnswer.length === 0) return;
    this.isLoading = true;

    this.serviceQuestionApi.DeleteMark(arrAnswer).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res && res.StatusCode === 0) {
          arrAnswer.forEach((a) => {
            a.Mark = 0;
            a.IsRight = false;
            a.MarkID = 0;
            a.RefID = null;
          });

          this.ListAnswer = this.ListAnswer.map((l) =>
            arrAnswer.some((a) => a.Code === l.Code)
              ? { ...l, IsRight: false, Mark: 0, MarkID: 0, RefID: null }
              : l
          );

          this.reviewListAnser = this.reviewListAnser.map((r) =>
            arrAnswer.some((a) => a.Code === r.Code)
              ? { ...r, IsRight: false, Mark: 0, MarkID: 0, RefID: null }
              : r
          );

          if (done) done(); // gọi callback khi xóa xong
        } else {
          this.layoutService.onError('Xóa điểm thất bại');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.layoutService.onError(`Lỗi xóa điểm: ${err}`);
      },
    });
  }

  // Lấy danh sách khía cạnh/năng lực
  APIGetListQuestionCompetence(filter: State) {
    const ctx = 'Lấy danh sách khía cạnh/năng lực';
    this.isLoading = true;

    this.serviceQuestionApi.GetListQuestionCompetence(filter).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (Ps_UtilObjectService.hasListValue(res.ObjectReturn)) {
          const allCompetences = res.ObjectReturn;
          let tempList: DTOCompetence[] = [];

          // Gom cha + con
          allCompetences.forEach((item: DTOCompetence, i) => {
            if (!item.Parent) {
              item['Stt'] = i + 1;
              tempList.push(item);

              if (Ps_UtilObjectService.hasListValue(item.ListChilds)) {
                item.ListChilds.forEach((child: DTOCompetence, j) => {
                  child['Stt'] = j + 1;
                  tempList.push(child);
                });
              }
            }
          });

          this.ListCompetence = tempList;
          this.dataQuestionCompetence = this.ListCompetence.slice();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.layoutService.onError(`${ctx} thất bại: ${err}`);
      },
    });
  }

  APIUpdateQuestionCompetence(dto: DTOCompetence) {
    this.isLoading = true;
    var ctx = `${
      dto.Code == 0 ? 'thêm mới' : 'cập nhật'
    } khía cạnh của câu hỏi`;

    this.serviceQuestionApi.UpdateQuestionCompetence(dto).subscribe(
      (res: any) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
          this.isLoading = false;
          this.APIGetQuestion(this.dataQuestion);
          this.layoutService.onSuccess(`${ctx} thành công!`);
          this.onFilterCompetence();
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

    this.serviceQuestionApi.DeleteQuestionCompetence(item).subscribe(
      (res: any) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
          this.isLoading = false;
          this.layoutService.onSuccess(`${ctx} thành công!`);

          // load lại câu hỏi để refresh danh sách competence
          this.APIGetQuestion(this.dataQuestion);
          this.APIGetListQuestionCompetence(this.CompetenceState);
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
  // endregion

  // #region Xử lý Update
  // Hàm xử lý cập nhật câu hỏi
  handleUpdateQuestion(
    property: Array<string>,
    skipReloadAnswers: boolean = false
  ) {
    if (!this.dataQuestion.QuestionID) return;

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
    if (title === 'phannhom') {
      this.dataQuestion.Category = e.Code;
      this.dataQuestion.CategoryName = e.CategoryName;
      this.handleUpdateQuestion(['Category', 'CategoryName']);
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
            this.handleUpdateQuestion([
              'TypeOfQuestion',
              'TypeOfQuestionName',
              'TypeOfEvaluation',
              'TypeOfEvaluationName',
            ]);
            break;
          case 2:
            this.dataQuestion.TypeOfQuestion = e.TypeData;
            this.dataQuestion.TypeOfQuestionName = e.TypeOfQuestion;
            this.dataQuestion.TypeOfEvaluation = 1;
            this.dataQuestion.TypeOfEvaluation = 1;
            this.dataQuestion.TypeOfEvaluationName = 'Chọn đúng tất cả đáp án';
            this.handleUpdateQuestion([
              'TypeOfQuestion',
              'TypeOfQuestionName',
              'TypeOfEvaluation',
              'TypeOfEvaluationName',
            ]);
            break;
          case 3:
            this.dataQuestion.TypeOfQuestion = e.TypeData;
            this.dataQuestion.TypeOfQuestionName = e.TypeOfQuestion;
            this.dataQuestion.TypeOfEvaluation = null;
            this.dataQuestion.TypeOfEvaluationName = null;
            this.dataQuestion.Min = 0;
            this.dataQuestion.Max = 4000;
            this.handleUpdateQuestion([
              'TypeOfQuestion',
              'TypeOfQuestionName',
              'TypeOfEvaluation',
              'TypeOfEvaluationName',
              'Min',
              'Max',
            ]);
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

    if (title === 'cachtinhdiem') {
      this.dataQuestion.TypeOfEvaluation = e.TypeData;
      this.dataQuestion.TypeOfEvaluationName = e.TypeOfEvaluation;
      this.handleUpdateQuestion(['TypeOfEvaluation', 'TypeOfEvaluationName']);
    }
  }

  // Hàm xử lý khi chọn Yes/No
  handleYesNO() {
    // Đảm bảo set loại câu hỏi là Yes/No
    this.dataQuestion.TypeOfQuestion = 4;
    this.dataQuestion.TypeOfQuestionName = this.dataQuestion.TypeOfQuestionName;
    this.dataQuestion.TypeOfEvaluation = null;
    this.dataQuestion.TypeOfEvaluationName = null;
    this.ListAnswer = [];

    const yesAnswer = new DTOAnswer();
    yesAnswer.Answer = 'Yes';
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

    const noAnswer: DTOAnswer = { ...yesAnswer, Answer: 'No' } as DTOAnswer;

    // Tạo 2 đáp án Yes/No, bỏ qua reload để tránh gọi API nhiều lần
    this.APIUpdateAnswer(yesAnswer);
    this.APIUpdateAnswer(noAnswer);

    // Cập nhật lại thông tin câu hỏi về loại câu hỏi
    this.handleUpdateQuestion(
      [
        'TypeOfQuestion',
        'TypeOfQuestionName',
        'TypeOfEvaluation',
        'TypeOfEvaluationName',
      ],
      true
    );

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
    this.handleUpdateQuestion(['Question']);
  }

  // Hàm xử lý cập nhật checkbox của block phạm vi áp dụng
  onChangeCheckedScope(title: string) {
    if (title == 'AppliedCompetenceTest') {
      this.dataQuestion.AppliedCompetenceTest == true;
      this.handleUpdateQuestion(['AppliedCompetenceTest']);
    }
    if (title == 'AppliedPreTest') {
      this.dataQuestion.AppliedPreTest == true;
      this.handleUpdateQuestion(['AppliedPreTest']);
    }
    if (title == 'AppliedEventTest') {
      this.dataQuestion.AppliedEventTest == true;
      this.handleUpdateQuestion(['AppliedEventTest']);
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
  onInputAnswer(item: DTOAnswer) {
    // Nếu nội dung rỗng => gọi API xóa
    if (!item.Answer || !item.Answer.trim()) {
      // Chỉ xóa nếu item đã tồn tại trong DB (Code > 0)
      if (item.Code && item.Code > 0) {
        this.APIDeleteAnswer([item]);
      }
      return;
    }

    // Nếu có nội dung => gọi API cập nhật
    this.APIUpdateAnswer(item);
  }

  // Khi focus vào input
  onfocusAnswer(item: any) {
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
 onOptionChange(selectedItem: DTOAnswer) {
  this.ListAnswer.forEach((answer) => {
    if (answer.Code === selectedItem.Code) {
      answer.IsRight = true;
      answer.Mark = 100;
    } else {
      answer.IsRight = false;
      answer.Mark = 0;
    }
  });

  // Nếu đáp án chưa có trong DB => thêm mới trước khi cập nhật mark
  if (!selectedItem.Code || selectedItem.Code === 0) {
    this.APIUpdateAnswer(selectedItem); // Lưu đáp án -> BE trả về Code mới
    return;
  }

  const dtoToUpdate: DTOAnswer = {
    ...selectedItem,
    IsRight: true,
    Mark: 100,
  };

  this.APIUpdateMarkSingle(dtoToUpdate);
}


  // Hàm xử lý khi thay đổi nội dung editor
  onEditorValueChange(data: string, type: number) {
    if (type == 1) {
      this.dataQuestion.RefAnswer = data;
    } else {
      this.dataQuestion.Question = data;
    }
  }

  // Hàm xử lý khi thay đổi radio button Yes/No
  handleYesNoChange(selectedItem: DTOAnswer) {
    if (!selectedItem) return;

    // Với Yes/No, chỉ có 1 đáp án được chọn
    this.ListAnswer.forEach((answer) => {
      if (answer.Code === selectedItem.Code) {
        answer.IsRight = true;
        answer.Mark = 100;
        this.APIUpdateMarkSingle(answer);
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
    this.ListAnswer.forEach((ans) => {
      const yesNoItem = this.answersYesNo.find((yn) => yn.Code === ans.Code);
      if (yesNoItem) {
        ans.IsRight = yesNoItem.IsRight;
        ans.Mark = yesNoItem.Mark;
      }
    });

    this.reviewListAnser.forEach((review) => {
      const yesNoItem = this.answersYesNo.find((yn) => yn.Code === review.Code);
      if (yesNoItem) {
        review.IsRight = yesNoItem.IsRight;
        review.Mark = yesNoItem.Mark;
      }
    });
  }

  // Hàm xử lý tick / bỏ tick hoặc nhập điểm
  onCalculateMark(item: DTOAnswer, action: 'not' | 'input') {
    const typeEval = this.dataQuestion.TypeOfEvaluation;

    // Lấy danh sách đã tick
    let checkedAnswers = this.ListAnswer.filter(
      (a) => a.IsRight && a.Answer && a.Answer.trim() !== ''
    );

    // --- Chia điểm cho loại 1 & 2 ---
    if (typeEval === 1) {
      if (action === 'not') {
        if (!item.IsRight) {
          // Bỏ tick → gọi xóa điểm cho item
          this.APIDeleteMark([item]);

          // Re-calc cho những đáp án còn lại
          checkedAnswers = this.ListAnswer.filter(
            (a) => a.IsRight && a.Answer && a.Answer.trim() !== ''
          );
        }
      }

      const count = checkedAnswers.length;
      if (count > 0) {
        const share = 100 / count;
        this.ListAnswer.forEach((ans) => {
          ans.Mark = ans.IsRight ? share : 0;
        });

        // Update từng đáp án tick (vì API chỉ nhận 1)
        checkedAnswers.forEach((ans) => {
          this.APIUpdateMarkMutil(ans); // suppressNotify=true để tránh notify spam
        });
      } else {
        // Reset hết nếu không còn đáp án tick nào
        this.ListAnswer.forEach((ans) => (ans.Mark = 0));
      }
    }

    if (typeEval === 2) {
      if (action === 'not' && item.IsRight) {
        // 1️⃣ Lấy danh sách đáp án được tick
        const checkedAnswers = this.ListAnswer.filter(
          (a) => a.IsRight && a.Answer && a.Answer.trim() !== ''
        );
        const count = checkedAnswers.length;

        if (count > 0) {
          const baseMark = Math.floor(100 / count);
          let total = 0;
          checkedAnswers.forEach((a, idx) => {
            if (idx === count - 1) {
              a.Mark = 100 - total; // đáp án cuối cộng phần dư
            } else {
              a.Mark = baseMark;
              total += baseMark;
            }
          });
        }

        // 2️⃣ Reset điểm của các đáp án bỏ tick
        const unChecked = this.ListAnswer.filter(
          (a) => !a.IsRight && a.Mark !== 0
        );
        unChecked.forEach((a) => (a.Mark = 0));

        // 3️⃣ Gom các item thay đổi để update
        const arrUpdate = [...checkedAnswers, ...unChecked];

        // 4️⃣ Gọi API tuần tự
        this.updateMarkSequential(arrUpdate, true).then(() => {
          this.layoutService.onSuccess('Cập nhật điểm thành công');
        });

        return;
      }

      // Khi bỏ tick
      if (action === 'not' && !item.IsRight) {
        item.Mark = 0;
        this.APIDeleteMark([item], () => {
          const checkedAnswers = this.ListAnswer.filter(
            (a) => a.IsRight && a.Answer && a.Answer.trim() !== ''
          );
          const count = checkedAnswers.length;

          if (count > 0) {
            const baseMark = Math.floor(100 / count);
            let total = 0;
            checkedAnswers.forEach((a, idx) => {
              if (idx === count - 1) {
                a.Mark = 100 - total;
              } else {
                a.Mark = baseMark;
                total += baseMark;
              }
            });
          }

          this.updateMarkSequential(checkedAnswers, true).then(() => {
            this.layoutService.onSuccess('Cập nhật điểm thành công');
          });
        });
        return;
      }
      // --- Khi input trực tiếp điểm ---
      if (action === 'input') {
        const inputMark = item.Mark ?? 0;
        item.Mark = Math.min(Math.max(inputMark, 0), 100); // đảm bảo 0-100

        // Lấy các đáp án còn lại (không tính item vừa input)
        const otherAnswers = this.ListAnswer.filter(
          (a) => a !== item && a.IsRight && a.Answer && a.Answer.trim() !== ''
        );

        const sumOtherMarks = 100 - item.Mark;
        const countOther = otherAnswers.length;

        if (countOther > 0) {
          const baseMark = Math.floor(sumOtherMarks / countOther);
          let total = 0;
          otherAnswers.forEach((a, idx) => {
            if (idx === countOther - 1) {
              a.Mark = sumOtherMarks - total; // đáp án cuối cộng phần dư
            } else {
              a.Mark = baseMark;
              total += baseMark;
            }
          });
        }

        // Update toàn bộ đáp án tick (kể cả item vừa input)
        const checkedAnswers = this.ListAnswer.filter(
          (a) => a.IsRight && a.Answer && a.Answer.trim() !== ''
        );

        this.updateMarkSequential(checkedAnswers, true).then(() => {
          this.layoutService.onSuccess('Cập nhật điểm thành công');
        });
      }
    }
    if (typeEval === 3) {
      const checkedAnswers = this.ListAnswer.filter(
        (a) => a.IsRight && a.Answer?.trim() !== ''
      );
      const unCheckedAnswers = this.ListAnswer.filter(
        (a) => !a.IsRight && a.Answer?.trim() !== ''
      );

      // --- Khi tick hoặc bỏ tick checkbox ---
      if (action === 'not') {
        // Nhóm tick → tổng 100
        if (checkedAnswers.length > 0) {
          const baseMark = Math.floor(100 / checkedAnswers.length);
          let total = 0;
          checkedAnswers.forEach((a, idx) => {
            if (idx === checkedAnswers.length - 1) a.Mark = 100 - total;
            else {
              a.Mark = baseMark;
              total += baseMark;
            }
          });
        }

        // Nhóm không tick → tổng -100
        if (unCheckedAnswers.length > 0) {
          const baseMark = Math.floor(-100 / unCheckedAnswers.length);
          let total = 0;
          unCheckedAnswers.forEach((a, idx) => {
            if (idx === unCheckedAnswers.length - 1) a.Mark = -100 - total;
            else {
              a.Mark = baseMark;
              total += baseMark;
            }
          });
        }

        // Gọi API
        const arrUpdate = [...checkedAnswers, ...unCheckedAnswers];
        this.updateMarkSequential(arrUpdate, true).then(() => {
          this.layoutService.onSuccess('Cập nhật điểm thành công');
        });
        return;
      }

      // --- Khi input numeric trực tiếp ---
      if (action === 'input') {
        if (item.IsRight) {
          // Tick → chỉ được nhập >= 0
          item.Mark = Math.max(item.Mark ?? 0, 0);

          // Nhóm tick khác item → chia phần còn lại tổng = 100
          const otherChecked = checkedAnswers.filter((a) => a !== item);
          const remaining = 100 - item.Mark;
          if (otherChecked.length > 0) {
            const baseMark = Math.floor(remaining / otherChecked.length);
            let total = 0;
            otherChecked.forEach((a, idx) => {
              if (idx === otherChecked.length - 1) a.Mark = remaining - total;
              else {
                a.Mark = baseMark;
                total += baseMark;
              }
            });
          }
        } else {
          // Không tick → chỉ được nhập <= 0
          item.Mark = Math.min(item.Mark ?? 0, 0);

          // Nhóm không tick còn lại → tổng -100
          const otherUnChecked = unCheckedAnswers.filter((a) => a !== item);
          const remaining = -100 - item.Mark;
          if (otherUnChecked.length > 0) {
            const baseMark = Math.floor(remaining / otherUnChecked.length);
            let total = 0;
            otherUnChecked.forEach((a, idx) => {
              if (idx === otherUnChecked.length - 1) a.Mark = remaining - total;
              else {
                a.Mark = baseMark;
                total += baseMark;
              }
            });
          }
        }

        // Update toàn bộ ListAnswer
        this.updateMarkSequential(this.ListAnswer, true).then(() => {
          this.layoutService.onSuccess('Cập nhật điểm thành công');
        });
      }
    }
  }

  async updateMarkSequential(
    list: DTOAnswer[],
    suppressNotify = false
  ): Promise<void> {
    for (const ans of list) {
      await new Promise<void>((resolve) => {
        this.serviceQuestionApi.UpdateMark(ans).subscribe({
          next: (res: any) => {
            if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
              const updated = res.ObjectReturn;
              this.reviewListAnser = this.reviewListAnser.map((a) =>
                a.Code === updated.Code
                  ? { ...a, Mark: updated.Mark, IsRight: updated.IsRight }
                  : a
              );
            }
            resolve();
          },
          error: () => resolve(),
        });
      });
    }
  }

  // Hàm xử lý khi focus điểm
  onFocusMark(item: DTOAnswer) {
    this.oldMarkValue = item.Mark; // lưu lại điểm cũ
  }

  // Khi blur khỏi textbox câu trả lời
  onInputAnswerChange(item: DTOAnswer) {
    if (!item) return;

    // Nếu nội dung rỗng => gọi API xóa
    if (!item.Answer || !item.Answer.trim()) {
      // Chỉ xóa nếu item đã tồn tại trong DB (Code > 0)
      if (item.Code && item.Code > 0) {
        this.APIDeleteAnswer([item]);
      }
      return;
    }

    // Nếu có nội dung => gọi API cập nhật
    this.APIUpdateAnswer(item);
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
    this.dataQuestionCompetence = this.ListCompetence.slice();
  }

  // Khi focus combobox
  onFocusComboBox() {
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
    if (!value) return;

    const item: DTOCompetence = {
      ...value,
      Question: this.dataQuestion.Code,
      LevelID: this.dataQuestion.LevelID,
      Code: value.Code,
    };

    if (item.LevelID > 0 && Ps_UtilObjectService.hasValue(value)) {
      if (!this.selectedCompetences) this.selectedCompetences = [];
      const exist = this.selectedCompetences.some(
        (c) => c.Parent === item.Parent
      );
      if (!exist) {
        this.selectedCompetences.push(item);
      }
      this.APIUpdateQuestionCompetence(item);
      this.onFilterCompetence();
    } else {
      this.DropCompetenceRef.reset();
    }
    setTimeout(() => this.comboBoxRef.reset(), 100);
  }

  // Hàm tạo filter năng dựa trên các competence đã chọn
  onFilterCompetence(): void {
    console.log('selectedCompetences:', this.selectedCompetences);

    const filters: any[] = [];

    if (this.selectedCompetences && this.selectedCompetences.length > 0) {
      this.selectedCompetences.forEach((comp) => {
        filters.push({
          field: 'Competence',
          operator: 'neq',
          value: comp.Parent,
        });
      });
    }

    if (this.dataQuestion?.LevelID) {
      filters.push({
        field: 'LevelID',
        operator: 'eq',
        value: this.dataQuestion.LevelID,
      });
    }

    this.CompetenceState = {
      filter: {
        logic: 'and',
        filters: filters,
      },
    };

    this.APIGetListQuestionCompetence(this.CompetenceState);
  }

  onDeleteCompetence(item: DTOCompetence) {
    this.tempValueCompetenceDialog = item;
    this.valueQuestionCompetenceName = item.CompetenceName;
    this.openDeleteCompetenceDialog = true;
  }

  // Hàm xử lý đóng dialog level
  onCloseDialogLevel() {
    this.openLevelDialog = false;
  }

  // Hàm xử lý đóng dialog
  onCloseDialog() {
    this.openedDialog = false;
  }

  // Hàm xử lý xóa dữ liệu ấn xóa trên dialog
  onDeleteDialog(type: string) {
    if (type === 'yes') {
      this.APIDeleteQuestion([this.dataQuestion]);
      this.openedDialog = false;
    }
  }

  // Hàm đóng dialog kiểu câu hỏi
  onCloseDialogTypeQuestion() {
    this.dataQuestion.TypeOfQuestion = this.tempQuestion.TypeOfQuestion;
    this.APIGetListAnswer(this.dataQuestion);
    this.openedDialogTypeQuestion = false;
  }

  // Hàm hiện dialog thay đổi giá trị kiểu câu hỏi
  onChangeDialogTypeQuestion(status: string): void {
    if (status == 'yes') {
      // Reset các mảng đáp án trước khi chuyển loại
      this.ListAnswer = [];
      this.reviewListAnser = [];
      this.answersYesNo = [];
      switch (this.valueChangeTypeQuestion.TypeData) {
        case 1:
          this.dataQuestion.TypeOfQuestion = 1;
          this.dataQuestion.TypeOfQuestion =
            this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName =
            this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = null;
          this.dataQuestion.TypeOfEvaluationName = null;
          this.handleUpdateQuestion([
            'TypeOfQuestion',
            'TypeOfQuestionName',
            'TypeOfEvaluation',
            'TypeOfEvaluationName',
          ]);
          this.openedDialogTypeQuestion = false;
          break;
        case 2:
          this.dataQuestion.TypeOfQuestion = 2;
          this.dataQuestion.TypeOfQuestion =
            this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName =
            this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = 1;
          this.dataQuestion.TypeOfEvaluation = 1;
          this.dataQuestion.TypeOfEvaluationName = 'Chọn đúng tất cả đáp án';
          this.handleUpdateQuestion([
            'TypeOfQuestion',
            'TypeOfQuestionName',
            'TypeOfEvaluation',
            'TypeOfEvaluationName',
          ]);
          this.openedDialogTypeQuestion = false;
          break;
        case 3:
          this.dataQuestion.TypeOfQuestion = 3;
          this.dataQuestion.TypeOfQuestion =
            this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName =
            this.valueChangeTypeQuestion.TypeOfQuestion;
          this.dataQuestion.TypeOfEvaluation = null;
          this.dataQuestion.TypeOfEvaluationName = null;
          this.handleUpdateQuestion([
            'TypeOfQuestion',
            'TypeOfQuestionName',
            'TypeOfEvaluation',
            'TypeOfEvaluationName',
          ]);
          this.openedDialogTypeQuestion = false;
          break;
        case 4:
          this.dataQuestion.TypeOfQuestion = 4;
          this.dataQuestion.TypeOfQuestion =
            this.valueChangeTypeQuestion.TypeData;
          this.dataQuestion.TypeOfQuestionName =
            this.valueChangeTypeQuestion.TypeOfQuestion;
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
    this.dataQuestion.LevelID = this.valueChangeLevel;
    this.APIUpdateQuestion(this.dataQuestion, ['LevelID']);
    this.openLevelDialog = false; // nếu cần đóng dialog
    this.APIGetListQuestionCompetence(this.CompetenceState);
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
  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }
}
