import { Component, OnInit } from '@angular/core';
import {AirportService} from "../service/airport.service";
import {HttpTrace} from "../models/http-trace";

@Component({
  selector: 'app-http-trace',
  templateUrl: './http-trace.component.html',
  styleUrls: ['./http-trace.component.css']
})
export class HttpTraceComponent implements OnInit {

  httpTrace: HttpTrace;

  constructor(private airportService: AirportService) { }

  ngOnInit() {
    this.airportService.getHttpTrace().subscribe(data => {
      this.httpTrace = data;
      debugger
    });
  }

}
