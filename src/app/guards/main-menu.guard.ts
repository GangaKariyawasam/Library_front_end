import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../service/user.service";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class MainMenuGuard implements CanActivate{

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if(token === null || role === null){
      return true;
    }
    if(role === 'admin' || role === 'owner'){
      return this.router.createUrlTree(['/dash-board']);
    }else if(role === 'staff' || role === 'student'){
      return this.router.createUrlTree(['/student-profile']);
    }else {
      return true;
    }
  }
  
}
