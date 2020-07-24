import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDestinoComponent } from './form-destino.component';

describe('FormDestinoComponent', () => {
  let component: FormDestinoComponent;
  let fixture: ComponentFixture<FormDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
