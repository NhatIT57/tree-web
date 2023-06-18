import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'list-friend-sidebar',
  templateUrl: './list-friend-sidebar.component.html',
  styleUrls: ['./list-friend-sidebar.component.scss'],
})
export class ListFriendSideBarComponent implements OnInit {
  // Font awesome Icons
  faBars = faBars;

  public isVisibleChat = false;
  public imgPath = './user-avatar.jpg';
  public listUser: any[] = [];
  public userToken: string = null;

  constructor(
    private serviceHome: HomeService
  ) {
    this.userToken = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.onCallAPIGetListFriend();
  }

  onChangeVisible = () => {
    this.isVisibleChat = !this.isVisibleChat;
  }

  onOpenChat = (index) => {
    this.listUser[index].isOpenChat = true;
  }

  onCloseChat = (index) => {
    this.listUser[index].isOpenChat = false;
  }

  onCallAPIGetListFriend = () => {
    this.serviceHome.getListFriend().subscribe(
      (data) => {
        console.log("🚀 ~:", data)
        if (data) {
          const newData = data;
          newData.map(user => user["isOpenChat"] = false);
          this.listUser = newData;
          console.log("🚀 ", this.listUser, newData)
        }
      },
      (err) => { }
    );
  }
}
