import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ChildService } from '../child.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	Register;
	Login;
	check = false;
	constructor(private fb: FormBuilder, private serve: ChildService, private route: Router) {}

	ngOnInit(): void {
		this.Register = this.fb.group({
			firstName: [ '', Validators.required ],
			lastName: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required ] ]
		});
		this.Login = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', Validators.required ]
		});
	}
	loginsubmit() {
		if (this.Login.valid)
			this.serve.logindata(this.Login.value).subscribe((v) => {
				localStorage.setItem('token', v['token']);
				this.route.navigate([ '/main' ]);
			});
		else {
		}
	}
	registersubmit() {
		console.log(this.Register);
		if (this.Register.valid) {
			this.check = true;
			this.serve.registerdata(this.Register.value).subscribe((v) => {
				console.log(v);
			});
		} else {
		}
	}
}
