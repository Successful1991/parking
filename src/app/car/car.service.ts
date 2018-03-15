import { Injectable } from '@angular/core';
import {Places} from './car';

@Injectable()

export class CarService {

  constructor() {}
  parkingParameters = [
    {
      type: 'carDisabledPerson',
      amount: 6
    },
    {
      type: 'usual',
      amount: 12
    },
    {
      type: 'cargo',
      amount: 6
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
    this.parkingParameters.filter( placeType => {
      for(let i = 0 ; i < placeType.amount ; i++){
        this.parkingList.push(new Places(placeType.type, this.parkingList.length+1 ));
      }
    });
    return this.parkingList;
  }

  getEmptySeat(){

      this.parkingList.filter( place =>{
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
      if( cars.cargo.amount > 0 && this.emptySeat.cargo.amount > 0){
        this.addCarParkingList( cars.cargo.type, cars.cargo , this.emptySeat.cargo );
      }
      if(cars.usual.amount > 0 && this.emptySeat.usual.amount > 0){
        this.addCarParkingList( cars.usual.type ,cars.usual  , this.emptySeat.usual);
      }
      if(cars.carDisabledPerson.amount > 0 && this.emptySeat.carDisabledPerson.amount > 0){
        this.addCarParkingList(cars.carDisabledPerson.type ,cars.carDisabledPerson  , this.emptySeat.carDisabledPerson);
      }
    this.addCarsCertainType(cars);
    return this.parkingList;
   }



  addCarsCertainType(cars){
    if(cars.carDisabledPerson.type === "carDisabledPerson" && cars.carDisabledPerson.amount > 0){
      this.addCarDisabledPerson(cars , cars.carDisabledPerson);
    }
    else if(cars.usual.type === "usual" && cars.usual.amount > 0){
      this.addCarUsual(cars , cars.usual);
    }
    else if(cars.cargo.type === "cargo" && this.emptySeat.cargo.amount === 0){
      console.log("не поместились машины типа cargo" , cars.amount , "шт")
    }
    else if( cars.cargo.type === "cargo" && cars.cargo.amount > 0 ){
      this.addCarCargo(cars , cars.cargo);
    }
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
  if(this.emptySeat.carDisabledPerson.amount === 0){
      this.addCarUsual(cars , car);
    }
    else( console.log("не все машины обработались"));
  }

  addCarParkingList(type ,car , emptyseat){
    this.parkingList.forEach( places => {
      if( type === places.carType && places.status === false && car.amount > 0 ){
        places.status = true;
        car.amount -= 1;
        emptyseat.amount -= 1;
      }
    });
    if(car.amount > 0){
      this.addCarsCertainType(this.addedCarsList);
    }
  }

  delCar(id){
    this.parkingList.forEach( places => {
      if( id === places.id && places.status === true ){
        places.status = false;
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


