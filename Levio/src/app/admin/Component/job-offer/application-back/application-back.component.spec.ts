import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBackComponent } from './application-back.component';

describe('ApplicationBackComponent', () => {
  let component: ApplicationBackComponent;
  let fixture: ComponentFixture<ApplicationBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
