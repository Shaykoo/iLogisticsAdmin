import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTaskTypeComponent } from './route-task-type.component';

describe('RouteTaskTypeComponent', () => {
  let component: RouteTaskTypeComponent;
  let fixture: ComponentFixture<RouteTaskTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteTaskTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTaskTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
