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
      email: [null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      address: this._fb.group({
        expiryDate: [null, Validators.required],
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required]
      })
    });
  }

  // get firstName() {
  //   const temp = <FormGroup>this.reactiveForm.controls.firstName;
  //   return temp.controls.firstName;
  // }

  get email() {
    const temp = <FormGroup>this.reactiveForm.controls.email;
    return temp.controls.email;
  }

  submitHandler(){
    console.log(this.reactiveForm);
  }
}
