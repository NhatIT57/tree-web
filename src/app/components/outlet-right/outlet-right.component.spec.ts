import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletRightComponent } from './outlet-right.component';

describe('OutletRightComponent', () => {
  let component: OutletRightComponent;
  let fixture: ComponentFixture<OutletRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
