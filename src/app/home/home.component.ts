import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../main.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as Chart from 'chart.js';
import { Router } from '@angular/router';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private toast: ToastrService, private getter: MainService, private route: Router) { }
	loginpage = '';
	indiadata;
	total;
	dates = [];
	confirmed = [];
	deceased = [];
	recovered = [];
	chart1 = [];
	chart2 = [];
	deletetoken() {
		localStorage.removeItem('token');
		this.route.navigate(['']);
	}
	moveTo(el: HTMLElement) {
		el.scrollIntoView({
			behavior: "smooth"
		})
	}
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	displayedColumns = ['state', 'confirmed', 'active', 'deaths', 'recovered'];
	ngOnInit(): void {
		this.getter.statesinfo().subscribe((v) => {
			this.indiadata = new MatTableDataSource(v['statewise'].slice(1));
			this.indiadata.paginator = this.paginator;
			this.total = v['statewise'][0];
			v['cases_time_series'].forEach((e) => {
				this.dates.push(e.date);
				this.confirmed.push(e.totalconfirmed);
				this.deceased.push(e.totaldeceased);
				this.recovered.push(e.totalrecovered);
			});
			//Chart.defaults.global.defaultFontColor = '#fff';
			this.chart1.push(
				new Chart('chart-1', {
					type: 'line',
					data: {
						labels: this.dates,
						datasets: [
							{
								data: this.confirmed,
								label: 'confirmed',
								backgroundColor: 'rgba(255,255,255,1)',
								borderColor: '#C3073F',
								pointRadius: 1,
								fill: false
							},
							{
								data: this.deceased,
								label: 'deceased',
								backgroundColor: 'rgba(255,255,255,1)',
								borderColor: '#AFD275',
								pointRadius: 1,
								fill: false
							},
							{
								data: this.recovered,
								label: 'recovered',
								backgroundColor: 'rgba(255,255,255,1)',
								borderColor: '#66FCF1',
								pointRadius: 1,
								fill: false
							}
						]
					},
					options: {
						title: { text: 'current cases chart' },
						scales: {
							xAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Date'
									}
								}
							],
							yAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Count'
									}
								}
							]
						}
					}
				})
			);
			this.chart2.push(
				new Chart('chart-2', {
					type: 'line',
					data: {
						labels: this.dates,
						datasets: [
							{
								data: this.deceased,
								label: 'deceased',
								backgroundColor: 'rgba(255,255,255,1)',
								borderColor: '#AFD275',
								pointRadius: 1,
								fill: false
							}
						]
					},
					options: {
						title: { text: 'current cases chart' },
						scales: {
							xAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Date'
									}
								}
							],
							yAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Deceased Count'
									}
								}
							]
						}
					}
				})
			);
		});
	}
	colorcode = '';
}
