import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mar021DiscountGiftOrderComponent } from './mar021-discount-gift-order.component';

describe('Mar021DiscountGiftOrderComponent', () => {
  let component: Mar021DiscountGiftOrderComponent;
  let fixture: ComponentFixture<Mar021DiscountGiftOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mar021DiscountGiftOrderComponent]
    });
    fixture = TestBed.createComponent(Mar021DiscountGiftOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
