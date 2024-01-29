import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDriversComponent } from './supplier-drivers.component';

describe('SupplierDriversComponent', () => {
  let component: SupplierDriversComponent;
  let fixture: ComponentFixture<SupplierDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
