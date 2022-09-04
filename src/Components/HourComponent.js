import React from 'react'
import HourlyWeatherDataComponent from './HourlyWeatherDataComponent';

function HourComponent(props) {
    let i=0;
  return (
    <>
      <div className="accordion m-5" id="accordionExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Hourly weather update
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            {props.data.map(data=>{
                i++;
                return <HourlyWeatherDataComponent data={data} key={i}/>
            })}
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default HourComponent
