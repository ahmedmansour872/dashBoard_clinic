import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCLinicsComponent } from './home-clinics.component';

describe('HomeCLinicsComponent', () => {
  let component: HomeCLinicsComponent;
  let fixture: ComponentFixture<HomeCLinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCLinicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCLinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
