import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mar021DiscountGiftGroupComponent } from './mar021-discount-gift-group.component';

describe('Mar021DiscountGiftGroupComponent', () => {
  let component: Mar021DiscountGiftGroupComponent;
  let fixture: ComponentFixture<Mar021DiscountGiftGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mar021DiscountGiftGroupComponent]
    });
    fixture = TestBed.createComponent(Mar021DiscountGiftGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
