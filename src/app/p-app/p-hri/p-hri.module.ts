import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PHriRoutingModule } from './p-hri-routing.module';
import { PHriComponent } from './p-hri.component';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { HRMenuStaffInfoComponent } from './shared/components/hr-menu-staff-info/hr-menu-staff-info.component';

import { HRQuizSessionInfoComponent } from './shared/components/hr-quiz-session-info/hr-quiz-session-info.component';
import { HrExamDetailComponent } from './shared/components/hr-exam-detail/hr-exam-detail.component';
import { HrExamQuestionComponent } from './shared/components/hr-exam-question/hr-exam-question.component';
import { HrNewsDetailComponent } from './shared/components/hr-news-detail/hr-news-detail.component';
import { HrPaycheckDetailComponent } from './shared/components/hr-paycheck-detail/hr-paycheck-detail.component';
import { HrPolicyTransitionInfoComponent } from './shared/components/hr-policy-transition-info/hr-policy-transition-info.component';
import { HrPolicyTransitionListComponent } from './shared/components/hr-policy-transition-list/hr-policy-transition-list.component';
import { HrApplicablePositionListComponent } from './shared/components/hr-applicable-position-list/hr-applicable-position-list.component';
import { HrTaskListComponent } from './shared/components/hr-task-list/hr-task-list.component';
import { HrTaskAdderComponent } from './shared/components/hr-task-adder/hr-task-adder.component';
import { HrExceptionAdderComponent } from './shared/components/hr-exception-adder/hr-exception-adder.component';
import { HrPolicyDetailComponent } from './shared/components/hr-policy-detail/hr-policy-detail.component';
import { HrOnboardDecisionListComponent } from './shared/components/hr-onboard-decision-list/hr-onboard-decision-list.component';
import { HrOnboardDecisionDetailComponent } from './shared/components/hr-onboard-decision-detail/hr-onboard-decision-detail.component';
import { HrOffboardDecisionDetailComponent } from './shared/components/hr-offboard-decision-detail/hr-offboard-decision-detail.component';
import { HrOffboardDecisionListComponent } from './shared/components/hr-offboard-decision-list/hr-offboard-decision-list.component';
import { DecisionTypePipe, HrBoardingListComponent } from './shared/components/hr-boarding-list/hr-boarding-list.component';
import { HrBoardingDetailComponent } from './shared/components/hr-boarding-detail/hr-boarding-detail.component';
import { CommonModule } from '@angular/common';
import { HrTaskBoardingComponent } from './shared/components/hr-task-boarding/hr-task-boarding.component';
import { Hri006DepartmentListComponent } from './pages/hri006-department-list/hri006-department-list.component';
import { Hri008QuestionBankListComponent } from './pages/hri008-question-bank-list/hri008-question-bank-list.component';
import { Hri008QuestionBankDetailComponent } from './pages/hri008-question-bank-detail/hri008-question-bank-detail.component';

@NgModule({
  declarations: [
    PHriComponent,
    HrExamDetailComponent,
    HRMenuStaffInfoComponent,
    HRQuizSessionInfoComponent,
    HrPaycheckDetailComponent,
    HrNewsDetailComponent,
    HrExamQuestionComponent,
    HrPolicyTransitionInfoComponent,
    HrPolicyTransitionListComponent,
    HrApplicablePositionListComponent,
    HrTaskListComponent,
    HrTaskAdderComponent,
    HrExceptionAdderComponent,
    HrPolicyDetailComponent,
    HrBoardingListComponent,
    HrBoardingDetailComponent,
    HrOnboardDecisionDetailComponent,
    HrOnboardDecisionListComponent,
    HrOffboardDecisionDetailComponent,
    HrOffboardDecisionListComponent,
    HrTaskBoardingComponent,
    
    //- Pipe
    DecisionTypePipe,
    //
    Hri006DepartmentListComponent,
    Hri008QuestionBankListComponent,
    Hri008QuestionBankDetailComponent,
  ],
  imports: [PHriRoutingModule, PLayoutModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [HrExamDetailComponent, HRMenuStaffInfoComponent],
})
export class PHriModule { }
