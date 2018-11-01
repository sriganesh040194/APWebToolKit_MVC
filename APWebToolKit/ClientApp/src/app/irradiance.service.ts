import { Injectable } from '@angular/core';
import {IrradianceList} from './irradianceData';
import{Irradiance} from './irradiance';
import{Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IrradianceService {

  constructor( private messageService: MessageService) { }

  getIrradianceData(): Observable<Irradiance[]>{
    //TODO: modify this so that it returns the data after the data is fetched.
    this.messageService.add('IrradiaceService: fetched Irradiance data');
    return of(IrradianceList);
  }
}
