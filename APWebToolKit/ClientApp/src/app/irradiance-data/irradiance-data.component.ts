import { Component, OnInit, Input } from '@angular/core';
import {Irradiance } from '../irradiance';
import { IrradianceList } from '../irradianceData';

@Component({
  selector: 'app-irradiance-data',
  templateUrl: './irradiance-data.component.html',
  styleUrls: ['./irradiance-data.component.css']
})
export class IrradianceDataComponent implements OnInit {
  @Input() irradiance1: Irradiance;
  constructor() { }

  ngOnInit() {
  }

}
