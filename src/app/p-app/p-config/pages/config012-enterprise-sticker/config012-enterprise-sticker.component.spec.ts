import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config012EnterpriseTagComponent } from './config012-enterprise-sticker.component';

describe('Config012EnterpriseTagComponent', () => {
  let component: Config012EnterpriseTagComponent;
  let fixture: ComponentFixture<Config012EnterpriseTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config012EnterpriseTagComponent]
    });
    fixture = TestBed.createComponent(Config012EnterpriseTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
