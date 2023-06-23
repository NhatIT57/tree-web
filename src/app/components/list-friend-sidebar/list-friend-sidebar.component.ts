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
  listMess: any[] = [];

  idCurrent;
  textMess = [];
  avatarUser;
  mesInterval;
  constructor(private serviceHome: HomeService) {
    this.idCurrent = localStorage.getItem('id');
    this.avatarUser = localStorage.getItem('avatar');
    this.userToken = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.onCallAPIGetListFriend();
  }

  onChangeVisible = () => {
    this.isVisibleChat = !this.isVisibleChat;
    this.onCallAPIGetListFriend();
  };

  onOpenChat = (index, user) => {
    this.listUser[index].isOpenChat = true;
    const params = {
      userId: this.idCurrent,
      targetUserId: user._id,
    };
    this.callHistoryMess(params, index);
    // gọi 1s 1 lần
    this.mesInterval = setInterval(() => {
      this.callHistoryMess(params, index);
    }, 1000);
  };

  onCloseChat = (index) => {
    this.listUser[index].isOpenChat = false;
    clearInterval(this.mesInterval);
  };

  onSendChat = (user, index) => {
    const postBody = {
      userId: this.idCurrent,
      targetUserId: user._id,
      content: this.textMess[index],
    };
    this.callCreateMess(postBody, index);
  };

  onCallAPIGetListFriend = () => {
    this.serviceHome.getListFriend(this.idCurrent).subscribe(
      (data) => {
        if (data) {
          const newData = data;
          newData.map((user) => {
            user['isOpenChat'] = false;
            if (user.picture) user.picture = this.http + '/' + user.picture;
          });
          this.listUser = newData;
        }
      },
      (err) => {}
    );
  };

  callHistoryMess(params, index) {
    this.serviceHome
      .getHistoryMess(params.userId, params.targetUserId)
      .subscribe((res) => {
        this.listMess[`${index}`] = res.reverse();
      });
  }

  callCreateMess(dataBody, index) {
    this.serviceHome.createMess(dataBody).subscribe((res) => {
      if (res) {
        this.textMess[index] = '';
      }
    });
  }

  callNewMess(params) {
    this.serviceHome
      .getNewMess(params.userId, params.targetUserId)
      .subscribe((res) => {});
  }
}
