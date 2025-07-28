import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailP001Component } from './purchase-detail-p001.component';

describe('PurchaseDetailP001Component', () => {
  let component: PurchaseDetailP001Component;
  let fixture: ComponentFixture<PurchaseDetailP001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseDetailP001Component]
    });
    fixture = TestBed.createComponent(PurchaseDetailP001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
