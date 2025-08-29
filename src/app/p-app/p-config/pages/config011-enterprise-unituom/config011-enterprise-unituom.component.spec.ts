import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config011EnterpriseUnituomComponent } from './config011-enterprise-unituom.component';

describe('Config011EnterpriseUnituomComponent', () => {
  let component: Config011EnterpriseUnituomComponent;
  let fixture: ComponentFixture<Config011EnterpriseUnituomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config011EnterpriseUnituomComponent]
    });
    fixture = TestBed.createComponent(Config011EnterpriseUnituomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
