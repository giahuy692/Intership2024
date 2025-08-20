import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config010EnterpriseAdminunitComponent } from './config010-enterprise-adminunit.component';

describe('Config010EnterpriseAdminunitComponent', () => {
  let component: Config010EnterpriseAdminunitComponent;
  let fixture: ComponentFixture<Config010EnterpriseAdminunitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config010EnterpriseAdminunitComponent]
    });
    fixture = TestBed.createComponent(Config010EnterpriseAdminunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
