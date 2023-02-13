import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuperAdminComponent } from './home-super-admin.component';

describe('HomeSuperAdminComponent', () => {
  let component: HomeSuperAdminComponent;
  let fixture: ComponentFixture<HomeSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSuperAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
