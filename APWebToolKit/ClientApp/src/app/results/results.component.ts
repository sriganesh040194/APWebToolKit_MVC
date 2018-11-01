import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { MessageService } from '../message.service';
import { FormDataService } from '../service/formData/form-data.service';
import { Map, CompanyDetails, CarCharger, CarParkDetails } from "../service/formData/form-data.model";
import { ConfigService } from "../service/config/config.service";
import { Irradia } from "../custom-type.type";
import { BooleanToYesNoStringConverter } from "../converter.type";
import { Chart } from 'chart.js';
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


  //constant values
  totalKmsPerYear = 15000;
  energyInWhperKm = 200; 

  totalEnergy: number;
  totalEvCharged: number;

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
  this.carparkDetails = this.formDataService.getCarParkDetails();
  this.mapDetails = this.formDataService.getMapDetails();
}
  routingBooleanToYesNoStringConverter(value: boolean): string {
    return BooleanToYesNoStringConverter.get(value);
  }

  getTotalEnergyProduced(energy: number[]): number {
    let total = 0;
    try {
      energy.map(a => total += a);
    }
    catch (e) {
      console.log("Angualar Total Energy Produced, Some error occured. Error:------> " +e);
    }
    return total;
  }

  getEVCharged(totalKmsPerYear: number, energyInWhperKm:number ) {
    let value = Math.round(this.totalEnergy / ((energyInWhperKm * totalKmsPerYear) / 1000));
    value = 20;
    let num = [];
    for (let i = 1; i <= value; i++) {
      num.push(i);
    }

    this.EvChargedLoop = num;
    //this.EvChargedLoop = Array(value).fill(value)
    return value;
  }

  getIrr() {

    var latLon = this.formDataService.getMapDetails();

    //this.httpClient.get<Irradia[]>(this.baseUrl + 'api/Irradiance/GetIrradiance2/1/2/3').subscribe((result: Irradia[]) => {
    //}, err => console.log(err));

    var uri = this.baseUrl + 'api/Irradiance/GetIrradiance/' + latLon.latitude + '/' + latLon.longitude + '/18';
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

    }, err => console.log(err));
  }


}
