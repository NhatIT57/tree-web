import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from './../../../services/home.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck {
  public http = environment.apiUrl;
  public showMore;
  public dataHomes;
  public dataDistricts = [
    { id: 1, code: '760', name: 'Quận 1' },
    { id: 2, code: '769', name: 'Quận 2' },
    { id: 3, code: '770', name: 'Quận 3' },
    { id: 4, code: '773', name: 'Quận 4' },
    { id: 5, code: '774', name: 'Quận 5' },
    { id: 6, code: '775', name: 'Quận 6' },
    { id: 7, code: '778', name: 'Quận 7' },
    { id: 8, code: '776', name: 'Quận 8' },
    { id: 9, code: '763', name: 'Quận 9 ' },
    { id: 10, code: '771', name: 'Quận 10' },
    { id: 11, code: '772', name: 'Quận 11' },
    { id: 12, code: '761', name: 'Quận 12' },
    { id: 13, code: '765', name: 'Quận Bình Thạnh' },
    { id: 14, code: '777', name: 'Quận Bình Tân' },
    { id: 15, code: '768', name: 'Quận Phú Nhuận' },
    { id: 16, code: '767', name: 'Quận Tân Phú' },
    { id: 17, code: '766', name: 'Quận Tân Bình' },
    { id: 18, code: '764\t', name: 'Quận Gò Vấp' },
    { id: 19, code: '762', name: 'TP.Thủ Đức' },
    { id: 20, code: '783', name: 'Huyện Củ Chi' },
    { id: 21, code: '784', name: 'Huyện Hóc Môn' },
    { id: 22, code: '785', name: 'Huyện Bình Chánh' },
    { id: 23, code: '786', name: 'Huyện Nhà Bè' },
    { id: 24, code: '787', name: 'Huyện Cần Giờ' },
  ];
  public valueDistrict = 0;
  public valuePage = 1;
  constructor(private serviceHome: HomeService, private form: FormBuilder) {}

  url;
  id;
  public formPost: FormGroup;
  listPost;
  start = 0;
  numb = 7;
  oldID;

  comment;
  isShowCMT = true;
  dataCMT;
  role;
  ngOnInit(): void {
    this.callPost();
    this.id = localStorage.getItem('id');
    this.role = localStorage.getItem('role');

    this.getAllPosts();
    // this.getAllComment();
    this.toTop();
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngDoCheck(): void {
    this.id = localStorage.getItem('id');
    if (this.id !== this.oldID) {
      this.oldID = this.id;
    }
  }

  deletePost__ByID(idPost, idUser): void {
    const data = {
      post: idPost,
      id: idUser,
    };

    if (confirm('Admin có chắc chắn xóa bài đăng này?')) {
      this.serviceHome.deletePost__ByID(data).subscribe((res) => {
        this.getAllPosts();
      });
    } else {
      return null;
    }
  }
  deleteComment__ByID(cmt, user): void {
    const data = {
      idCMT: cmt,
      idUSER: user,
    };

    if (confirm('Admin có chắc chắn xóa bình luận này?')) {
      this.serviceHome.deleteComment__ByID(data).subscribe((res) => {
        this.getAllPosts();
      });
    } else {
      return null;
    }
  }

  // getAllComment(): void {
  //   this.serviceHome.getAllComment().subscribe(
  //     (res) => {
  //       if (res && res !== '') {
  //         this.dataCMT = res;
  //       }
  //     },
  //     (err) => {}
  //   );
  // }
  getComment__ByID(id, item): void {
    const data = {
      post_id: id,
    };
    this.serviceHome.getComment__ByID(data).subscribe(
      (res) => {
        if (res && res !== '') {
          item.arrCMT = res;
        }
      },
      (err) => {}
    );
  }

  onSubmitCmt(postID, arrCMT): void {
    const data = { message: this.comment, post_id: postID, id: this.id };
    if (this.id) {
      if (
        this.comment !== '' &&
        this.comment !== undefined &&
        this.comment !== null
      ) {
        this.serviceHome.createComment(data).subscribe(
          (res) => {
            if (res && res !== '') {
              this.comment = '';
              arrCMT.push(res);
            }
          },
          (err) => {}
        );
      }
    } else {
      alert('Vui lòng đăng nhập trước khi bình luận!');
      document.getElementById('IDLOGIN').click();
    }
  }

  onNext(): void {
    this.numb += 7;
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.serviceHome.getAllListPosts().subscribe(
      (res) => {
        if (res && res.posts !== '') {
          this.listPost = res.posts.splice(this.start, this.numb);

          for (const item of this.listPost) {
            item.showMore = false;
            item.showCMT = true;
            item.limit = 2;
            this.getComment__ByID(item._id, item);
          }
        }
      },
      (err) => {}
    );
  }

  callPost(): void {
    this.formPost = this.form.group({
      description: ['', Validators.compose([Validators.required])],
      state: ['', Validators.required],
      img: ['', Validators.required],
    });
  }
  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0] as File;
    }
  }

  onSubmitPosts(value): void {
    const data = new FormData();
    data.append('picture', this.url);
    data.append('id', this.id);
    data.append('description', value.description);
    data.append('state', value.state);
    this.serviceHome.createPost(data).subscribe(
      (req) => {
        this.formPost.reset();
        this.getAllPosts();
        document.getElementById('close').click();
      },
      (err) => {}
    );
  }
}
