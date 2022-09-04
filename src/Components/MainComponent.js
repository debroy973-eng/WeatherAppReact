import React from 'react'

function MainComponent(props) {
    const urlImage="https://openweathermap.org/img/wn/"+ props.data.list[0].weather[0].icon+"@2x.png";
  return (
        <div className="container border border-dark rounded">
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <h1>{Math.round(props.data.list[0].main.temp)}&deg;C</h1>
                        <h6>Feels like:{Math.round(props.data.list[0].main.feels_like)}&deg;C</h6>
                        <h6>Humidity:{props.data.list[0].main.humidity}</h6>
                        <h6>Weather: <img src={ urlImage} alt="Weather Condition" width="30px" height="30px"/>{ props.data.list[0].weather[0].main}</h6>
                    </div>
                    <div className="h1 col">
                        { props.data.city.name+","+ props.data.city.country}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MainComponent

