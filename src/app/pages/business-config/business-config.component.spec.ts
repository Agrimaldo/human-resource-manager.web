import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessConfigComponent } from './business-config.component';

describe('BusinessConfigComponent', () => {
  let component: BusinessConfigComponent;
  let fixture: ComponentFixture<BusinessConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
