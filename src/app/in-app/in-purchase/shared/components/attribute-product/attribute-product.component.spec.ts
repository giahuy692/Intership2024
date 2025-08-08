import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeProductComponent } from './attribute-product.component';

describe('AttributeProductComponent', () => {
  let component: AttributeProductComponent;
  let fixture: ComponentFixture<AttributeProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeProductComponent]
    });
    fixture = TestBed.createComponent(AttributeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
