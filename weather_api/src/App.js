import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import{ getDay} from 'date-fns';
function App() {
  const [city, setCity ] = useState('Bucharest');
  const url = `http://api.weatherapi.com/v1/forecast.json?key=f9b881770acc4918a2f75944230607&q=${city}&days=7&aqi=no&alerts=no
  `
  const [tday, setTday] = useState(false);
  const weekdays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const [data, setData] = useState({})
  const [showDate, setShowDate] = useState('');
  const [date, setDate] = useState(new Date())
  const [error, setError] = useState(false);
  const [items, setItems] = useState([
{
  id: 0,
  checked: false,
  item: 'Sun'
},
{
  id: 1,
  checked: false,
  item: 'Mon'
},
{
  id: 2,
  checked: false,
  item: 'Tue'
},
{
  id: 3,
  checked: false,
  item: 'Wed'
},
{
  id: 4,
  checked: false,
  item: 'Thu'
},
{
  id: 5,
  checked: false,
  item: 'Fri'
},
{
  id: 6,
  checked: false,
  item: 'Sat'
}

  ]);
 function daytext(day) {

    switch(day){
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
    }
  }
localStorage.setItem('days', items)
  useEffect(() => {
    console.log(items.map((item) => item.checked ))
    
  },[items])
  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('days', JSON.stringify(newItems));
  }

  useEffect(() => {

    try{
      axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data)
        console.log(url)
        
      
      console.log("listitems")
      })
    }
    catch(err) {
      console.log(err)
    }

  },[])
  const searchLocation = async (url) => {
  
    axios.get(url).then((response) => {
    setData(response.data);
    console.log(response.data)
      console.log(url)
    }).catch(function (error) {
      searchLocation( `http://api.weatherapi.com/v1/forecast.json?key=f9b881770acc4918a2f75944230607&q=Bucharest&days=7&aqi=no&alerts=no
      `)
      setError(true) 

      
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
     
    });  

  }
  const handleSearch = async () => {
   try{
    const urlCity =`http://api.weatherapi.com/v1/forecast.json?key=f9b881770acc4918a2f75944230607&q=${city}&days=7&aqi=no&alerts=no
    `
    await searchLocation(urlCity)
   }
   catch(e)  {
    alert('No such city')
   }
  }
  function mititeiPercent(w) {
    if(w*3 > 100) return 100
    return w*3
  }
  const handleToggleDay = (date) => {
    setTday(tday => !tday)
    if(tday)setShowDate(date);
    if(!tday) setShowDate('');
   
  }

  const handleCheck = (id)  => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems)
  }
  
  return ( 
   <div id ="background">
    {error && 
    <div>
      
    <h1> Error </h1>
      <button onClick={setError(false)}>Try again</button>
      </div>
    }
 {data.location && <div>
    <div className="day">
   <p className="cityName"> {data.location.name}</p>
    {showDate &&
     <div className="dayDet"> 
      {weekdays[getDay(new Date(showDate.date))]} 
       <p id="astro" >Sunrise at {showDate.astro.sunrise} 
       </p>
       <p id="astro" >Sunset at {showDate.astro.sunset} 
       </p>
       <p id="astro" >Monrise at {showDate.astro.moonrise} 
       </p>
       <p id ="astro">Max Temp {showDate.day.maxtemp_c}°C    &ensp; {showDate.day.maxtemp_f}°F</p>
       <button id="citySearch" className="hidBut" onClick={() => handleToggleDay(showDate)} >back</button>
       </div>
    }
    {!showDate&& 
      <ul>
      Day
      <div id="wrapper"><br />
        <div className="herculanWrap">
        <p id="herculan">Herculean-Proportions-Mititei-Success</p>
        
       <p id="herculan">Average temp</p>
       </div>
        {data.forecast.forecastday.map((day, i) => 
        <li id="forecastday" key={i}>
         
          <div >
            <p id="dayy" onClick={() => handleToggleDay(day)}>{weekdays[getDay(new Date(day.date))]} </p>
            <input 
            type="checkbox"
            checked={items[getDay(new Date(day.date))].checked}
            onChange={() => handleCheck(getDay(new Date(day.date)))}
            />
            <p id="mititei" >
            {Number((mititeiPercent(day.day.avgtemp_c)).toFixed(1))}%

            </p>
           <div id="temp">
            {" " + day.day.avgtemp_c}  °C 
            </div>
          </div>

        </li>
        )}
        </div>
      </ul>
 }

    </div>

     <div id="search">
   
    <label htmlFor="citySearch" >Search City</label>
    <input 
    id="citySearch"
    type="text"
    placeholder={city}
    onChange={(e) => setCity(e.target.value)}
    />
     <button onClick={handleSearch} className="searchButton">search</button>
     </div>
     </div>
}

      <ul id ="downsec">
          
      {items.map((item,i) =>
      item.checked &&
      <li id="selecteddays" key={i}>
        {daytext(item.id)}
      </li>
      )}

      </ul>
   </div>
  );
}

export default App;
