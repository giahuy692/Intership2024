import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarPromotionInforComponent } from './mar-promotion-infor.component';

describe('MarDiscountInforComponent', () => {
  let component: MarPromotionInforComponent;
  let fixture: ComponentFixture<MarPromotionInforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarPromotionInforComponent]
    });
    fixture = TestBed.createComponent(MarPromotionInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
