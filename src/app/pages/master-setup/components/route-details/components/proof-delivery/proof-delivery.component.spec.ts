import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofDeliveryComponent } from './proof-delivery.component';

describe('ProofDeliveryComponent', () => {
  let component: ProofDeliveryComponent;
  let fixture: ComponentFixture<ProofDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
