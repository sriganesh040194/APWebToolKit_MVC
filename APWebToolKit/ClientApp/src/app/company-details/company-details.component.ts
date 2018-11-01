import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyDetails, Terms }            from '../service/formData/form-data.model';
import { FormDataService }     from '../service/formData/form-data.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  title="Plese tell us a little bit more about yourself";
  companyDetails:CompanyDetails;
  termsObject:Terms;
  form:any;

  constructor(private router:Router,private formDataService:FormDataService) { }

  ngOnInit() {
    this.companyDetails=this.formDataService.getCompanyDetails();
    this.termsObject=this.formDataService.getTerms();
    console.log('Company details loaded.');
  }
  save(form:any): boolean{
    if(!form.valid){
      return false;
    }
    this.formDataService.setCompanyDetails(this.companyDetails);
    this.formDataService.setTerms(this.termsObject);
        return true;
  }

  goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/carpark-details']);
    }
  }

}
