import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPurchaseComponent } from './in-purchase.component';

describe('InPurchaseComponent', () => {
  let component: InPurchaseComponent;
  let fixture: ComponentFixture<InPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InPurchaseComponent]
    });
    fixture = TestBed.createComponent(InPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
