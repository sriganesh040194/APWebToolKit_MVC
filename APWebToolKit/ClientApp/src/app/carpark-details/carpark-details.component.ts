import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CarParkDetails, CarCharger } from '../service/formData/form-data.model';
import { FormDataService } from '../service/formData/form-data.service';
@Component({
  selector: 'app-carpark-details',
  templateUrl: './carpark-details.component.html',
  styleUrls: ['./carpark-details.component.css']
})
export class CarparkDetailsComponent implements OnInit {
  title = "Tell us more about your car park";
  carParkDetails: CarParkDetails;
  form: any;

  constructor(private router:Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.carParkDetails = this.formDataService.getCarParkDetails();
    console.log('Car Park details loaded.');
  }
  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }

    this.formDataService.setCarParkDetails(this.carParkDetails);
    return true;
  }

  goToNext(form: any) {
    if (this.save(form)) {
      // Navigate to the work page
      this.router.navigate(['/map']);
    }
  }

}
