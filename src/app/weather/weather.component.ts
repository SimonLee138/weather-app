import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WeatherService } from './weather.service';
import { NgOptimizedImage } from '@angular/common';
import moment from 'moment';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatIconModule, MatInputModule, MatButtonModule, MatDividerModule, MatSlideToggleModule, MatButtonToggleModule, NgOptimizedImage, MatSelectModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  lang: string = "en";
  data: any;
  todayWeather: any;
  weatherForecasts: any[] = [];
  districtsData: any[] = [];
  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getTodayWeather();
    this.getWeatherForecasts();
  }

  getTodayWeather(): void {
    this.weatherService.getTodayWeatherForecast(this.lang).subscribe({
      next: (result) => {
        console.log(result);
        this.data = result;
        let temp;
        let humid;
        let icon;
        let warningMessage;
        if (result.temperature.data.length > 0) {
          result.temperature.data.map((tempObj: any) => {
            if (tempObj.place == "Hong Kong Observatory") temp = tempObj.value;
          });
          this.districtsData = result.temperature.data;
        }
        if (result.humidity.data.length > 0) {
          humid = result.humidity.data[0].value;
        }
        if (result.icon.length > 0) icon = result.icon[0];
        if (result.warningMessage.length > 0) warningMessage = result.warningMessage;
        this.todayWeather = {
          temperature: temp,
          humidity: humid,
          icon: icon,
          warningMessage: warningMessage,
          lastUpdateTime: moment(result.temperature.recordTime).format("DD/MM/YYYY HH:mm:ss")
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  getWeatherForecasts(): void {
    this.weatherService.getWeatherForecasts(this.lang).subscribe({
      next: (result) => {
        console.log(result);
        this.weatherForecasts = result.weatherForecast;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  selectChanged(event: any): void {
    console.log(event);
    const district = event.value;
    for (let districtObj of this.data.temperature.data) {
      if (districtObj.place == district) this.todayWeather.temperature = districtObj.value;
    }
  }

  languageChanged(event: any): void {
    console.log(event);
    this.lang = event.value;
    this.getTodayWeather();
    this.getWeatherForecasts();
  }
}
