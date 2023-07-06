import React from 'react'
import {getDay} from 'date-fns'
const Day = (showDate, weekdays) => {
    console.log(showDate)
  return (
    <section>
 <div> 
      {weekdays[getDay(new Date(showDate.date))]} 
    
       </div>

    </section>
    )
}

export default Day