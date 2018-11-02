import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { MessageService } from '../message.service';
import { FormDataService } from '../service/formData/form-data.service';
import { Map, CompanyDetails, CarCharger, CarParkDetails, AreaCarPark } from "../service/formData/form-data.model";
import { ConfigService } from "../service/config/config.service";
import { Irradia } from "../custom-type.type";
import { BooleanToYesNoStringConverter } from "../converter.type";
import { Chart } from 'chart.js';

//import { Email } from 'emailjs/email';
//import * as AngularChart from 'angular-chart.js';
//import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit  {
  irradianceString: Irradia[];

  title="Please wait, we are generating results.";
  showResults = false;
  baseUrl: string;
  companyDetails: CompanyDetails;
  carparkDetails: CarParkDetails;
  mapDetails: Map;
  evChargerGeneratedMessage: string;
  chart:Chart;
  labels:string[];
  gAxis:number[];
  gbAxis: number[];


  //constant values or Default values
  totalKmsPerYear = 15000;
  energyInWhperKm = 200;

  ///This is in get watt peak of solar panel method, change it there
  //wattPeakofSolarPanel: 300;
  lengthOfSolarPanel = 1.658;
  breadthOfSolarPanel = 0.991;





  totalEnergy: number;
  totalEvCharged: number;
  totalKms: number;
  solarPanelNeeded: number;
  profit: number;
  kWpOfSolarPanel: number;
  totalAreaofCarPark: number;

  //Dummy variable for animation
  EvChargedLoop: number[];

  constructor(private messageService: MessageService,
    private formDataService: FormDataService,
    private router: Router,
    private configService: ConfigService,
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

    //Calcualtion for car park
    this.getIrr();

    
  }
 

ngOnInit() {

  //Get Company Details
  this.companyDetails = this.formDataService.getCompanyDetails();
  //this.carparkDetails = this.formDataService.getCarParkDetails();
  this.mapDetails = this.formDataService.getMapDetails();
 


  //this.solarPanelNeeded = this.getSolarPanel(this.carparkDetails.area);
  //this.kWpOfSolarPanel = this.getKiloWattPeakOfSolarPanel(this.solarPanelNeeded);


}
  routingBooleanToYesNoStringConverter(value: boolean): string {
    return BooleanToYesNoStringConverter.get(value);
  }

  //e-mail functionaliy
  sendEmail() {

    this.httpClient.post(this.baseUrl + 'api/Irradiance/Hello/'+ JSON.stringify(this.formDataService),1).subscribe((result) => {
      console.log(result);
    }),err => console.log(err);
    }

  //watt peak of solar panel;

  getKiloWattPeakOfSolarPanel(solarPanelNeeded: number): number {

    let wattPeakofSolarPanel = 300;
    return Math.floor(solarPanelNeeded * (wattPeakofSolarPanel / 1000));
  }

  //Calculate the profit
  getProfit(priceOfElectricity: number, totalEnergyProduced: number): number {
    try {
      return Math.floor(priceOfElectricity * totalEnergyProduced);

    } catch (e) {
      console.log("Error occured while calc profit: Error:------>"+e);
    }
  }

  //Calculate the no of solar panels need
  getSolarPanel(areaOfCarPark: AreaCarPark, numberOfCarPark: number): number {
    try {

      let areaOfSolarPanel = this.lengthOfSolarPanel * this.breadthOfSolarPanel;
      this.totalAreaofCarPark = areaOfCarPark.length * areaOfCarPark.breadth;

      let solarPanelNeeded = (this.totalAreaofCarPark / areaOfSolarPanel) * numberOfCarPark;

      let roundOfSolarPanel = Math.round(solarPanelNeeded);

      return roundOfSolarPanel;
    } catch (e) {
      console.log("Error occured while calsulating the solar panel:  Erro ---->" + e);
    }
  }

  getTotalEnergyProduced(energy: number[]): number {
    
    try {
      let total = 0;
      energy.map(a => total += a);
      return Math.round(total);
    }
    catch (e) {
      console.log("Angualar Total Energy Produced, Some error occured. Error:------> " +e);
    }
    
  }

  getEVCharged(totalKmsPerYear: number, energyInWhperKm: number) {
    try {

      let totalEV = this.totalEnergy / ((energyInWhperKm * totalKmsPerYear) / 1000);

      let value = Math.round(totalEV);

      //for testing
      //value = 20;
      let num = [];
      for (let i = 1; i <= value; i++) {
        num.push(i);
      }

      this.EvChargedLoop = num;

      //and also some information related to the charging

      this.totalKms = Math.round(totalEV * totalKmsPerYear);

      //this.EvChargedLoop = Array(value).fill(value)
      return value;
    } catch (e) {
      console.log("Error occured no of ev charged:  Error ---->" + e);
    }

  }

  getIrr() {

    ///a way around 
    this.carparkDetails = this.formDataService.getCarParkDetails();
    this.solarPanelNeeded = this.getSolarPanel(this.carparkDetails.area, this.carparkDetails.noOfCarPark);
    this.kWpOfSolarPanel = this.getKiloWattPeakOfSolarPanel(this.solarPanelNeeded);
   
    var latLon = this.formDataService.getMapDetails();

    //this.httpClient.get<Irradia[]>(this.baseUrl + 'api/Irradiance/GetIrradiance2/1/2/3').subscribe((result: Irradia[]) => {
    //}, err => console.log(err));

    var uri = this.baseUrl + 'api/Irradiance/GetIrradiance/' + latLon.latitude + '/' + latLon.longitude + '/' + this.kWpOfSolarPanel;
    console.log(uri);

    this.httpClient.get<Irradia[]>(uri).subscribe((result: Irradia[]) => {
      let labels: string[] = [];
      let gAxis: number[] = [];
      let gbAxis: number[] = [];
      let gdAxis: number[] = [];
      let edAxis: number[] = [];
      let emAxis: number[] = [];

      this.irradianceString = result;
      console.log(this.irradianceString);



      this.title = "Hurray! All done, we will contact you soon";
      this.showResults = true;
      result.forEach((a) => {
        labels.push(a.monthAxis);
        edAxis.push(a.edAxis);
        emAxis.push(a.emAxis);
        console.log(a);
      });


      console.log(labels);
      console.log(edAxis);
      console.log(emAxis);

      console.log(labels);

      let ctx = document.getElementById("charts") as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Average Day Energy Production',
              data: edAxis,
              borderColor: "#3cba9f",
              fill: false
            },
            {
              label: 'Average Monthly Energy Production',
              data: emAxis,
              borderColor: "#ffcc00",
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });


      this.totalEnergy = this.getTotalEnergyProduced(emAxis);
      this.totalEvCharged = this.getEVCharged(this.totalKmsPerYear, this.energyInWhperKm);
      this.profit = this.getProfit(this.carparkDetails.electricityPrice, this.totalEnergy);

      this.sendEmail();

    }, err => console.log(err));
  }


}
