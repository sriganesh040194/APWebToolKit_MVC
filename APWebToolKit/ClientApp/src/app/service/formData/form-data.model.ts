//setting it to the below number to center the map in The Netherlands
const latitude: number = 52.33;
const longitude: number = 6;
const priceOfElectricity: number = 0.05;

//Area of carparks default
const defaultLengthOfCarPark: number = 8;
const defaultBreadthOfCarPark: number = 2.5;

const defaultNoOfCarPark = 1;

export class FormData {
    companyName: string = '';
    personalName: string = '';
    email: string = '';
    phone: number = null;
  noOfCarPark: number = defaultNoOfCarPark;

  area: AreaCarPark = {
    length:defaultLengthOfCarPark,
    breadth:defaultBreadthOfCarPark
  }
    carChargerDetails: CarCharger= {
        noOfCarCharger: null,
        isCarChargerAvailable: false
      };
    structure: boolean = false;
  electricityPrice: number = priceOfElectricity;
    terms: boolean = false;
    mapAddress: string = '';
    latitude: number = latitude;
    longitude: number = longitude;


  clear() {
    this.companyName = '';
    this.email = '';
    this.personalName = '';
    this.phone = null;
    this.noOfCarPark = defaultNoOfCarPark;

    this.area = null;

    this.carChargerDetails = null;
    this.structure = false;
    this.electricityPrice = priceOfElectricity;
    this.terms = false;
    this.mapAddress = '';
    this.latitude = latitude;
    this.longitude = longitude;
  }
}


export class CompanyDetails {
    companyName: string = '';
    personalName: string = '';
    email: string = '';
    phone: number = 0;


}

//area of the car park
export class AreaCarPark {
  length: number = defaultLengthOfCarPark;
  breadth: number = defaultBreadthOfCarPark;
}


//The property "noOfCarCharger" represents the number of car chargers needed  if the property "isCarChargerAvailable" is false,
//else it represents existing chargers
export class CarCharger {
    isCarChargerAvailable: boolean = false;
    noOfCarCharger: number = null;
}

export class CarParkDetails {
  noOfCarPark: number = defaultNoOfCarPark;
  area: AreaCarPark;
  carChargerDetails: CarCharger;
  structure: boolean = false;
  electricityPrice: number = priceOfElectricity;
}

export class Terms {
    terms: boolean = false;
}

export class Map {
    mapAddress: string = '';
    latitude: number = null;
    longitude: number = null;
}
