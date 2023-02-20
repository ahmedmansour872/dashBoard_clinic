import { Items } from './../../interface/store/items';
import { Store } from './../../interface/store/store';
import { StoreService } from './../../services/stores/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { popup } from 'src/app/animations/popup';
import { move } from 'src/app/animations/moveOn';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  animations: [popup, move],
})
export class StoreComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  AddCheck: boolean;
  itemForm: FormGroup;
  isOpenPopup: boolean;
  isShowData: boolean;
  message: string;
  allItems: Items[];
  success: string;
  wrong: string;
  itemId: any;

  constructor(private stores: StoreService, private formbuilder: FormBuilder) {
    this.itemId = 0;
    this.success = '';
    this.wrong = '';
    this.allItems = [];
    this.AddCheck = false;
    this.message = 'Add Item';
    this.isOpenPopup = false;
    this.isShowData = true;

    this.itemForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: '',
    });

    this.itemForm.valueChanges.subscribe((changes) => {
      if (isNaN(changes.price)) {
        this.itemForm.patchValue({
          price: changes.price.replace(/[a-zA-Z!@#$%^&*]/g, ''),
        });
      }
    });
  }

  ngOnInit(): void {
    let sub = this.stores.stores().subscribe(
      (data: Store) => {
        this.allItems = data.data[0].items;
        this.isShowData = true;
      },
      (err) => (this.isShowData = false)
    );

    this.subscriptions.push(sub);
  }

  openPopup() {
    this.AddCheck = true;
    this.isOpenPopup = true;
    this.message = 'Add Item';
    this.itemForm.patchValue({
      title: 'bandage',
      type: 'number',
      quantity: '5',
      price: '5',
    });
  }

  editPopup(item: any) {
    this.itemId = item.id;
    this.AddCheck = false;
    this.message = 'Update Item';
    this.isOpenPopup = true;
    this.itemForm.patchValue({
      title: item.title,
      type: item.type,
      quantity: item.quantity,
      price: item.price,
    });
  }

  addItem() {
    let sub = this.stores.createItems(this.itemForm.value).subscribe(
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

  editItem() {
    let sub = this.stores
      .updateItems(this.itemForm.value, this.itemId)
      .subscribe(
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

  deleteStore(item: Items) {
    let sub = this.stores.deleteItems(item.id).subscribe(
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

  get title() {
    return this.itemForm.get('title');
  }

  get type() {
    return this.itemForm.get('type');
  }

  get quantity() {
    return this.itemForm.get('quantity');
  }

  get price() {
    return this.itemForm.get('price');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
