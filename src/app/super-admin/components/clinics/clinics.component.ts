import { Router } from '@angular/router';
import { ClinicsService } from './../../services/clinics/clinics.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { popup } from 'src/app/animations/popup';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
  animations: [popup],
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

  constructor(
    private clinics: ClinicsService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
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
      (data) => {
        this.result = data.data.active;
        this.isShowData = true;
        this.dataSource = new MatTableDataSource(data.data.active);
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

  editPopup(clinic: any) {
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
    this.clinics
      .createClinic(this.clinicForm.value)
      .subscribe(() => location.reload());
  }

  editClinic() {
    this.clinics
      .editClinic(this.clinicForm.value, this.clinicId)
      .subscribe(() => location.reload());
  }

  deleteClinic(clinic: any) {
    let check = confirm(`Are You Sure Delete this Clinic ${clinic.title}`);
    if (check) {
      this.clinics.deleteClinic(clinic.id).subscribe(() => location.reload());
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
