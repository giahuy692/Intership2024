import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config005HamperDetailComponent } from './config005-hamper-detail.component';

describe('Config005HamperDetailComponent', () => {
  let component: Config005HamperDetailComponent;
  let fixture: ComponentFixture<Config005HamperDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Config005HamperDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Config005HamperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
