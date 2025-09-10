import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config012EnterpriseStickerComponent } from './config012-enterprise-sticker.component';

describe('Config012EnterpriseTagComponent', () => {
  let component: Config012EnterpriseStickerComponent;
  let fixture: ComponentFixture<Config012EnterpriseStickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Config012EnterpriseStickerComponent]
    });
    fixture = TestBed.createComponent(Config012EnterpriseStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
