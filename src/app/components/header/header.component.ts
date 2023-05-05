import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  tokenChecked;
  public oldtoken;
  isShow;
  idCurrentAccount;
  avatarAccount;
  emailAccount;
  oldAVATAR;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tokenChecked = localStorage.getItem('token');
    this.idCurrentAccount = localStorage.getItem('id');
    this.avatarAccount = localStorage.getItem('avatar');
    this.emailAccount = localStorage.getItem('email');
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
}
