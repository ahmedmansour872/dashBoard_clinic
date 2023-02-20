import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('token'))
      if (
        localStorage.getItem('role') == 'Admin' ||
        localStorage.getItem('role') == 'Storekeeper' ||
        localStorage.getItem('role') == 'Doctor' ||
        localStorage.getItem('role') == 'Receptionist'
      ) {
        return true;
      }

    return false;
  }
}
