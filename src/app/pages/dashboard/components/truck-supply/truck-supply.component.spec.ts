import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckSupplyComponent } from './truck-supply.component';

describe('TruckSupplyComponent', () => {
  let component: TruckSupplyComponent;
  let fixture: ComponentFixture<TruckSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
