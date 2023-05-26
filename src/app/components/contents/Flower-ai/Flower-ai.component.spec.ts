import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerAiComponent } from './Flower-ai.component';

describe('FlowerAiComponent', () => {
  let component: FlowerAiComponent;
  let fixture: ComponentFixture<FlowerAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
