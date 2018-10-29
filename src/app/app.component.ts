import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',//this is injected into index.html file
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //where all the logic goes
  title = 'Weather App';
  currentTemp: number;
  currentHigh: number;
  currentLow: number;
  currentHumidity: number;
  currentCondition: string;
  cityName: string;
  currentDay: any;
  nextDayCondition: any;
  nextDayTemp: number;
  nextDayHigh: any;
  nextDayLow: any;
  nextDayHumidity: any;
  videoWeather: string;
  srcUrl: string;
  userInput: any;
  interval = 600000;

  constructor(private http: HttpClient){

  }
/*
  convertTemp = temp => {
    temp = (temp * 9/5 +32);
  }
  */
  ngOnInit() {
    this.getForecast();
    setInterval(()=>{
      this.getForecast();
    },this.interval);

  }//end of ngoninit

  getForecast(){
    //gets current day
    let today = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.userInput},us&appid=9684d40459b3c0ae18bd8e7ca81bf61b&units=metric`);
    today.subscribe((data)=>{
      console.log(data);
      this.cityName = data.name;
      this.currentTemp = (Math.round(data.main.temp * 9/5 +32));
      this.currentHigh = (Math.round(data.main.temp_max * 9/5 +32));
      this.currentLow = (Math.round(data.main.temp_min * 9/5 +32));
      this.currentHumidity = data.main.humidity;
      this.currentCondition = data.weather[0].description;
      console.log(this.currentCondition);

      //generates background video according to weather conditions
      switch(this.currentCondition){
        case 'moderate rain':
        this.videoWeather = 'rain';
        break;
        case 'broken clouds':
        this.videoWeather = 'clouds';
        break;
        case 'light rain':
        this.videoWeather = 'rain';
        break;
        case 'few clouds':
        this.videoWeather = 'clouds';
        break;
        case 'clear sky':
        this.videoWeather = 'clear';
        break;
        case 'scattered clouds':
        this.videoWeather = 'clouds';
        break;
        default:
        this.videoWeather = 'sun';
      }

      this.srcUrl = `../assets/${this.videoWeather}.mp4`;
    })

    //gets next day forecast
    let forecast = this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.userInput},us&appid=9684d40459b3c0ae18bd8e7ca81bf61b&units=metric`);
    forecast.subscribe((data)=>{
      console.log(data.list[0]);

      this.nextDayTemp = (Math.round(data.list[0].main.temp * 9/5 +32));
      this.nextDayHigh = (Math.round(data.list[0].main.temp_max * 9/5 +32);
      this.nextDayLow = Math.round(data.list[0].main.temp_min * 9/5 +32);
      this.nextDayHumidity = (data.list[0].main.humidity);
      this.nextDayCondition = (data.list[0].weather[0].description);
      //this.nextDayTemp = this.convertTemp(data.list[0]);
      console.log(this.nextDayTemp);
      console.log(this.nextDayHigh);
      console.log(this.nextDayLow);
      console.log(this.nextDayHumidity);
    })
    this.userInput = "";
  }
}
