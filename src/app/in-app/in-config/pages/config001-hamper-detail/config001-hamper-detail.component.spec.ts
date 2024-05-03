import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config001HamperDetailComponent } from './config001-hamper-detail.component';

describe('Config001HamperDetailComponent', () => {
  let component: Config001HamperDetailComponent;
  let fixture: ComponentFixture<Config001HamperDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config001HamperDetailComponent]
    });
    fixture = TestBed.createComponent(Config001HamperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
