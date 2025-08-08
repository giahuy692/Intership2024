import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mar021DiscountGiftListComponent } from './mar021-discount-gift-list.component';

describe('Mar021DiscountGiftListComponent', () => {
  let component: Mar021DiscountGiftListComponent;
  let fixture: ComponentFixture<Mar021DiscountGiftListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mar021DiscountGiftListComponent]
    });
    fixture = TestBed.createComponent(Mar021DiscountGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
