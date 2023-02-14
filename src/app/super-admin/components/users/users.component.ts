import { move } from 'src/app/animations/moveOn';
import { User } from './../../interface/user';
import { Clinics } from './../../interface/clinics';
import { ClinicsService } from './../../services/clinics/clinics.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { popup } from 'src/app/animations/popup';
import { GetUsersService } from '../../services/users/get-users.service';
import { Users } from '../../interface/users';
import { Clinic } from '../../interface/clinic';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [popup, move],
})
export class UsersComponent implements OnInit {
  hidePassword: boolean;
  hideConfirmePassword: boolean;
  AddCheck: boolean;
  clinics: any;
  userForm: FormGroup;
  isOpenPopup: boolean;
  isShowData: boolean;
  message: string;
  allUser: any;
  allUsers: any;
  success: string;
  wrong: string;

  constructor(
    private users: GetUsersService,
    private clinic: ClinicsService,
    private formbuilder: FormBuilder
  ) {
    this.success = '';
    this.wrong = '';
    this.AddCheck = false;
    this.allUser = 0;
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
      password: [''],
      password_confirmation: [''],
      clinic_id: ['', Validators.required],
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
    this.users.getInfoAboutClinics().subscribe(
      (data: Users) => {
        this.allUser = data.data[0];
        console.log(this.allUser.length)
        this.allUsers = data.data;
        this.isShowData = true;
        this.dataSource = new MatTableDataSource(this.allUsers[0]);
      },
      (err) => (this.isShowData = false)
    );

    this.clinic.getClinics().subscribe((data: Clinics) => {
      this.clinics = data.data.active.filter((e: Clinic) => {
        return e.admin == '';
      });
    });
  }

  openPopup() {
    this.AddCheck = true;
    this.isOpenPopup = true;
    this.message = 'Add User';
    this.userForm.setValue({
      email: '',
      phone: '',
      name: 'name',
      national_id: '',
      clinic_id: '',
      password: '',
      password_confirmation: '',
    });

    console.log(this.clinics.length);
  }

  editPopup(user: User) {
    this.AddCheck = false;
    this.message = 'Edit User';
    this.isOpenPopup = true;
    this.userForm.patchValue({
      email: user.email,
      phone: user.phone,
      name: user.name,
      national_id: user.national_id,
    });
  }

  addUser() {
    this.clinics.forEach((e: Clinic) => {
      if (this.userForm.value.clinic_id == e.title) {
        this.userForm.value.clinic_id = e.id;
      }
    });
    this.users.createUser(this.userForm.value).subscribe(
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
          this.isOpenPopup = false;
        }, 2000);
      }
    );
  }

  editUder() {
    let userUpdate = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      national_id: this.userForm.value.national_id,
    };

    this.users.editUser(userUpdate).subscribe((data) => console.log(data));
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

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'national_id',
    'edit',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
