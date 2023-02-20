import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/about-clinics/services/receptionist/doctors/doctor.service';
import { Users } from 'src/app/super-admin/interface/users';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit, OnDestroy {
  isShowData: boolean;
  allDoctors: any;
  subscriptions: Subscription[] = [];
  constructor(private doctors: DoctorService) {
    this.isShowData = true;
  }

  ngOnInit(): void {
    let sub = this.doctors.doctors().subscribe(
      (data: any) => {
        this.allDoctors = data.data;
        this.isShowData = true;
      },
      (err) => (this.isShowData = false)
    );

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
