import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFriendSideBarComponent } from './list-friend-sidebar.component';

describe('ListFriendSideBarComponent', () => {
  let component: ListFriendSideBarComponent;
  let fixture: ComponentFixture<ListFriendSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFriendSideBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFriendSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
