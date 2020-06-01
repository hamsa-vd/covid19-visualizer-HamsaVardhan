import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from './main.service';
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private main: MainService, private route: Router) {}
	canActivate(): boolean {
		if (this.main.tokenpresent()) return true;
		else {
			this.route.navigate([ '' ]);
			return false;
		}
	}
}
