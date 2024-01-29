import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCenterPageComponent } from './control-center-page.component';

describe('ControlCenterPageComponent', () => {
  let component: ControlCenterPageComponent;
  let fixture: ComponentFixture<ControlCenterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCenterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
