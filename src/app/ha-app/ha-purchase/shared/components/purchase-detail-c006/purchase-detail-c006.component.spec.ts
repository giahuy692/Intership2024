import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailC006Component } from './purchase-detail-c006.component';

describe('PurchaseDetailC006Component', () => {
  let component: PurchaseDetailC006Component;
  let fixture: ComponentFixture<PurchaseDetailC006Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseDetailC006Component]
    });
    fixture = TestBed.createComponent(PurchaseDetailC006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
