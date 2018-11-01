//setting it to the below number to center the map in The Netherlands
const latitude: number = 52.33;
const longitude: number = 6;

export class FormData {
    companyName: string = '';
    personalName: string = '';
    email: string = '';
    phone: number = null;
    noOfCarPark: number = 1;
    size: number = 2.44;
    carChargerDetails: CarCharger= {
        noOfCarCharger: null,
        isCarChargerAvailable: false
      };
    structure: boolean = false;
    electricityPrice: number = null;
    terms: boolean = false;
    mapAddress: string = '';
    latitude: number = latitude;
    longitude: number = longitude;


    clear() {
        this.companyName = '';
        this.email = '';
        this.personalName = '';
        this.phone = null;
        this.noOfCarPark = 1;
        this.size = 2.44;
        this.carChargerDetails=null;
        this.structure = false;
        this.electricityPrice = null;
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


//The property "noOfCarCharger" represents the number of car chargers needed  if the property "isCarChargerAvailable" is false,
//else it represents existing chargers
export class CarCharger {
    isCarChargerAvailable: boolean = false;
    noOfCarCharger: number = null;
}

export class CarParkDetails {
    noOfCarPark: number = 1;
    size: number = 2.44;
    carChargerDetails: CarCharger;
    structure: boolean = false;
    electricityPrice: number = 0.0;
}
export class Terms {
    terms: boolean = false;
}

export class Map {
    mapAddress: string = '';
    latitude: number = null;
    longitude: number = null;
}
