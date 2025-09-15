import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hri006DepartmentListComponent } from './hri006-department-list.component';

describe('Hri006DepartmentListComponent', () => {
  let component: Hri006DepartmentListComponent;
  let fixture: ComponentFixture<Hri006DepartmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hri006DepartmentListComponent]
    });
    fixture = TestBed.createComponent(Hri006DepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
