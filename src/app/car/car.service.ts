import { Injectable } from '@angular/core';
import {Places} from './car';

@Injectable()

export class CarService {

  constructor() {}
  parkingParameters = [
    {
      type: 'carDisabledPerson',
      amount: 3,
    },
    {
      type: 'usual',
      amount: 8,
    },
    {
      type: 'cargo',
      amount: 4,
    }
  ];

  emptySeat = {
    carDisabledPerson: {
      type: 'carDisabledPerson',
      amount: 0
    },
    usual: {
      type: 'usual',
      amount: 0
    },
    cargo: {
      type: 'cargo',
      amount: 0
    }
  };


  addedCarsList;
  parkingList = [];

  addPlaces(){
    this.parkingParameters.forEach( placeType => {
      for(let i = 0 ; i < placeType.amount ; i++){
        this.parkingList.push(new Places(placeType.type,(this.parkingList.length+1) ));
      }
    });
    return this.parkingList;
  }

  getEmptySeat(){
      this.parkingList.forEach( place =>{
        if( this.emptySeat.usual.type === place.carType && place.status === false){
          return this.emptySeat.usual.amount +=1;
        }
        else if( this.emptySeat.cargo.type === place.carType && place.status === false){
          return this.emptySeat.cargo.amount +=1;
        }
        else if( this.emptySeat.carDisabledPerson.type === place.carType && place.status === false){
          return this.emptySeat.carDisabledPerson.amount +=1;
        }
      });
      return this.emptySeat;
  }

  checkEmptySeats(cars){
    this.addedCarsList = cars;

    if(cars.carDisabledPerson.amount > 0 && this.emptySeat.carDisabledPerson.amount > 0){
      this.addCarParkingList(cars.carDisabledPerson.type, cars.carDisabledPerson , this.emptySeat.carDisabledPerson);
    }
    if(cars.usual.amount > 0 && this.emptySeat.usual.amount > 0){
      this.addCarUsual(cars , cars.usual);
    }
    if( cars.cargo.amount > 0 && this.emptySeat.cargo.amount > 0){
      this.addCarCargo(cars , cars.cargo);
    }
    if( cars.usual.amount > 0 && this.emptySeat.usual.amount === 0){
      this.addCarCargo(cars , cars.usual);
    }
    if(cars.carDisabledPerson.amount > 0 && this.emptySeat.carDisabledPerson.amount === 0){
      this.addCarDisabledPerson(cars , cars.carDisabledPerson);
    }

    return this.parkingList;
  }


  addCarCargo(cars , car){
    if( this.emptySeat.cargo.amount > 0 ){
      this.addCarParkingList(cars.cargo.type , car , this.emptySeat.cargo);
    }
    else if(this.emptySeat.cargo.amount === 0){
      console.log("не поместились машины типа cargo :" , this.addedCarsList.cargo.amount , "шт" );
      console.log("не поместились машины типа usual :" , this.addedCarsList.usual.amount , "шт" );
      console.log("не поместились машины типа carDisabledPerson :" , this.addedCarsList.carDisabledPerson.amount , "шт" );
    }
  }

  addCarUsual(cars , car){
    if(this.emptySeat.usual.amount > 0){
        this.addCarParkingList(cars.usual.type, car , this.emptySeat.usual);
      }
    else if(this.emptySeat.usual.amount === 0 ){
        this.addCarCargo(cars , car);
      }
    }

  addCarDisabledPerson(cars , car){
    if( this.emptySeat.usual.amount > 0){
      this.addCarUsual(cars , car);
    }
    if( this.emptySeat.cargo.amount > 0){
      this.addCarCargo(cars , car);
    }

  }


  addCarParkingList(type ,car , emptyseat){
    this.parkingList.forEach( places => {
      if( type === places.carType && places.status === false && car.amount > 0 ){
        places.status = true;
        places.zaniato = car;
        car.amount -= 1;
        emptyseat.amount -= 1;
      }
    });
  }

  delCar(id){
    console.log(id);
    this.parkingList.forEach( places => {
      if( id === places.id && places.status === true ){
        places.status = false;
        places.zaniato = "";
        this.addPlaceAfterDeletingCar(places);
        }
    });
  }

  addPlaceAfterDeletingCar(places){
    if(places.carType === "cargo"){this.emptySeat.cargo.amount += 1}
    else if(places.carType === "usual"){this.emptySeat.usual.amount += 1}
    else if(places.carType === "carDisabledPerson"){this.emptySeat.carDisabledPerson.amount += 1}
  }

}


