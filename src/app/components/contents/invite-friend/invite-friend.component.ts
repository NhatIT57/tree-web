import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.scss'],
})
export class InviteFriendComponent implements OnInit {
  http = environment.apiUrl;
  idCurrent;
  listInvite;
  constructor(
    private serviceHome: HomeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.idCurrent = localStorage.getItem('id');
    this.getListInvite();
  }

  getListInvite() {
    this.serviceHome.getListInvite(this.idCurrent).subscribe((res) => {
      this.listInvite = res;
      for (let index = 0; index < this.listInvite.length; index++) {
        if (this.listInvite[index].picture) {
          this.listInvite[index].picture =
            this.http + '/' + this.listInvite[index].picture;
        }
      }
    });
  }

  accesFriend(item) {
    const postBody = {
      userId: item._id,
      targetUserId: this.idCurrent,
    };
    this.serviceHome.acceptFriend(postBody).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Xác nhận kết bạn thành công !');
        this.getListInvite();
      } else {
        this.toastr.error('Xác nhận kết bạn thất bại !');
      }
    });
  }

  unAccesFriend(item) {
    const postBody = {
      userId: this.idCurrent,
      targetUserId: item._id,
    };
    this.serviceHome.rejectFriend(postBody).subscribe((res) => {
      if (!res.status) {
        this.toastr.success('Hủy lời mời kết bạn thành công !');
        this.getListInvite();
      } else {
        this.toastr.error('Hủy lời mời kết bạn thất bại !');
      }
    });
  }
}
