import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from './../../services/home.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'list-friend-sidebar',
  templateUrl: './list-friend-sidebar.component.html',
  styleUrls: ['./list-friend-sidebar.component.scss'],
})
export class ListFriendSideBarComponent implements OnInit {
  // Font awesome Icons
  faBars = faBars;
  http = environment.apiUrl;

  public isVisibleChat = false;
  public imgPath = './user-avatar.jpg';
  public listUser: any[] = [];
  public userToken: string = null;
  idCurrent;
  constructor(private serviceHome: HomeService) {
    this.idCurrent = localStorage.getItem('id');
    this.userToken = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.onCallAPIGetListFriend();
  }

  onChangeVisible = () => {
    this.isVisibleChat = !this.isVisibleChat;
  };

  onOpenChat = (index) => {
    this.listUser[index].isOpenChat = true;
  };

  onCloseChat = (index) => {
    this.listUser[index].isOpenChat = false;
  };

  onSendChat = () => {
    console.log('send chat');
  };

  onCallAPIGetListFriend = () => {
    this.serviceHome.getListFriend(this.idCurrent).subscribe(
      (data) => {
        if (data) {
          const newData = data;
          newData.map((user) => (user['isOpenChat'] = false));
          for (let index = 0; index < newData.length; index++) {
            if (newData[index].picture) {
              newData[index].picture = this.http + '/' + newData[index].picture;
            }
          }
          this.listUser = newData;
        }
      },
      (err) => {}
    );
  };
}
