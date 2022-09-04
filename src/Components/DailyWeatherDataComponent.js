import React from 'react'
import HourlyWeatherDataComponent from './HourlyWeatherDataComponent'

export default function DailyWeatherDataComponent(props) {
    let i=0;
    const link="#"+props.id;
  return (
    <>
        <p>
        <a className="btn btn-primary" data-bs-toggle="collapse" href={link} role="button" aria-expanded="false" aria-controls="collapseExample">
            {props.date}
        </a>
        </p>
        <div className="collapse multi-collapse" id={props.id}>
        <div className="card card-body">
        {
            props.data.map(data=>{
                i++;
                return <HourlyWeatherDataComponent data={data} key={i}/>
        })}
        </div>
        </div>
    </>
  )
}
