import { PatientService } from './../../../services/patient/patient.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { move } from 'src/app/animations/moveOn';
import { popup } from 'src/app/animations/popup';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  animations: [popup, move],
})
export class PatientsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  hidePassword: boolean;
  hideConfirmePassword: boolean;
  AddCheck: boolean;
  userForm: FormGroup;
  isOpenPopup: boolean;
  isShowData: boolean;
  message: string;
  success: string;
  wrong: string;
  PatientID: any;
  allPatients: any;
  constructor(
    private patient: PatientService,
    private formbuilder: FormBuilder
  ) {
    this.PatientID = 0;
    this.success = '';
    this.wrong = '';
    this.AddCheck = false;
    this.hidePassword = true;
    this.hideConfirmePassword = true;
    this.message = 'Add User';
    this.isOpenPopup = false;
    this.isShowData = true;
    this.userForm = this.formbuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      phone: [
        '',
        [
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,
        ],
      ],
      national_id: [
        '',
        [
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });

    this.userForm.valueChanges.subscribe((changes) => {
      if (isNaN(changes.phone)) {
        this.userForm.patchValue({
          phone: changes.phone.replace(/[a-zA-Z!@#$%^&*]/g, ''),
        });
      }
      if (isNaN(changes.national_id)) {
        this.userForm.patchValue({
          national_id: changes.national_id.replace(/[a-zA-Z!@#$%^&*]/g, ''),
        });
      }
    });
  }

  ngOnInit(): void {
    let sub = this.patient.getPatients().subscribe(
      (data: any) => {
        this.allPatients = data.data;
        this.isShowData = true;
      },
      (err) => (this.isShowData = false)
    );
    this.subscriptions.push(sub);
  }

  openPopup() {
    this.AddCheck = true;
    this.isOpenPopup = true;
    this.message = 'Add Patient';
    this.userForm.patchValue({
      phone: '',
      name: 'name',
      national_id: '',
      password: '',
      password_confirmation: '',
    });
  }

  addPatient() {
    console.log(this.userForm.value);
    let sub = this.patient.register(this.userForm.value).subscribe(
      () => {
        this.success = 'add';
        setTimeout(() => {
          this.success = '';
          this.isOpenPopup = false;
        }, 2000);
        this.ngOnInit();
      },
      (err) => {
        this.wrong = 'errorAdd';
        setTimeout(() => {
          this.wrong = '';
        }, 2000);
      }
    );

    this.subscriptions.push(sub);
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get name() {
    return this.userForm.get('name');
  }

  get national() {
    return this.userForm.get('national_id');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmePassword() {
    return this.userForm.get('password_confirmation');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
