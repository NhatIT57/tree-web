import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getPageHome(IdDistrict, page): Observable<any> {
    return this.http.get<any>(`/home/HomePage/${IdDistrict}/${page}`);
  }

  public getDistric(): Observable<any> {
    return this.http.get<any>(`/home/Districts`);
  }

  public postLogin(dataLogin): Observable<any> {
    return this.http.post<any>(`/loginUser`, dataLogin);
  }

  public postReg(dataRegister): Observable<any> {
    return this.http.post<any>(`/createUser`, dataRegister);
  }

  public postChangePassword(dataChangePassWord): Observable<any> {
    return this.http.patch<any>(`/updatePasswordUser`, dataChangePassWord);
  }

  public getDataProfile(id): Observable<any> {
    return this.http.get<any>(`/getuserbyid/${id}`);
  }

  public getAllPets(page): Observable<any> {
    return this.http.get<any>(`/user/getAllEmployee/${page}`);
  }
  public updateImage(data): Observable<any> {
    return this.http.post<any>(`/setprofile`, data);
  }
  public updateProfile(data): Observable<any> {
    return this.http.post<any>(`/updateProfile`, data);
  }
  public createPets(data): Observable<any> {
    return this.http.post<any>(`/createpet`, data);
  }
  public getDataListPets(id): Observable<any> {
    return this.http.get<any>(`/getpetbyuserid/${id}`);
  }
  public getAllListPets(): Observable<any> {
    return this.http.get<any>(`/showallpets`);
  }
  public createPost(data): Observable<any> {
    return this.http.post<any>(`/createpost`, data);
  }
  public createComment(data): Observable<any> {
    return this.http.post<any>(`/createcomment`, data);
  }
  public getAllListPosts(): Observable<any> {
    return this.http.get<any>(`/showAllPosts`);
  }
  public getAllComment(): Observable<any> {
    return this.http.get<any>(`/showallcomments`);
  }
  public getComment__ByID(data): Observable<any> {
    return this.http.post<any>(`/getcommentbypostid`, data);
  }
  public deleteUser(data): Observable<any> {
    return this.http.post<any>(`/deleteuserbyid`, data);
  }
  public deleteComment__ByID(data): Observable<any> {
    return this.http.post<any>(`/deletecomment`, data);
  }
  public deletePost__ByID(data): Observable<any> {
    return this.http.post<any>(`/deletepost`, data);
  }
  public deletePet__ByID(data): Observable<any> {
    return this.http.post<any>(`/deletepet`, data);
  }
}
