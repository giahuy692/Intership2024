import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config011EnterprisePackingUnitComponent } from './config011-enterprise-packingunit.component';

describe('Config011EnterpriseUnituomComponent', () => {
  let component: Config011EnterprisePackingUnitComponent;
  let fixture: ComponentFixture<Config011EnterprisePackingUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config011EnterprisePackingUnitComponent]
    });
    fixture = TestBed.createComponent(Config011EnterprisePackingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
