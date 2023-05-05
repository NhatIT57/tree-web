import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  tokenChecked;

  constructor() {}

  ngOnInit(): void {
    this.tokenChecked = localStorage.getItem('token');
  }
  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
