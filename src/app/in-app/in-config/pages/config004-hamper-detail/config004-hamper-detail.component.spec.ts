import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config004HamperDetailComponent } from './config004-hamper-detail.component';

describe('Config004HamperDetailComponent', () => {
  let component: Config004HamperDetailComponent;
  let fixture: ComponentFixture<Config004HamperDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config004HamperDetailComponent]
    });
    fixture = TestBed.createComponent(Config004HamperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
