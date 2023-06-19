import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  http = environment.apiUrl;
  tokenChecked;
  public oldtoken;
  isShow;
  idCurrentAccount;
  avatarAccount;
  emailAccount;
  oldAVATAR;
  listUser = [];

  private SubscriptionName: Subscription;
  public SubjectName: Subject<string> = new Subject<string>();
  fieldName;

  constructor(private router: Router, private serviceHome: HomeService) {}

  ngOnInit(): void {
    this.tokenChecked = localStorage.getItem('token');
    this.idCurrentAccount = localStorage.getItem('id');
    this.avatarAccount = localStorage.getItem('avatar');
    this.emailAccount = localStorage.getItem('email');
    this.SubscriptionName = this.SubjectName.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((userName) => {
      this.fieldName = this.replaceVietnamese(userName);
      this.searchUser(this.fieldName);
    });
  }

  replaceVietnamese(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

  ngDoCheck(): void {
    this.tokenChecked = localStorage.getItem('token');
    this.avatarAccount = localStorage.getItem('avatar');
    this.emailAccount = localStorage.getItem('email');
    this.idCurrentAccount = localStorage.getItem('id');

    if (this.tokenChecked !== this.oldtoken) {
      this.oldtoken = this.tokenChecked;
    }
  }

  active(): void {
    document.querySelector('.ham3').classList.toggle('active');
    document.querySelector('.over').classList.toggle('overlay');
  }

  removeActive(): void {
    document.querySelector('.ham3').classList.remove('active');
    document.querySelector('.over').classList.remove('overlay');
    document.querySelector('#navbarNavAltMarkup').classList.remove('show');
  }

  // tslint:disable-next-line:typedef
  async logout() {
    this.isShow = true;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('avatar');
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  // tslint:disable-next-line:typedef
  async handlerClick() {
    this.isShow = false;
    const emailtmp = await localStorage.getItem('email');
    (document.getElementById('emailTMP') as HTMLInputElement).value = emailtmp;
  }

  searchUser(Name) {
    this.serviceHome.searchUser(Name).subscribe((res) => {
      this.listUser = res;
    });
  }

  seenProfile(item) {
    const url = `/profile/${ item?._id }`
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    this.SubscriptionName.unsubscribe();
  }
}
