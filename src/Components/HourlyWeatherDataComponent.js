import React from 'react'
// import PropTypes from 'prop-types'

function HourlyWeatherDataComponent(props) {
  let urlImage="https://openweathermap.org/img/wn/"+props.data.weather[0].icon+"@2x.png";
  let dateObj=new Date(props.data.dt*1000);
  return (
      <div className="container border border-dark rounded" style={{'background-color': 'rgb(248, 223, 190)'}}>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <h1>{Math.round(props.data.main.temp)}&deg;C</h1>
                        <h6>Feels like:{Math.round(props.data.main.feels_like)}&deg;C</h6>
                        <h6>Humidity:{props.data.main.humidity}</h6>
                        <h6>Weather: <img src={urlImage} alt="Weather Condition" width="30px" height="30px"/>{props.data.weather[0].main}</h6>
                    </div>
                    <div className="h1 col">
                      <div>
                        {dateObj.getUTCDate()}-{dateObj.getUTCMonth()+1}-{dateObj.getUTCFullYear()}
                      </div>
                      <div>
                        {dateObj.getUTCHours()}:{dateObj.getUTCMinutes()}0
                      </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default HourlyWeatherDataComponent
