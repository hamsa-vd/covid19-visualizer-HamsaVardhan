import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatesComponent } from './states/states.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'main',
		component: MainComponent
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: ':code',
				component: StatesComponent
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
