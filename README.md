#Description

Application for calculation of empty parking spaces.
forms the parking with blank spaces of 3 types:
1) places for disabled people;
2) places for passenger cars;
3) places for lorries;

There are fields for addition of cars on the parking (it is possible to add at the same time different types of cars in any quantity).
the application calculates how many remained empty seats of each type and how many cars can't will be located on the parking due to the lack of places.

Logic of the application
1) trucks can take places only for trucks.
2) cars can take places for legkovy cars and trucks.
3) cars of disabled people can take any places on the parking.
any car takes the place of the type if is free if there are no places of the type takes the parking space of other type.

# Autoparking2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
