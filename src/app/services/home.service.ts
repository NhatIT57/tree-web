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

  public getAllFlower(page): Observable<any> {
    return this.http.get<any>(`/user/getAllEmployee/${page}`);
  }
  public updateImage(data): Observable<any> {
    return this.http.post<any>(`/setprofile`, data);
  }
  public updateProfile(data): Observable<any> {
    return this.http.post<any>(`/updateProfile`, data);
  }
  public createFlower(data): Observable<any> {
    return this.http.post<any>(`/createflower`, data);
  }
  public getDataListFlower(id): Observable<any> {
    return this.http.get<any>(`/getpetbyuserid/${id}`);
  }
  public getAllListFlower(): Observable<any> {
    return this.http.get<any>(`/showallFlower`);
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
  public getListFriend(userId): Observable<any> {
    return this.http.get<any>(`/listFriend?userId=${userId}`);
  }
  public searchUser(name): Observable<any> {
    return this.http.get<any>(`/searchUserByName?username=${name}`);
  }

  public addFriend(data): Observable<any> {
    return this.http.post<any>(`/addFriend`, data);
  }
  public getListInvite(userId): Observable<any> {
    return this.http.get<any>(`/listInvite?userId=${userId}`);
  }
  public rejectFriend(data): Observable<any> {
    return this.http.post<any>(`/rejectFriend`, data);
  }
  public acceptFriend(data): Observable<any> {
    return this.http.post<any>(`/acceptFriend`, data);
  }
  public getHistoryMess(userId, targetUserId): Observable<any> {
    return this.http.get<any>(
      `/historyMess?userId=${userId}&targetUserId=${targetUserId}`
    );
  }
  public getNewMess(userId, targetUserId): Observable<any> {
    return this.http.get<any>(
      `/newMess?userId=${userId}&targetUserId=${targetUserId}`
    );
  }

  public createMess(data): Observable<any> {
    return this.http.post<any>(`/createMess`, data);
  }
  public cancelFriend(data): Observable<any> {
    return this.http.post<any>(`/cancelFriend`, data);
  }
}
