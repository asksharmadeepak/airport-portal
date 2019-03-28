import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) {
  }

  getAirports(code: string): Observable<any> {
    const options = code ? { params: new HttpParams().set('sortBy', code) } : {};
    if (code != ""){
      return this.http.get('//localhost:9001/airports', options);
    }else{
      return this.http.get('//localhost:9001/airports');
    }
  }

  getFare(originCode: string , destinationCode: string): Observable<any> {
    let endpoint = "/fares/"+originCode+"/"+destinationCode
    return this.http.get('//localhost:9001'+endpoint);
  }

  getHttpTrace(): Observable<any> {
    return this.http.get('//localhost:9001/httpTrace');
  }
}
