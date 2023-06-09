import { popup } from 'src/app/animations/popup';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicsService } from '../../services/clinics/clinics.service';
import { move } from 'src/app/animations/moveOn';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-clinic',
  templateUrl: './search-clinic.component.html',
  styleUrls: ['./search-clinic.component.scss'],
  animations: [popup, move],
})
export class SearchClinicComponent implements OnInit, OnDestroy {
  clinicForm: FormGroup;
  clinicId: number;
  showData: boolean;
  success: string;
  wrong: string;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private clinics: ClinicsService,
    private formbuilder: FormBuilder
  ) {
    this.success = '';
    this.wrong = '';
    this.showData = true;
    this.clinicId = 2;
    this.clinicForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let sub = this.activateRoute.paramMap.subscribe((data) => {
      this.clinics.getOneClinic(Number(data.get('id'))).subscribe(
        (data: any) => {
          this.showData = true;
          this.clinicForm.patchValue({
            title: data.data[0].title,
            address: data.data[0].address,
            city: data.data[0].city,
          });
          this.clinicId = data.data[0].id;
        },
        (err) => {
          this.showData = false;
          setTimeout(() => {
            this.router.navigateByUrl('/superAdmin/clinics');
          }, 5000);
        }
      );
    });

    this.subscriptions.push(sub);
  }

  editClinic() {
    let sub = this.clinics
      .editClinic(this.clinicForm.value, this.clinicId)
      .subscribe(
        () => {
          this.success = 'edit';
          setTimeout(() => {
            this.success = '';
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

  deleteClinic() {
    let check = confirm(`Are You Sure Delete this Clinic ${this.title?.value}`);
    if (check) {
      let sub = this.clinics.deleteClinic(this.clinicId).subscribe(
        () => {
          this.success = 'delete';
          setTimeout(() => {
            this.success = '';
          }, 2000);
          this.router.navigateByUrl('/superAdmin/clinics');
        },
        (err) => {
          this.wrong = 'errorDelete';
          setTimeout(() => {
            this.wrong = '';
          }, 2000);
        }
      );

      this.subscriptions.push(sub);
    }
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
