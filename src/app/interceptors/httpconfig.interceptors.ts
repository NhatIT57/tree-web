import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  count = 0;
  constructor(private spinner: NgxSpinnerService) {}
  token;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    this.count++;

    this.token = localStorage.getItem('token');
    if (this.token) {
      req = req.clone({
        url: this.prepareUrl(req.url),
        setHeaders: {
          // enctype: 'multipart/form-data',
          // 'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'application/json',

          'x-token': `${this.token}`,
          // Authorization: `Bearer ${this.token}`,
        },
      });
    } else {
      req = req.clone({
        url: this.prepareUrl(req.url),
      });
    }
    return next.handle(req).pipe(
      tap(
        (event) => {
          // console.log(event);
        },
        (error) => {
          // console.log(error);
        }
      ),
      finalize(() => {
        this.count--;

        if (this.count === 0) {
          this.spinner.hide();
        }
      })
    );
  }
  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }
  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : environment.apiUrl + url;
    return url;
  }
  // tslint:disable-next-line:typedef
  public isAuthenticated() {
    return this.token != null;
  }
}
