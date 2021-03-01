import {CarListComponent} from './components/car/car.list.component';
import {CarDetailComponent} from './components/car/car.detail.component';

export const ROUTES = [
  { path: '', redirectTo: 'cars-list', pathMatch: 'full'},
  { path: 'cars-list', pathMatch: 'full', component: CarListComponent},
  { path: 'car-detail', pathMatch: 'full', component: CarDetailComponent }
];

