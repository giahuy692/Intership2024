import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mar021DiscountGiftItemComponent } from './mar021-discount-gift-item.component';

describe('Mar021DiscountGiftItemComponent', () => {
  let component: Mar021DiscountGiftItemComponent;
  let fixture: ComponentFixture<Mar021DiscountGiftItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mar021DiscountGiftItemComponent]
    });
    fixture = TestBed.createComponent(Mar021DiscountGiftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
