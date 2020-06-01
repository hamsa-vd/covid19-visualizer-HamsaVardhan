import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class ChildService {
	constructor(private _http: HttpClient) {}
	getdata() {
		return this._http.get('https://api.covid19india.org/v2/state_district_wise.json');
	}
	dailystates() {
		return this._http.get('https://api.covid19india.org/states_daily.json');
	}
	registerdata(data) {
		return this._http.post('https://zen-user-api.herokuapp.com/users/register', data);
	}
	logindata(data) {
		return this._http.post('https://zen-user-api.herokuapp.com/users/authenticate', data);
	}
}
