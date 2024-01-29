import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierChargesComponent } from './supplier-charges.component';

describe('SupplierChargesComponent', () => {
  let component: SupplierChargesComponent;
  let fixture: ComponentFixture<SupplierChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
