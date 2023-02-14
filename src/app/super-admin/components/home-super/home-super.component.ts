import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClinicsService } from '../../services/clinics/clinics.service';

@Component({
  selector: 'app-home-super',
  templateUrl: './home-super.component.html',
  styleUrls: ['./home-super.component.scss'],
})
export class HomeSuperComponent implements OnInit, AfterViewInit {
  result: any;
  isShowData: boolean;
  constructor(private aboutClinics: ClinicsService) {
    this.result = [];
    this.isShowData = true;
  }

  ngOnInit(): void {
    this.aboutClinics.getClinics().subscribe(
      (data) => {
        this.isShowData = true;
        data.data.active.forEach((e: any, i: number) => {
          if (e.staff.length > 0)
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
      },
      (err) => (this.isShowData = false)
    );
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
