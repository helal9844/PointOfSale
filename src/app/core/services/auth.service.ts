import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/AuthUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
 
  constructor(private router: Router,private http:HttpClient) {}

 
  private currentUser = new ReplaySubject(1);
  currentUser$ = this.currentUser.asObservable();


  public authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatus.asObservable();

  private selectedBranchSubject  = new BehaviorSubject<string>(this.getSelectedBranchFromStorage());
  selectedBranch$ = this.selectedBranchSubject.asObservable();

  login(userName: string, password: string): Observable<any> {
    
    return this.http.post<User>(this.baseUrl+'Auth/login',{ userName, password }).pipe(
      map(user=>{
        console.log(user);
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUser.next(user);
        return user;
      }),
    );
  }
  logout() {
    localStorage.removeItem('user');
    this.authStatus.next(false); 
    localStorage.removeItem('selectedBranch'); 
    this.router.navigate(['/login']);
    this.currentUser.next(null);
  }
  setCurrentUser(user){
    this.currentUser.next(user);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  getToken():string{
    return this.getUser()?.token||null;
  }





  getSelectedBranch(value: string) {
    localStorage.setItem('selectedBranch', JSON.stringify(value));
    this.selectedBranchSubject.next(value);
  }
  private getSelectedBranchFromStorage(): string  {
    return JSON.parse(localStorage.getItem('selectedBranch') || 'false');
  }
  getRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }
  get authStatusObservable(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
