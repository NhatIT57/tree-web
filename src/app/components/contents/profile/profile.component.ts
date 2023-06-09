import { DatePipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './../../../services/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, DoCheck {
  dataProfile;
  notifi;
  idCurrent;
  avatar;
  oldID;
  oldAVATAR;
  isShow = false;

  url;
  urlFlower;
  img;

  isStatus;
  isStatuss;
  arrFlower = [];

  slidesStore = [
    {
      url: 'https://i.pinimg.com/564x/ac/26/8d/ac268d2334265637f8be3fb06e0fcff1.jpg',
      namePet: 'Lulu',
      color: 'trắng xám',
      category: 'husky',
      birthdate: '22/12/2012',
      id: '1',
      active: true,
    },
    {
      url: 'https://i.pinimg.com/736x/95/a3/da/95a3da17973b16c830dc9ba06216673e.jpg',
      namePet: 'Lulu',
      color: 'trắng xám',
      category: 'husky',
      birthdate: '22/12/2012',
      id: '2',
      active: false,
    },
    {
      url: '',
      namePet: 'Lulu',
      color: 'trắng xám',
      category: 'husky',
      birthdate: '22/12/2012',
      id: '3',
      active: false,
    },
    {
      url: 'https://i.pinimg.com/736x/95/a3/da/95a3da17973b16c830dc9ba06216673e.jpg',
      namePet: 'Lulu',
      color: 'trắng xám',
      category: 'husky',
      birthdate: '22/12/2012',
      id: '4',
      active: false,
    },
  ];
  paramID;
  oldParamID;
  role;
  public formProfile: FormGroup;
  public formFlower: FormGroup;

  constructor(
    private serviceHome: HomeService,
    private form: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCurrent = localStorage.getItem('id');
    this.role = localStorage.getItem('role');
    this.paramID = this.route.snapshot.paramMap.get('id');

    this.callProfile();
    this.callFlower();
    this.getDataProfile();
    this.getDataListFlower();
    this.toTop();
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  deletePet__ByID(idUser, idPet): void {
    const data = {
      id: idUser,
      pet: idPet,
    };
    if (confirm('Bạn đã chắc chắn xóa thông tin Hoa Lan này!')) {
      this.serviceHome.deletePet__ByID(data).subscribe((res) => {
        this.getDataListFlower();
      });
    } else {
      return null;
    }
  }

  deleteUser(): void {
    const data = {
      _id: this.paramID,
    };
    if (confirm('Admin đã chắc chắn xóa tài khoản này chưa?')) {
      this.serviceHome.deleteUser(data).subscribe((res) => {
        if (res && res !== '') {
          this.router.navigate(['/home']);
        }
      });
    } else {
      return null;
    }
  }

  ngDoCheck(): void {
    this.idCurrent = localStorage.getItem('id');

    if (this.idCurrent !== this.oldID) {
      this.oldID = this.idCurrent;
      this.getDataProfile();
    }
    this.avatar = localStorage.getItem('avatar');

    if (this.avatar !== this.oldAVATAR) {
      this.oldAVATAR = this.avatar;
      this.getDataProfile();
    }
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0] as File;
    }

    const data = new FormData();
    data.append('profilePicture', this.url);
    data.append('id', this.idCurrent);
    this.serviceHome.updateImage(data).subscribe(
      (res) => {
        this.getDataProfile();
      },
      (err) => {}
    );
  }
  onSelectFileFlower(event): void {
    if (event.target.files && event.target.files[0]) {
      this.urlFlower = event.target.files[0] as File;
    }
  }

  onSubmitFlower(value): void {
    const data = new FormData();
    data.append('profilePicture', this.urlFlower);
    data.append('id', this.idCurrent);
    data.append('namePet', value.namePet);
    data.append('color', value.color);
    data.append('birthdate', value.birthdate);
    data.append('category', value.category);
    this.serviceHome.createFlower(data).subscribe(
      (req) => {
        this.formFlower.reset();
        this.getDataListFlower();
      },
      (err) => {}
    );
  }

  callProfile(): void {
    this.formProfile = this.form.group({
      userID: { value: null, disabled: true },
      name: ['', Validators.compose([Validators.maxLength(50)])],
      email: { value: null, disabled: true },
      born: [''],
      address: ['', Validators.compose([Validators.maxLength(150)])],
      phone: { value: null, disabled: true },
      sex: [''],
    });
  }
  callFlower(): void {
    this.formFlower = this.form.group({
      namePet: [
        '',
        Validators.compose([Validators.maxLength(150), Validators.required]),
      ],
      color: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(150)]),
      ],
      birthdate: ['', Validators.required],
      img: ['', Validators.required],
      category: [
        '',
        Validators.compose([Validators.maxLength(150), Validators.required]),
      ],
    });
  }

  calcBirthday(): void {
    // tslint:disable-next-line:no-unused-expression
    const getBirthday = this.formProfile.get('born').value;
    const birthday = new Date(getBirthday);
    const minBirthday = new Date('12/12/2010');

    if (birthday <= minBirthday) {
      this.notifi = '';
    } else {
      this.notifi =
        'Vui lòng chọn ngày sinh phù hợp, webstie phù hợp với độ tuổi 10+';
    }
  }

  onSubmit(value): void {
    // document.getElementById('formAccount').setAttribute('disabled', 'disabled');
    const data = {
      id: this.idCurrent,
      sex: value.sex,
      born: value.born,
      address: value.address,
      fullname: value.name,
    };
    this.serviceHome.updateProfile(data).subscribe(
      (req) => {
        this.isStatuss = 'Lưu thành công';
        this.getDataProfile();

      },
      (err) => {
        this.isStatus = err.error.error;
      }
    );
  }

  getDataProfile(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceHome.getDataProfile(id).subscribe(
      (data) => {
        if (data) {
          this.dataProfile = data[0];

          this.formProfile.patchValue({
            userID: this.dataProfile?.id,
            name: this.dataProfile?.fullName,
            email: this.dataProfile?.username,
            phone: this.dataProfile?.phoneNumber,
            sex: this.dataProfile?.sex,
            born: this.dataProfile?.born
              ? this.datepipe.transform(
                  new Date(this.dataProfile?.born),
                  'yyyy-MM-dd'
                )
              : '',
            address: this.dataProfile?.address,
          });
          if (this.idCurrent === this.dataProfile?.id) {
            this.isShow = true;
          } else {
            this.isShow = false;
          }
          localStorage.setItem('avatar', this.dataProfile?.picture_url);
        }
      },
      (err) => {}
    );
  }

  getDataListFlower(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceHome.getDataListFlower(id).subscribe(
      (data) => {
        if (data[0]) {
          data[0].active = true;
        }
        this.arrFlower = data;
      },
      (err) => {}
    );
  }
}
