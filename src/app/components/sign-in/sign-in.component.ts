import { Router } from '@angular/router';
import { HomeService } from './../../services/home.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnChanges {
  // @Output() handlerClick = new EventEmitter();
  @Input() isShowHeader: boolean;

  isShow = true;
  isShowTextErrorRegister;
  emailtmp;
  valuetmp;

  public formLogin: FormGroup;
  public formRegister: FormGroup;
  public formChangePassword: FormGroup;

  constructor(
    private form: FormBuilder,
    private serviceHome: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.callLogin();
    this.callRegister();
    this.callChangePassword();
    this.isShow = true;
  }
  ngOnChanges(): void {
    this.isShow = this.isShowHeader;
  }

  signIn(): void {
    document.querySelector('#container').classList.remove('right-panel-active');
  }
  signUp(): void {
    document.querySelector('#container').classList.add('right-panel-active');
  }

  callLogin(): void {
    this.formLogin = this.form.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'),
          Validators.minLength(1),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      // checkbox: [''],
    });
  }
  // tslint:disable-next-line:typedef
  async onSubmitLogin(dataLogin) {
    await this.serviceHome
      .postLogin(dataLogin)
      .toPromise()
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          localStorage.setItem('id', data.id);
          localStorage.setItem('email', dataLogin.username);
        }
        this.formLogin.reset();

        //#region
        document.querySelector('.showErrorLogin').innerHTML = '';
        document.querySelector('#loginModal').classList.remove('show');
        document.getElementById('loginModal').style.display = 'none';
        document.querySelector('.modal-open').classList.remove('modal-open');
        document.querySelector('.ham3').classList.remove('active');
        document.querySelector('.navbar-collapse').classList.remove('show');
        document.querySelector('.over').classList.remove('overlay');
        document.querySelector('.modal-backdrop').remove();
        //#endregion
        window.location.href= `profile/${data.id}`;
        // this.router.navigateByUrl(`profile/${data.id}`);
      })
      .catch((error) => {
        document.querySelector('.showErrorLogin').innerHTML = error.error.Error;
      });
  }

  callRegister(): void {
    this.formRegister = this.form.group({
      FullName: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'),
          Validators.minLength(1),
        ]),
      ],
      Password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      Password_CF: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      Username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'),
          Validators.minLength(1),
        ]),
      ],
      PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],
    });
  }

  onCheckConfirmPassword(value: any): void {
    const check = value.target.value;
    if (check.length === 0) {
      this.isShowTextErrorRegister = '';
    }
  }
  // tslint:disable-next-line:typedef
  async onSubmitRegister(dataRegister) {
    if (dataRegister.Password === dataRegister.Password_CF) {
      const R = {
        username: dataRegister.Username,
        password: dataRegister.Password,
        fullname: dataRegister.FullName,
        phoneNumber: dataRegister.PhoneNumber,
      };
      await this.serviceHome
        .postReg(R)
        .toPromise()
        .then(() => {
          this.formRegister.reset();
          document.querySelector('.showErrorRegister').innerHTML = '';
          document.querySelector('.showSuccessRegister').innerHTML =
            'Chúc mừng bạn đã tạo tài khoản thành công!';
        })
        .catch((error) => {
          document.querySelector('.showSuccessRegister').innerHTML = '';
          document.querySelector('.showErrorRegister').innerHTML =
            error.error.Error ||
            'Tạo tài khoản không thành công vui lòng kiểm tra lại!';
        });
      this.isShowTextErrorRegister = '';
    } else {
      this.isShowTextErrorRegister =
        '*Mật khẩu không khớp, vui lòng xác nhận lại mật khẩu!';
    }
  }

  callChangePassword(): void {
    this.formChangePassword = this.form.group({
      usernamePW: { value: null, disabled: true },
      oldPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
    });
  }
  // tslint:disable-next-line:typedef
  async onSubmitChangePassword(dataChangePassWord) {
    const getEmail = localStorage.getItem('email');
    const dataUpdate = {
      username: getEmail,
      password: dataChangePassWord.oldPassword,
      newpassword: dataChangePassWord.newPassword,
    };

    await this.serviceHome
      .postChangePassword(dataUpdate)
      .toPromise()
      .then((data) => {
        this.formChangePassword.reset();
        document.querySelector('.showErrorChangePassWord').innerHTML = '';
        document.querySelector('.showSuccessChangePassWord').innerHTML =
          data.Success;
      })
      .catch((error) => {
        document.querySelector('.showSuccessChangePassWord').innerHTML = '';
        document.querySelector('.showErrorChangePassWord').innerHTML =
          error.error.Error;
      });
    (document.getElementById('emailTMP') as HTMLInputElement).value = getEmail;
  }
  handlerClicked(): void {
    this.isShow = !this.isShow;
  }
}
