import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public irradiance: Irradiance;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/Sample2/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
    http.get<Irradiance>(baseUrl + 'api/Sample2/GetIrradiance').subscribe(result => {
      this.irradiance = result;
    }, error => console.error(error));

  }
}

interface Irradiance {
  irradianceString:string;
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
