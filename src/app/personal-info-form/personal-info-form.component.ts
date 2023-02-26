import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css'],
})
export class PersonalInfoFormComponent implements OnInit {
  personalInfoForm: FormGroup;
  message: string;
  messageColor: string;
  hobbiesControl = new FormControl('', [Validators.required]);
  hobbiesList: string[];

  constructor(
    private formBuilder: FormBuilder,
    private dataSrv: UserdataService
  ) {
    this.message = '';
    this.messageColor = 'red';
    this.hobbiesList = dataSrv.getHobbiesList();
    this.personalInfoForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      seats: ['', Validators.required],
      motorType: ['', Validators.required],
      favColor: ['', Validators.required],
      hobbies: this.hobbiesControl,
    });
  }

  ngOnInit(): void {}

  saveForm() {
    this.dataSrv.incrementAndSaveAttemptCounter();

    if (this.personalInfoForm.valid) {
      //convert color object to string
      this.personalInfoForm.value.favColor =
        this.personalInfoForm.value.favColor.toString();

      //convert to better date format
      this.personalInfoForm.value.dob = new Date(
        this.personalInfoForm.value.dob.toString()
      ).toDateString();

      const formInfo = this.personalInfoForm.value;
      const formOwnerEmail = this.personalInfoForm.value.email;
      const formGender = this.personalInfoForm.value.gender;
      const formOwnerHobbies = Object.values(
        this.personalInfoForm.value.hobbies
      );
      console.log(formOwnerHobbies);

      this.message = this.dataSrv.saveForm(
        formInfo,
        formOwnerEmail,
        formGender,
        formOwnerHobbies
      );
      if (this.message === 'success') {
        this.messageColor = 'green';
        this.message = 'Data was added successfully!';
      } else {
        this.messageColor = 'red';
      }
    } else {
      this.messageColor = 'red';
      this.message = 'Please fill all required fields correctly';
    }
  }
}
