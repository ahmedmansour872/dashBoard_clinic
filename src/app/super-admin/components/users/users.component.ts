import { move } from 'src/app/animations/moveOn';
import { User } from './../../interface/user';
import { Clinics } from './../../interface/clinics';
import { ClinicsService } from './../../services/clinics/clinics.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { popup } from 'src/app/animations/popup';
import { GetUsersService } from '../../services/users/get-users.service';
import { Users } from '../../interface/users';
import { Clinic } from '../../interface/clinic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [popup, move],
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
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
  userID: any;
  clinicForm: FormGroup;

  constructor(
    private users: GetUsersService,
    private clinic: ClinicsService,
    private formbuilder: FormBuilder
  ) {
    this.userID = 0;
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
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });

    this.clinicForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
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
    let sub = this.users.getInfoAboutClinics().subscribe(
      (data: Users) => {
        this.allUser = data.data[0];
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

    this.subscriptions.push(sub);
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
    let sub1 = this.clinic
      .createClinic(this.clinicForm.value)
      .subscribe((data: any) => {
        let user = {
          clinic_id: data.data[0].id,
          email: this.userForm.value.email,
          phone: this.userForm.value.phone,
          name: this.userForm.value.name,
          national_id: this.userForm.value.national_id,
          password: this.userForm.value.password,
          password_confirmation: this.userForm.value.password_confirmation,
        };

        let sub = this.users.createUser(user).subscribe(
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
      });
    this.subscriptions.push(sub1);
  }

  editUder() {
    let userUpdate = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      national_id: this.userForm.value.national_id,
    };

    let sub = this.users.editUser(userUpdate, this.userID).subscribe(
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

  get title() {
    return this.clinicForm.get('title');
  }

  get address() {
    return this.clinicForm.get('address');
  }

  get city() {
    return this.clinicForm.get('city');
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
