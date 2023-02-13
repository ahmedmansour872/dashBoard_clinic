import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuperComponent } from './home-super.component';

describe('HomeSuperComponent', () => {
  let component: HomeSuperComponent;
  let fixture: ComponentFixture<HomeSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSuperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
