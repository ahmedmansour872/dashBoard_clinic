import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { popup } from 'src/app/animations/popup';
import { GetUsersService } from '../../services/get-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [popup],
})
export class UsersComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  isOpenPopup: boolean;
  isShowData: boolean;
  constructor(private users: GetUsersService) {
    this.isOpenPopup = false;
    this.isShowData = false;
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

  edit(x: any) {
    console.log(x);
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
