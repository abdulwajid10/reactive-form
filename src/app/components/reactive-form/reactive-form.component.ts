import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  reactiveForm: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.reactiveForm = this._fb.group({
      firstName: [null, Validators.required],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      Password: [null, [Validators.required, Validators.minLength(6)]],
      Confirmpassword: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      address: this._fb.group({
        expiryDate: [null, Validators.required],
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required]
      })
    },
    {
      validators: this.Mustmatch('Password', 'Confirmpassword')
    }
    );
  }

  get f(){
    return this.reactiveForm.controls;
  }

  Mustmatch(pass: string, confirmpass: string){
    return (FormGroup:FormGroup)=>{
      const control = FormGroup.controls[pass];
      const matchControl = FormGroup.controls[confirmpass];
      if(matchControl.errors && !matchControl.errors.Mustmatch){
        return
      }
      if(control.value !== matchControl.value){
        matchControl.setErrors({Mustmatch:true})
      }else{
        matchControl.setErrors(null);
      }
    }
  }

  // get firstName() {
  //   const temp = <FormGroup>this.reactiveForm.controls.firstName;
  //   return temp.controls.firstName;
  // }

  submitHandler(){
    console.log(this.reactiveForm);
  }
}
