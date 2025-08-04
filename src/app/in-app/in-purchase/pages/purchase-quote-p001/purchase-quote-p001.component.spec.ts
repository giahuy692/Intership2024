import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuoteP001Component } from './purchase-quote-p001.component';

describe('PurchaseQuoteP001Component', () => {
  let component: PurchaseQuoteP001Component;
  let fixture: ComponentFixture<PurchaseQuoteP001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseQuoteP001Component]
    });
    fixture = TestBed.createComponent(PurchaseQuoteP001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
