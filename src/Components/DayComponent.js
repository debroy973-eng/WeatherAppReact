import React from 'react'
import DailyWeatherDataComponent from './DailyWeatherDataComponent';
// import HourlyWeatherDataComponent from './HourlyWeatherDataComponent';

function DayComponent(props) {
  let i,j;
  let ar=[];
  let id='multiCollapseExample';
  for(i=0,j=0;i<Math.trunc(props.data.length/8);i++){
    id=id+i;
    let date=new Date(props.data[j].dt*1000);
    let dateString=date.getUTCDate()+'/'+(date.getUTCMonth()+1)+'/'+date.getUTCFullYear()+' update';
    ar.push(<DailyWeatherDataComponent data={props.data.slice(j,j+8)} key={i} id={id} date={dateString}/>)
    j+=8;
  }
  const date=new Date(props.data[j].dt*1000);
  const dateString=date.getUTCDate()+'/'+(date.getUTCMonth()+1)+'/'+date.getUTCFullYear()+' update';
  ar.push(<DailyWeatherDataComponent data={props.data.slice(j)} key={i} id={id+i} date={dateString}/>);
  // console.log(ar);
  return (
        <>
          <div className="accordion m-5" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Daily weather update
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                {ar}
                </div>
              </div>
            </div>
            </div>
        </>
  )
}

export default DayComponent

