import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { RegisterService } from '../../register.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor( private registerService: RegisterService ) { }

  forms = new FormGroup({
    fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
    ])), 
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')      
    ])),
    password: new FormControl('', Validators.required),
    CPassword: new FormControl('', Validators.required)

  });

  onSubmit(form: NgForm) {
    this.registerService.postUsers(form.value).subscribe((res) => {
      // console.log(res);
      console.log(this.forms.value);
      console.log("Registered Successful");
      this.forms.reset();
    });
  }

   ngOnInit(){     }

}


