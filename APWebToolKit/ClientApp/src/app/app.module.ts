import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IrradianceComponent } from './irradiance/irradiance.component';
import { IrradianceDataComponent } from './irradiance-data/irradiance-data.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { MapsComponent } from './maps/maps.component';
import { IrradiaceCalculatorFormComponent } from './irradiace-calculator-form/irradiace-calculator-form.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarparkDetailsComponent } from './carpark-details/carpark-details.component';
import { ResultsComponent } from './results/results.component';

/* Services */
import { FormDataService } from "./service/formData/form-data.service";
import { IrradianceService } from './irradiance.service';
import { WorkflowService } from "./service/workflow/workflow.service";
import { WorkflowGuard } from "./service/workflow/workflow-guard.service";
import { ConfigService } from "./service/config/config.service";



@NgModule({
  declarations: [
    AppComponent,
    IrradianceComponent,
    IrradianceDataComponent,
    MessagesComponent,
    MapsComponent,
    IrradiaceCalculatorFormComponent,
    CompanyDetailsComponent,
    NavBarComponent,
    CarparkDetailsComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: FormDataService, useClass: FormDataService },
  { provide: IrradianceService, useClass: IrradianceService },
  { provide: WorkflowService, useClass: WorkflowService },
  { provide: WorkflowGuard, useClass: WorkflowGuard },
  { provide: ConfigService, useClass: ConfigService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
