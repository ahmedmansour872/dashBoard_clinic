import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminCLinicComponent } from './home-admin-c-linic.component';

describe('HomeAdminCLinicComponent', () => {
  let component: HomeAdminCLinicComponent;
  let fixture: ComponentFixture<HomeAdminCLinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminCLinicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminCLinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
