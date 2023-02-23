import { PatientService } from './../../../services/patient/patient.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { move } from 'src/app/animations/moveOn';
import { popup } from 'src/app/animations/popup';

@Component({
  selector: 'app-search-patients',
  templateUrl: './search-patients.component.html',
  styleUrls: ['./search-patients.component.scss'],
  animations: [popup, move],
})
export class SearchPatientsComponent implements OnInit, OnDestroy {
  showData: boolean;
  wrong: string;
  subscriptions: Subscription[] = [];
  result: any;
  national_id: any;
  phone: any;
  name: any;

  constructor(
    private patient: PatientService,
    private activateRoute: ActivatedRoute
  ) {
    this.wrong = '';
    this.showData = true;
  }

  ngOnInit(): void {
    let sub = this.activateRoute.paramMap.subscribe((data) => {
      this.patient
        .showPatient(Number(data.get('id')))
        .subscribe((data: any) => {
          this.name = data.data.name;
          this.phone = data.data.phone;
          this.national_id = data.data.national_id;
        });
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
