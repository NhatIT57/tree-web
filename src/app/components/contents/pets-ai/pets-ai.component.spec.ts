import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsAiComponent } from './pets-ai.component';

describe('PetsAiComponent', () => {
  let component: PetsAiComponent;
  let fixture: ComponentFixture<PetsAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
