import {CarListComponent} from './car.list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarItem, CarService} from '../../services/car.service';
import {Subject} from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;


describe('car.list.component', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let stubSpy: SpyObj<CarService>;
  let mockedList: Subject<CarItem[]>;

  beforeEach(() => {
    stubSpy = createSpyObj('CarService', ['getCars']);
    mockedList = new Subject<CarItem[]>();
    stubSpy.carsList$ = mockedList.asObservable();
    TestBed.configureTestingModule({
      providers: [ { provide: CarService, useValue: stubSpy } ],
      declarations: [ CarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should render cars list', () => {
    const compiled = fixture.debugElement;
    expect(stubSpy.getCars).toHaveBeenCalled();
  });
});

