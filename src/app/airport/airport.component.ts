import {Component, OnInit} from '@angular/core';
import {AirportService} from "../service/airport.service";
import {debounceTime, distinctUntilChanged, map} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import * as $ from 'jquery';
import {Fare} from "../models/fare";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  airports: Array<any>;
  fare: Fare;

  constructor(private airportService: AirportService,
              private router: Router,
              private spinner: NgxSpinnerService) {
  }

  public localWaterMark: string = 'Select countries';
  public localFields: Object = {text: 'description'};

  public isOriginSelected: boolean;
  public isDestinationSelected: boolean;


  onSubmit(form: NgForm): void {

    if(form.value.originName == undefined || !form.value.originName.length){
      if(form.value.destinationName != undefined)
        this.isDestinationSelected = false
      this.isOriginSelected = true
      return false;
    }
    if(form.value.destinationName == undefined || !form.value.destinationName.length){
      if(form.value.originName != undefined || form.value.originName.length)
        this.isOriginSelected = false
      this.isDestinationSelected = true
      return false;
    }

    if(form.value.originName != undefined && form.value.destinationName != undefined){
      this.isOriginSelected = false
      this.isDestinationSelected = false
    }

    this.spinner.show();
    var regExp = /\(([^)]+)\)/;
    var originCode = regExp.exec(form.value.originName)[1];
    var destinationCode = regExp.exec(form.value.destinationName)[1];
    this.airportService.getFare(originCode, destinationCode).subscribe(data => {
      this.spinner.hide();
      this.fare = data;
      this.isOriginSelected = false
      this.isDestinationSelected = false
    });
  }

  sortAirportData(code: string) {
    debugger;
    this.airportService.getAirports(code).subscribe(data => {
      this.airports = data;
    });
  }

  ngOnInit() {
    this.airportService.getAirports("").subscribe(data => {
      this.airports = data;
    });
  }

}
