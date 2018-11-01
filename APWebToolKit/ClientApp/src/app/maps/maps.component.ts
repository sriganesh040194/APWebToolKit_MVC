import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';
import { Map } from "../service/formData/form-data.model";
import { FormDataService } from '../service/formData/form-data.service';
import { ConfigService } from "../service/config/config.service";
import { Irradia } from "../custom-type.type";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  title = "Please select your address on the Map";
  successMessage="All done! Please click on submit";
  mapDetails: Map;
  form: any;
  map: mapboxgl;
  geoCodingClient: mbxGeocoding;
  searchBox: MapboxGeocoder;
  irradianceString: Irradia[];
  baseUrl:string;


  constructor(private messageService: MessageService,
    private formDataService: FormDataService,
    private router:Router,
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ///TODO: Testing Deletein production
  getIrr(): Irradia[] {
    this.httpClient.get<Irradia[]>(this.baseUrl + 'api/Irradiance/GetIrradiance').subscribe(result => {
      this.irradianceString = result;
      console.log(this.irradianceString);
    }, error => console.error(error));
    return this.irradianceString;
  }

  ngOnInit() {

    //Todo: Delete
    this.getIrr();

    //Get the Map Details from FormDataService
    this.mapDetails = this.formDataService.getMapDetails();
    const accessTK = 'pk.eyJ1Ijoic3JpZ2FuZXNoMDQwMTk0IiwiYSI6ImNqbmExbTI2bTZ2bTQzcW54ZzZpd2hod3MifQ.HPa2Ea5OSAcHniR069Rm5w';
    //const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    this.geoCodingClient = mbxGeocoding({ accessToken: accessTK });

    //Access token for MapBox, it is stored as a environment variable
    //mapboxgl.accessToken = 'pk.eyJ1Ijoic3JpZ2FuZXNoMDQwMTk0IiwiYSI6ImNqbmExbTI2bTZ2bTQzcW54ZzZpd2hod3MifQ.HPa2Ea5OSAcHniR069Rm5w';
    mapboxgl.accessToken = accessTK;

    //Default Style of MapBox Todo: maybe can use if you change your mind
    //style: 'mapbox://styles/mapbox/streets-v10',

    //Instantiating the Map from Mapbox
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sriganesh040194/cjnbkcznm60dg2ss1bza4pxj0',
      center: [this.mapDetails.longitude, this.mapDetails.latitude],
      zoom: 6
    });
    //Event listening to click, so that the marker can be updated.
    //It should also update the address on the search bar
    this.map.on('click', (e) => {
      marker.setLngLat(e.lngLat)
      this.updateMapAddress(e.lngLat.toArray());
    });

    //Create a draggable marker for later use;
    var marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(this.map.getCenter())
      .addTo(this.map);
    //Event for marker dragging so that the address is updated in the search box
    marker.on('dragend', (e) => {
      this.updateMapAddress(marker.getLngLat().toArray());
    });

    //enable automatic location position 
    var autoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    //Event that is triggered when the geolocate is clicked
    //Also updates the address in the searchBox
    autoLocate.on('geolocate', (e) => {
      var lngLat = [e.coords.longitude, e.coords.latitude];
      var points = mapboxgl.LngLat.convert(lngLat);
      marker.setLngLat(points);
      this.updateMapAddress(lngLat);
    });
    this.map.addControl(autoLocate, 'bottom-right');


    //Search box that is used to search the address
    this.searchBox = new MapboxGeocoder({
      accessToken: accessTK,
      zoom: 14,
      placeholder: "Enter search e.g. Volkspark, Enschede"
    });
    this.searchBox.on('result', (e) => {
      marker.setLngLat(e.result.geometry.coordinates);
      console.log(e);
      this.updateFormAddress(e.result.place_name, e.result.geometry.coordinates)
    });
    this.map.addControl(this.searchBox);

  }

  //Method to update the address in the search box
  updateMapAddress(lngLat: any): void {
    this.geoCodingClient.reverseGeocode({
      query: lngLat
    })
      .send()
      .then((response) => {
        // match is a GeoJSON document with geocoding matches
        const match = response.body;
        const address = match.features[0].place_name
        this.searchBox.setInput(address);

        //Whenever address is updated, update the FormDataSerice with teh new address.
        this.updateFormAddress(address, lngLat);
      });
  }

  updateFormAddress(address: string, lngLat: any) {
    //Whenever address is updated, update the FormDataSerice with teh new address.
    var mapAddressDetails: Map = {
      mapAddress: address,
      latitude: lngLat[1],
      longitude: lngLat[0],
    }
    this.formDataService.setMapDetails(mapAddressDetails)
    //Update the address in the address field below the map component from the FormDataService
    this.mapDetails = this.formDataService.getMapDetails();
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    this.formDataService.setMapDetails(this.mapDetails);
    return true;
  }

  goToNext(form: any) {
    if (this.save(form)) {
      // Navigate to the work page
      this.router.navigate(['/results']);
    }
  }
}
