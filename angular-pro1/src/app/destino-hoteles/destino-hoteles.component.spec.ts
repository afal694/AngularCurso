import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoHotelesComponent } from './destino-hoteles.component';

describe('DestinoHotelesComponent', () => {
  let component: DestinoHotelesComponent;
  let fixture: ComponentFixture<DestinoHotelesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinoHotelesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
