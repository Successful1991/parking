import {Component, OnInit} from '@angular/core';
import {CarService} from './car/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private carService: CarService) {
  }

  parkingList;
  addCars = {
    carDisabledPerson: {
      type: 'carDisabledPerson',
      amount: 3
    },
    cargo: {
      type: 'cargo',
      amount: 4
    },
    usual: {
      type: 'usual',
      amount: 3
    }
  };
  emptySeat;

  setCar() {
    this.carService.checkEmptySeats(this.addCars);
  }

  ngOnInit() {
    this.parkingList = this.carService.addPlaces();
    this.emptySeat = this.carService.getEmptySeat();
  }

  delCar(event) {
    console.log(event);
    let id = Number(event.target.id);
    this.carService.delCar(id);
  }

}


