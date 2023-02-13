import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { popup } from 'src/app/animations/popup';
import { GetUsersService } from '../../services/users/get-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [popup],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  isOpenPopup: boolean;
  isShowData: boolean;
  message: string;
  constructor(
    private users: GetUsersService,
    private formbuilder: FormBuilder
  ) {
    this.message = 'Add User';
    this.isOpenPopup = false;
    this.isShowData = false;
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.email]],
      phone: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      name: ['', [Validators.minLength(3)]],
      national: ['', [Validators.minLength(14), Validators.maxLength(14)]],
      clinic: [''],
    });

    this.userForm.valueChanges.subscribe((changes) => {
      if (isNaN(changes.phone)) {
        this.userForm.patchValue({
          phone: changes.phone.replace(/[a-zA-Z!@#$%^&*]/g, ''),
        });
      }
      if (isNaN(changes.national)) {
        this.userForm.patchValue({
          national: changes.national.replace(/[a-zA-Z!@#$%^&*]/g, ''),
        });
      }
    });
  }

  ngOnInit(): void {
    this.users.getInfoAboutClinics().subscribe(
      (data) => {
        this.isShowData = true;
        this.dataSource = new MatTableDataSource(data.data[0]);
      },
      (err) => (this.isShowData = false)
    );
  }

  addUser() {
    this.isOpenPopup = true;
    this.message = 'Add User';
    this.userForm.setValue({
      email: '',
      phone: '',
      name: '',
      national: '',
      clinic: '',
    });
  }

  edit(user: any) {
    this.isOpenPopup = true;
    console.log(user);
    this.userForm.setValue({
      email: user.email,
      phone: user.phone,
      name: user.name,
      national: user.national_id,
      clinic: user.clinic_id,
    });
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
    return this.userForm.get('national');
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
