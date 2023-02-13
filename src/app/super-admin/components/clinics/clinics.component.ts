import { Router } from '@angular/router';
import { ClinicsService } from './../../services/clinics/clinics.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
})
export class ClinicsComponent implements OnInit {
  isOpenPopup: boolean;
  result: any;
  isShowData: boolean;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  constructor(private clinics: ClinicsService, private router: Router) {
    this.isOpenPopup = false;
    this.result = [];
    this.isShowData = false;
  }

  ngOnInit(): void {
    this.clinics.getClinics().subscribe(
      (data) => {
        console.log(data.data.active);
        this.result = data.data.active;
        this.isShowData = true;
        this.dataSource = new MatTableDataSource(data.data.active);
      },
      (err) => (this.isShowData = false)
    );
  }

  edit(x: any) {
    console.log(x);
  }
  searchClinic(title: any) {
    console.log(title.id);
    this.router.navigate(['superAdmin/clinic', title.id]);
  }
  displayedColumns: string[] = ['title', 'city', 'address', 'delete', 'edit'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
