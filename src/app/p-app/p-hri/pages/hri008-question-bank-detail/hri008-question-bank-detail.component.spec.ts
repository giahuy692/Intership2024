import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hri008QuestionBankDetailComponent } from './hri008-question-bank-detail.component';

describe('Hri008QuestionBankDetailComponent', () => {
  let component: Hri008QuestionBankDetailComponent;
  let fixture: ComponentFixture<Hri008QuestionBankDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hri008QuestionBankDetailComponent]
    });
    fixture = TestBed.createComponent(Hri008QuestionBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
