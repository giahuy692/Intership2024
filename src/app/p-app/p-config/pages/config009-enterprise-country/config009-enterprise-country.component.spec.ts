import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config009EnterpriseContryComponent } from './config009-enterprise-country.component';

describe('Config009EnterpriseContryComponent', () => {
  let component: Config009EnterpriseContryComponent;
  let fixture: ComponentFixture<Config009EnterpriseContryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config009EnterpriseContryComponent]
    });
    fixture = TestBed.createComponent(Config009EnterpriseContryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
