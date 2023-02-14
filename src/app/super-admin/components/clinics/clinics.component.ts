import { move } from 'src/app/animations/moveOn';
import { Clinic } from './../../interface/clinic';
import { Router } from '@angular/router';
import { ClinicsService } from './../../services/clinics/clinics.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { popup } from 'src/app/animations/popup';
import { Clinics } from '../../interface/clinics';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
  animations: [popup, move],
})
export class ClinicsComponent implements OnInit {
  AddCheck: boolean;
  clinic: any;
  clinicForm: FormGroup;
  message: string;
  isOpenPopup: boolean;
  result: any;
  isShowData: boolean;
  clinicId: number;
  success: string;
  wrong: string;

  constructor(
    private clinics: ClinicsService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.success = '';
    this.wrong = '';
    this.clinicId = 1;
    this.isOpenPopup = false;
    this.result = [];
    this.isShowData = true;
    this.AddCheck = false;
    this.message = 'Add clinic';
    this.clinicForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.clinics.getClinics().subscribe(
      (data: Clinics) => {
        this.result = data.data.active;
        this.isShowData = true;
        this.dataSource = new MatTableDataSource(this.result);
      },
      (err) => (this.isShowData = false)
    );
  }

  openPopup() {
    this.AddCheck = true;
    this.isOpenPopup = true;
    this.message = 'Add Clinic';
    this.clinicForm.setValue({
      title: '',
      address: '',
      city: '',
    });
  }

  editPopup(clinic: Clinic) {
    this.clinicId = clinic.id;
    this.AddCheck = false;
    this.message = 'Edit clinic';
    this.isOpenPopup = true;
    this.clinicForm.patchValue({
      title: clinic.title,
      address: clinic.address,
      city: clinic.city,
    });
  }

  addClinic() {
    this.clinics.createClinic(this.clinicForm.value).subscribe(
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
          this.isOpenPopup = false;
        }, 2000);
      }
    );
  }

  editClinic() {
    this.clinics.editClinic(this.clinicForm.value, this.clinicId).subscribe(
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
          this.isOpenPopup = false;
        }, 2000);
      }
    );
  }

  deleteClinic(clinic: Clinic) {
    let check = confirm(`Are You Sure Delete this Clinic ${clinic.title}`);
    if (check) {
      this.clinics.deleteClinic(clinic.id).subscribe(
        () => {
          this.success = 'delete';
          setTimeout(() => {
            this.success = '';
            this.isOpenPopup = false;
          }, 2000);
          this.ngOnInit();
        },
        (err) => {
          this.wrong = 'errorDelete';
          setTimeout(() => {
            this.wrong = '';
            this.isOpenPopup = false;
          }, 2000);
        }
      );
    }
  }

  searchClinic(title: any) {
    this.router.navigate(['superAdmin/clinic', title.id]);
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

  displayedColumns: string[] = ['title', 'city', 'address', 'delete', 'edit'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
