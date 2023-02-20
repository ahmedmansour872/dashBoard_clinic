import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/about-clinics/services/receptionist/doctors/doctor.service';
import { DoctorService as allUsers } from 'src/app/about-clinics/services/doctors/doctor/doctor.service';
import { User } from 'src/app/super-admin/interface/user';
import { popup } from 'src/app/animations/popup';
import { move } from 'src/app/animations/moveOn';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [popup, move],
})
export class UsersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  hidePassword: boolean;
  hideConfirmePassword: boolean;
  AddCheck: boolean;
  clinics: any;
  userForm: FormGroup;
  isOpenPopup: boolean;
  isShowData: boolean;
  message: string;
  allDoctors: any;
  success: string;
  wrong: string;
  userID: any;
  roles: string[];
  citizens: string[];
  roleName: string;
  accommodationType: string;
  constructor(
    private doctors: DoctorService,
    private user: allUsers,
    private formbuilder: FormBuilder
  ) {
    this.roleName = '';
    this.accommodationType = '';
    this.roles = [
      'Doctor',
      'Receptionist',
      'Accountant',
      'HumanResourcesManager',
      'Employee',
      'Patient',
      'Storekeeper',
    ];
    this.citizens = ['Citizen', 'Expatriate'];
    this.userID = 0;
    this.success = '';
    this.wrong = '';
    this.AddCheck = false;
    this.hidePassword = true;
    this.hideConfirmePassword = true;
    this.message = 'Add User';
    this.isOpenPopup = false;
    this.isShowData = true;
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.email, Validators.required]],
      phone: [
        '',
        [
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,
        ],
      ],
      name: ['', [Validators.minLength(3), Validators.required]],
      national_id: [
        '',
        [
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.required,
        ],
      ],
      role: ['', [Validators.required]],
      accommodation_type: ['', [Validators.required]],
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
    let sub = this.doctors.allUserClinic().subscribe(
      (data: any) => {
        this.allDoctors = data.data.staff;
        this.isShowData = true;
      },
      (err) => (this.isShowData = false)
    );

    this.subscriptions.push(sub);
  }

  openPopup() {
    this.AddCheck = true;
    this.isOpenPopup = true;
    this.message = 'Add User';
    this.userForm.patchValue({
      email: '',
      phone: '',
      name: 'name',
      national_id: '',
      password: '',
      password_confirmation: '',
    });
  }

  editPopup(user: User) {
    this.userID = user.id;
    this.AddCheck = false;
    this.message = 'Update User';
    this.isOpenPopup = true;
    this.userForm.patchValue({
      email: user.email,
      phone: user.phone,
      name: user.name,
      national_id: user.national_id,
    });
  }

  addUser() {
    let sub = this.user.craeteDoctors(this.userForm.value).subscribe(
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

  editUder() {
    let userUpdate = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      national_id: this.userForm.value.national_id,
      role: this.userForm.value.role,
      accommodation_type: this.userForm.value.accommodation_type,
    };

    let sub = this.user.updateUser(userUpdate, this.userID).subscribe(
      () => {
        this.success = 'edit';
        setTimeout(() => {
          this.success = '';
          this.isOpenPopup = false;
        }, 2000);
        this.ngOnInit();
      },
      (err) => {
        this.wrong = 'errorEdit';
        setTimeout(() => {
          this.wrong = '';
        }, 2000);
      }
    );

    this.subscriptions.push(sub);
  }

  get email() {
    return this.userForm.get('email');
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

  get role() {
    return this.userForm.get('role');
  }

  get accommodationTypeing() {
    return this.userForm.get('accommodation_type');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
