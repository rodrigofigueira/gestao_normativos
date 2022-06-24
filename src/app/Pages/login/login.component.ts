import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm! : FormGroup;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name : new FormControl('', [Validators.required,
                                  Validators.minLength(4)]),
      password : new FormControl('', Validators.required)
    });
  }

  get name(): any {
    return this.userForm.get('name');
  }

  get password(): any {
    return this.userForm.get('password');
  }

  submit(): void{

    let user: User = this.userForm.value;
    let userSearched: boolean = this.auth.login(user);

    if(userSearched){
      this.router.navigate(['home']);
    };

  }

}
