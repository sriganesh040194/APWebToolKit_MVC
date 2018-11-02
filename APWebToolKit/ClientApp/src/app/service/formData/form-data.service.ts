import { Injectable } from '@angular/core';
import { FormData, CompanyDetails, Terms, CarParkDetails, CarCharger, Map, AreaCarPark } from "../formData/form-data.model";
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formData: FormData = new FormData();
  private isCompanyDetailsFormValid: boolean = false;
  private isCarparkDetailsFormValid: boolean = false;
  private isMapsFormValid: boolean = false;

  constructor(private workflowService: WorkflowService) { }

  //-----Begin -----Methods for Company details
  getCompanyDetails(): CompanyDetails {

    var companyDetailsObject: CompanyDetails = {
      companyName: this.formData.companyName,
      personalName: this.formData.personalName,
      email: this.formData.email,
      phone: this.formData.phone
    };
    return companyDetailsObject;
  }

  setCompanyDetails(data: CompanyDetails) {
    this.isCompanyDetailsFormValid = true;
    this.formData.companyName = data.companyName;
    this.formData.personalName = data.personalName;
    this.formData.email = data.email;
    this.formData.phone = data.phone;
  }

  getTerms(): Terms {
    var terms: Terms = {
      terms: this.formData.terms
    }
    return terms;
  }
  setTerms(data: Terms) {
    this.formData.terms = data.terms;
    this.workflowService.validateStep(STEPS.companyDetails);
  }
  //-----End -----Methods for Company details

  //-----Begin -----Methods for CarPark details
  getCarParkDetails(): CarParkDetails {
    var carChargerDetails: CarCharger = {
      noOfCarCharger: this.formData.carChargerDetails.noOfCarCharger,
      isCarChargerAvailable: this.formData.carChargerDetails.isCarChargerAvailable
    }

    var area: AreaCarPark = {
      length: this.formData.area.length,
      breadth: this.formData.area.breadth
    }

    var carParkDetails: CarParkDetails = {
      noOfCarPark: this.formData.noOfCarPark,
      area: area,
      structure: this.formData.structure,
      electricityPrice: this.formData.electricityPrice,
      carChargerDetails: carChargerDetails

    }
    return carParkDetails;
  }

  setCarParkDetails(data: CarParkDetails) {
    this.isCarparkDetailsFormValid = true;
    this.formData.noOfCarPark = data.noOfCarPark;
    this.formData.area = data.area;
    this.formData.structure = data.structure;
    this.formData.electricityPrice = data.electricityPrice;
    this.formData.carChargerDetails = data.carChargerDetails;
    this.workflowService.validateStep(STEPS.carparkDetails);
  }
  //-----End -----Methods for CarPark details

  //-----Begin -----Methods for Maps details
  getMapDetails(): Map {
    var map: Map = {
      mapAddress: this.formData.mapAddress,
      latitude: this.formData.latitude,
      longitude: this.formData.longitude
    }
    return map;
  }

  setMapDetails(data: Map) {
    this.isMapsFormValid = true;
    this.formData.mapAddress = data.mapAddress;
    this.formData.latitude = data.latitude;
    this.formData.longitude = data.longitude;
    this.workflowService.validateStep(STEPS.map);
  }
  //-----End -----Methods for Maps details
}

