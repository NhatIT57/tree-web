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
  textMess = '';
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
  };

  onOpenChat = (index, user) => {
    this.listUser[index].isOpenChat = true;
    const params = {
      userId: this.idCurrent,
      targetUserId: user._id,
    };
    this.mesInterval = setInterval(() => {
      this.callHistoryMess(params, index);
    }, 3000);
  };

  onCloseChat = (index) => {
    this.listUser[index].isOpenChat = false;
    clearInterval(this.mesInterval);
  };

  onSendChat = (user) => {
    const postBody = {
      userId: this.idCurrent,
      targetUserId: user._id,
      content: this.textMess,
    };
    this.callCreateMess(postBody);
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
        console.log(this.listMess);
      });
  }

  callCreateMess(dataBody) {
    this.serviceHome.createMess(dataBody).subscribe((res) => {
      if (res) {
        this.textMess = '';
      }
    });
  }

  callNewMess(params) {
    this.serviceHome
      .getNewMess(params.userId, params.targetUserId)
      .subscribe((res) => {});
  }
}
