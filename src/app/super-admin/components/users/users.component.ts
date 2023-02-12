import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GetUsersService } from '../../services/get-users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  result: any;
  constructor(private users: GetUsersService) {
    this.result = [];
  }

  ngOnInit(): void {
    this.users.getUsers().subscribe((data) => {
      data.data.active.forEach((e: any, i: number) => {
        this.result.push({
          index: i + 1,
          name: e.staff[0].name,
          title: e.title,
          phone: e.staff[0].phone,
          city: e.city,
          address: e.address,
        });
      });
      this.dataSource = new MatTableDataSource(this.result);
    });
  }

  displayedColumns: string[] = [
    'index',
    'name',
    'title',
    'phone',
    'city',
    'address',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
