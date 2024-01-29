import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcontractComponent } from './uploadcontract.component';

describe('UploadcontractComponent', () => {
  let component: UploadcontractComponent;
  let fixture: ComponentFixture<UploadcontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadcontractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
