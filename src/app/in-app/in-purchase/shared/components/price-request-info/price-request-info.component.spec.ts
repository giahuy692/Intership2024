import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRequestInfoComponent } from './price-request-info.component';

describe('PriceRequestInfoComponent', () => {
  let component: PriceRequestInfoComponent;
  let fixture: ComponentFixture<PriceRequestInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceRequestInfoComponent]
    });
    fixture = TestBed.createComponent(PriceRequestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
