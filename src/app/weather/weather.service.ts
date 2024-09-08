import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // baseUrl: string = "https://api.openweathermap.org/data/3.0/onecall";
  baseUrl: string = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php";
  // apiId: string = "598efc0a24311589c41b37983df4b6df";
  
  constructor(private http: HttpClient) { }

  getTodayWeatherForecast(lang: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "?dataType=rhrread&lang=" + lang);
  }

  getWeatherForecasts(lang: string): Observable<any> {
    // return this.http.get<any[]>(this.baseUrl + "?lat=33.44&lon=-94.04&exclude=hourly,daily" + "&appid=" + this.apiId);
    return this.http.get<any>(this.baseUrl + "?dataType=fnd&lang=" + lang);
  }
}
