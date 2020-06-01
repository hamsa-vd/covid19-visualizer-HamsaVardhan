import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildService } from '../child.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from '../main.service';
import { Chart } from 'chart.js';
@Component({
	selector: 'app-states',
	templateUrl: './states.component.html',
	styleUrls: [ './states.component.scss' ]
})
export class StatesComponent implements OnInit {
	constructor(private serve: ChildService, private route: ActivatedRoute, private main: MainService) {}
	data;
	code;
	chartdatas = {
		Confirmed: [],
		Recovered: [],
		Deceased: []
	};
	date = [];
	chart1 = [];
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	displayedColumns = [ 'district', 'confirmed', 'active', 'deaths', 'recovered' ];
	ngOnInit(): void {
		this.route.paramMap.subscribe((v) => {
			this.code = v.get('code');
			this.serve.getdata().subscribe((e) => {
				for (let i in e) {
					if (e[i]['statecode'] == this.code) {
						this.data = new MatTableDataSource(e[i]['districtData']);
						this.data.paginator = this.paginator;
					}
				}
			});
			this.serve.dailystates().subscribe((e) => {
				for (let i of e['states_daily']) {
					if (this.date.indexOf(i['date']) == -1) this.date.push(i['date']);
					this.chartdatas[i['status']].push(i[v.get('code').toLowerCase()]);
				}
				this.chart1.push(
					new Chart('dailychart-1', {
						type: 'line',
						data: {
							labels: this.date,
							datasets: [
								{
									data: this.chartdatas['Confirmed'],
									label: 'confirmed',
									backgroundColor: 'rgba(255,255,255,1)',
									borderColor: '#C3073F',
									pointRadius: 1,
									fill: false
								},
								{
									data: this.chartdatas['Deceased'],
									label: 'deceased',
									backgroundColor: 'rgba(255,255,255,1)',
									borderColor: '#AFD275',
									pointRadius: 1,
									fill: false
								},
								{
									data: this.chartdatas['Recovered'],
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
			});
		});
	}
}
