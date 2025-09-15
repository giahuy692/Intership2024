import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hri008QuestionBankListComponent } from './hri008-question-bank-list.component';

describe('Hri008QuestionBankListComponent', () => {
  let component: Hri008QuestionBankListComponent;
  let fixture: ComponentFixture<Hri008QuestionBankListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hri008QuestionBankListComponent]
    });
    fixture = TestBed.createComponent(Hri008QuestionBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
