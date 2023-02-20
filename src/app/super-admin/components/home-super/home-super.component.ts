import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Clinics } from '../../interface/clinics';
import { ClinicsService } from '../../services/clinics/clinics.service';

@Component({
  selector: 'app-home-super',
  templateUrl: './home-super.component.html',
  styleUrls: ['./home-super.component.scss'],
})
export class HomeSuperComponent implements OnInit, AfterViewInit, OnDestroy {
  result: any;
  isShowData: boolean;

  subscriptions: Subscription[] = [];
  constructor(private aboutClinics: ClinicsService) {
    this.result = [];
    this.isShowData = true;
  }

  ngOnInit(): void {
    let sub = this.aboutClinics.getClinics().subscribe(
      (data: Clinics) => {
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

    this.subscriptions.push(sub);
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
