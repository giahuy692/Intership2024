import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pur001PriceRequestDetailComponent } from './pur001-price-request-detail.component';

describe('Pur001PriceRequestDetailComponent', () => {
  let component: Pur001PriceRequestDetailComponent;
  let fixture: ComponentFixture<Pur001PriceRequestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pur001PriceRequestDetailComponent]
    });
    fixture = TestBed.createComponent(Pur001PriceRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
