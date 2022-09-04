import { useEffect, useState } from 'react';
import './App.css';
import DayComponent from './Components/DayComponent';
import HourComponent from './Components/HourComponent';
import MainComponent from './Components/MainComponent';
// import {} from './Response.json';

function App() {
  const [error, setError] = useState(null);
  const [data,setData] = useState(null);
  const [geoLocationError,setGeoLocationError]=useState(null);
  // let i=0;



  useEffect(()=>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(pos=>{
        const urlWeatherData=`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=75bc2a430b7eddd29511028df17b7fbb&units=metric`;
        console.log("starting to fetch data");
        // console.log(pos.coords.latitude,pos.coords.longitude);
        // console.log(urlWeatherData);
        fetch(urlWeatherData)
        .then(response=>response.json())
        .then(setData)
        .catch(setError);
        console.log("finished loading data");
      },
      setGeoLocationError)
    }
    else
      setGeoLocationError(4);
  },
  [])
  if(data!==null){
    const func=()=>{
      const consDate=new Date();
      let i=0;
      const ar=data.list.map(temp=>{
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
        <MainComponent data={data}/>
        <div className='hour_component'> 
        <HourComponent data={data.list.slice(0,i)} />
        </div>
        <div className='daily_component'>
        <DayComponent data={data.list.slice(i)} />
        </div>
      </div>
    );
  }
  else if(data===null&&error!==null){
    return(<h1>
              There was an error when fetching the data from internet
              <div>{error.message}</div>
          </h1>
          );
  }
  else if(data===null&&geoLocationError!==null){
    if(geoLocationError!==null){
      switch(geoLocationError.code){
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
  else{
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  }
}

export default App;
