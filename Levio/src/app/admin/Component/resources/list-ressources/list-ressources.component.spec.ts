import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRessourcesComponent } from './list-ressources.component';

describe('ListRessourcesComponent', () => {
  let component: ListRessourcesComponent;
  let fixture: ComponentFixture<ListRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
