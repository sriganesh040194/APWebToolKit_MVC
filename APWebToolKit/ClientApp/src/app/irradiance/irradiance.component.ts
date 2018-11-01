import { Component, OnInit } from '@angular/core';
import { Irradiance } from '../irradiance';
import { IrradianceList } from '../irradianceData';
import { IrradianceService } from '../irradiance.service';

@Component({
  selector: 'app-irradiance',
  templateUrl: './irradiance.component.html',
  styleUrls: ['./irradiance.component.css']
})
export class IrradianceComponent implements OnInit {


  IrradianceListz: Irradiance[];
  selectedHero: Irradiance;

  constructor(private irradianceService: IrradianceService) { }

  ngOnInit() {

    this.getIrradiance();
  }

  getIrradiance(): void {
    this.irradianceService.getIrradianceData().subscribe(a => this.IrradianceListz = a);
  }

  onSelect(hero: Irradiance): void {
    this.selectedHero = hero;
  }

}
