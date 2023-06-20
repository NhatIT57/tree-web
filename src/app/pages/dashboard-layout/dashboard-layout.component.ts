import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  scroll;
  tokenChecked;
  constructor() {
    this.tokenChecked = localStorage.getItem('token');
    
  }

  ngOnInit(): void {
    if (this.tokenChecked) {
      document.querySelector('#rightSide').classList.add('hidden_rightSide');
      document.querySelector('#main-content').classList.add('main-content-center');
    } else {
      document.querySelector('#container').classList.remove('right-panel-active');
    }
    // window.addEventListener('scroll', this.scrolling, true);
  }
  // scrolling = (s) => {
  //   const sc = s.target.scrollingElement?.scrollTop || 0;
  //   // console.log(sc);
  //   if (sc >= 100) {
  //     this.scroll = true;
  //   } else {
  //     this.scroll = false;
  //   }
  //   // tslint:disable-next-line:semicolon
  // };
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    // window.removeEventListener('scroll', this.scrolling, true);
  }
}
