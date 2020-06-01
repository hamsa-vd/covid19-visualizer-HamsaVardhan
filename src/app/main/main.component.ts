import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	loginpage = '';
	data;
	active;
	confirmed;
	recovered;
	deaths;
	constructor(private serve: MainService) {}
	link = '/home';
	ngOnInit(): void {
		this.serve.statesinfo().subscribe((v) => {
			this.data = v['statewise'][0];
			this.active = this.data['active'];
			this.confirmed = this.data['confirmed'];
			this.recovered = this.data['recovered'];
			this.deaths = this.data['deaths'];
		});
	}
}
