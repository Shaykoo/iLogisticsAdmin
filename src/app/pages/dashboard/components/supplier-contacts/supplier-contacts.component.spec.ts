import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContactsComponent } from './supplier-contacts.component';

describe('SupplierContactsComponent', () => {
  let component: SupplierContactsComponent;
  let fixture: ComponentFixture<SupplierContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
