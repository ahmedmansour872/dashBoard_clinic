import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Items } from 'src/app/about-clinics/interface/store/items';
import { InsuranceService } from 'src/app/about-clinics/services/receptionist/insurance/insurance.service';
import { move } from 'src/app/animations/moveOn';
import { popup } from 'src/app/animations/popup';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  animations: [popup, move],
})
export class InsuranceComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  AddCheck: boolean;
  campanyForm: FormGroup;
  isOpenPopup: boolean;
  isShowData: boolean;
  message: string;
  allCampany: any;
  // allCampany: Items[];
  success: string;
  wrong: string;
  campanyId: any;
  fileImg: string;
  logoImg: any;

  constructor(
    private campany: InsuranceService,
    private formbuilder: FormBuilder
  ) {
    this.fileImg = '';
    this.campanyId = 0;
    this.success = '';
    this.wrong = '';
    this.allCampany = [];
    this.AddCheck = false;
    this.message = 'Add Item';
    this.isOpenPopup = false;
    this.isShowData = true;

    this.campanyForm = this.formbuilder.group({
      file: ['', [Validators.required]],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: '',
    });

    this.campanyForm.valueChanges.subscribe((changes) => {
      if (isNaN(changes.code)) {
        this.campanyForm.patchValue({
          code: changes.code.replace(/[a-zA-Z!@#$%^&*]/g, ''),
        });
      }
    });
  }

  ngOnInit(): void {
    let sub = this.campany.company().subscribe(
      (data: any) => {
        this.allCampany = data.data;
        this.isShowData = true;
      },
      (err) => (this.isShowData = false)
    );

    this.subscriptions.push(sub);
  }

  openPopup() {
    this.AddCheck = true;
    this.isOpenPopup = true;
    this.message = 'Add Campany';
    this.campanyForm.patchValue({
      code: 'number',
      name: '5',
      description: '5',
    });
  }

  editPopup(campany: any) {
    this.campanyId = campany.id;
    this.AddCheck = false;
    this.message = 'Update Campany';
    this.isOpenPopup = true;
    this.campanyForm.patchValue({
      code: campany.code,
      name: campany.name,
      description: campany.description,
    });
  }

  logo(logo: any) {
    this.logoImg = logo.target.files[0];
    this.campanyForm.patchValue({
      file: this.logoImg,
    });
    if (logo.target.value) {
      let index_of_name_imge = logo.target.value.lastIndexOf('\\') + 1;
      this.fileImg =
        '../../../../../assets/' + logo.target.value.slice(index_of_name_imge);
    }
  }

  addCamp() {
    let sub = this.campany.createCompany(this.campanyForm.value).subscribe(
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
        }, 2000);
      }
    );
    this.subscriptions.push(sub);
  }

  editCamp() {
    let comp = {
      code: this.campanyForm.value.code,
      name: this.campanyForm.value.name,
      description: this.campanyForm.value.description,
      logo: this.logoImg,
    };
    let sub = this.campany.updateCompany(comp, this.campanyId).subscribe(
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
        }, 2000);
      }
    );
    this.subscriptions.push(sub);
  }

  deleteCamp(item: Items) {
    let sub = this.campany.deleteCompany(item.id).subscribe(
      () => {
        this.success = 'Delete';
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
        }, 2000);
      }
    );
    this.subscriptions.push(sub);
  }

  get code() {
    return this.campanyForm.get('code');
  }

  get name() {
    return this.campanyForm.get('name');
  }

  get description() {
    return this.campanyForm.get('description');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
