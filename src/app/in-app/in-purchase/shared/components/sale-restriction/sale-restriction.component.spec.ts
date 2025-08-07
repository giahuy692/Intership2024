import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleRestrictionComponent } from './sale-restriction.component';

describe('SaleRestrictionComponent', () => {
  let component: SaleRestrictionComponent;
  let fixture: ComponentFixture<SaleRestrictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleRestrictionComponent]
    });
    fixture = TestBed.createComponent(SaleRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
