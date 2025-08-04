import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pur001ProductPriceRequestDetailComponent } from './pur001-product-price-request-detail.component';

describe('Pur001ProductPriceRequestDetailComponent', () => {
  let component: Pur001ProductPriceRequestDetailComponent;
  let fixture: ComponentFixture<Pur001ProductPriceRequestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pur001ProductPriceRequestDetailComponent]
    });
    fixture = TestBed.createComponent(Pur001ProductPriceRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
