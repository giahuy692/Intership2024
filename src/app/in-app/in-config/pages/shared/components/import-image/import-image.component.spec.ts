import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportImageComponent } from './import-image.component';

describe('ImportImageComponent', () => {
  let component: ImportImageComponent;
  let fixture: ComponentFixture<ImportImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportImageComponent]
    });
    fixture = TestBed.createComponent(ImportImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
