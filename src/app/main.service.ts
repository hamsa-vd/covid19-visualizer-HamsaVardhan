import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	statesinfo() {
		return this.http.get('https://api.covid19india.org/data.json');
	}
	tokenpresent() {
		return !!localStorage.getItem('token');
	}
	constructor(private http: HttpClient) {}
}
