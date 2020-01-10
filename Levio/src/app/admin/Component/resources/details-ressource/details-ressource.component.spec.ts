import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRessourceComponent } from './details-ressource.component';

describe('DetailsRessourceComponent', () => {
  let component: DetailsRessourceComponent;
  let fixture: ComponentFixture<DetailsRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
