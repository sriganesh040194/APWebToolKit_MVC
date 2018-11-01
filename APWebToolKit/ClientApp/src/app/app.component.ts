import { Component } from '@angular/core';
import { FormDataService } from "./service/formData/form-data.service";
import { IrradianceService } from "./irradiance.service";
import { IrradianceList } from './irradianceData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AmperaPark WebTool Kit';
  hero = 'SRI';
  formData: FormDataService;
  constructor(private formDataService: FormDataService, private irradianceService: IrradianceService) { }

  ngOnInit() {
    this.formData = this.formDataService;

  }
}
