import React, { Component } from 'react';
import DayComponent from './DayComponent';
import HourComponent from './HourComponent';
import MainComponent from './MainComponent';
// import {} from './Response.json';

export class Home extends Component {
  constructor(props){
    super(props);
    //declaring the state variables
    this.state={
      cityName:'',
      data:null,
      error:null,
      geoLocationError:null
    };
    //this method updates the cityname in the state variable given by the user
    this.updateCityName=this.updateCityName.bind(this);
    //this method finally updates the name of the city variable given by the user
    this.finalUpdateCityName=this.finalUpdateCityName.bind(this);
    //this method binds the weather data of the location
    this.setData=this.setData.bind(this);
    //this method makes an api call to fetch the user requested weather data of the city or location
    this.setCityData=this.setCityData.bind(this);
    //this method binds any network error occured during the fetching of an api call
    this.setError=this.setError.bind(this);
    //this method makes an api call to get the location postion of the user input city or loaction
    this.setLocationData=this.setLocationData.bind(this);
    //this method sets any geolocation error while fetching the current user loaction
    this.setGeoLocationError=this.setGeoLocationError.bind(this);
  }
  updateCityName(event){
    //update the cityname given by the user
    this.setState({
      cityName:event.target.value
    });
  }
  //this method just finalizes the city name given by the user and sends an api call to fetch the list of places
  finalUpdateCityName(event){
    // console.log(this.state.cityName);
    const url="https://api.openweathermap.org/geo/1.0/direct?q="+this.state.cityName+"&limit=5&appid={api_key}";
    // console.log(url);
    //fetching the user defined city or location postion
    fetch(url)
    .then(response=>response.json())
    .then(res=>{
      //if there is no location found this check comes in
      if(typeof(res[0])==='undefined'){
        this.setState({
          error:{
            message:'This place is not found'
          }
        });
      }
      else{
        this.setCityData(res);
      }
    })
    .catch(this.setError);
    // console.log(this.state.data);
    event.preventDefault();
  }
  setError(res){
    //setting the error in state
    this.setState({
      error:res
    });
  }
  setCityData(res){
        //getting the data of position of user given location or city
        const lat=res[0].lat;
        const lon=res[0].lon;
        const urlWeatherData=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={api_key}&units=metric`;
        console.log("starting to fetch data");
        // console.log(lat,lon);
        // console.log(urlWeatherData);
        //fetching the data through fetch api
        fetch(urlWeatherData)
        .then(response=>response.json())
        .then(this.setData)
        .catch(this.setError);
        console.log("finished loading data");
  }
  setData(res){
    //setting the data in state
    this.setState({
      data:res
    });
  }
  setLocationData(){
    //to check if geolocation is available in the user's browser
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(pos=>{
        const urlWeatherData=`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid={api_key}&units=metric`;
        console.log("starting to fetch data");
        // console.log(pos.coords.latitude,pos.coords.longitude);
        // console.log(urlWeatherData);
        //fetching data of user's current location
        fetch(urlWeatherData)
        .then(response=>response.json())
        .then(this.setData)
        .catch(this.setError);
        console.log("finished loading data");
      },
      this.setGeoLocationError)
    }
  }
  setGeoLocationError(e){
    //setting any geoloaction api error in the state
    this.setState({
      geoLocationError:e
    });
  }
  render() {
    //the first render of the page
    if(this.state.data===null&&this.state.geoLocationError===null&&this.state.error===null){
      return (
        <div className="position-absolute top-50 start-50 translate-middle">
          <p style={{'fontSize':'100px'}}>WeatherPedia</p>
          <input type="text" placeholder='Enter the name of city' id='cityName' onChange={this.updateCityName} className="w-100 p-3"/>
          <div>
            <button type="button" className="w-25 p-3 btn btn-primary" style={{'marginTop':'10px'}} onClick={this.finalUpdateCityName}>Submit</button>
          </div>
          <button style={{'backgroundColor':'inherit','border':'none','marginTop':'5px'}} onClick={this.setLocationData}>
            <span className="material-symbols-outlined" style={{'height':'50px','width':'50px'}}>
              my_location <h6 style={{'display':'inline'}}>Use my current location</h6>
            </span>
          </button>
        </div>
      )
    }
    //when there is an error while fetching the data
    else if(this.state.data===null&&this.state.error!==null){
      return(<h1>
                There was an error when fetching the data from internet
                <div>{this.state.error.message}</div>
            </h1>
            );
    }
    //when there is a geolocation api error
    else if(this.state.data===null&&this.state.geoLocationError!==null){
      if(this.state.geoLocationError!==null){
        switch(this.state.geoLocationError.code){
          case 1:return(
            <>
              <h1>Permission to use the location denied. Please give the permission and refresh the page</h1>
            </>
          );
          case 2:return(
            <>
              <h1>The position is unavailable</h1>
            </>
          );
          case 3:return(
            <>
              <h1>The system has timeout</h1>
            </>
          );
          default:return(
            <>
              <h1>Please update your browser to use this site</h1>
            </>
          );
        }
      }
      else{
        return(
          <>
            <h1>String(error.prototype.toString());</h1>
          </>
        );
      }
    }
    //when the waether data is fetched successfully
    else if(this.state.data!==null){
      const func=()=>{
        const consDate=new Date();
        let i=0;
        const ar=this.state.data.list.map(temp=>{
          let date=new Date(temp.dt*1000);
          return date.getUTCDate();
        })
        while(ar[i]===consDate.getUTCDate()){
          i++;
        }
        return i;
      }
      const i=func();
      return (
        <div className="App">
          <MainComponent data={this.state.data}/>
          <div className='hour_component'> 
          <HourComponent data={this.state.data.list.slice(0,i)} />
          </div>
          <div className='daily_component'>
          <DayComponent data={this.state.data.list.slice(i)} />
          </div>
        </div>
      );
    }
    //while fetching the weather data it loads a spinner
    else{
      return(
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      );
    }
}

}

export default Home
