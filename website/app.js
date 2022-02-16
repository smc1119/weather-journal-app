/* Global Variables */

const genBtn = document.querySelector('#generate');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API

const apiKey = '&units=imperial&appid=f5d8b82cc955cedecf9a4674f13f79d9';

// Event listener to add function to existing HTML DOM element

genBtn.addEventListener('click', respondToClick);

/* Function called by event listener */

function respondToClick(event) {

    let zipInp = document.querySelector('#zip');
    let zip = zipInp.value;
    
    let feelings = document.querySelector('#feelings');
    let content = feelings.value;

    getWebAPI(baseURL + zip + apiKey)

    .then(function(data) {

        postData('http://localhost:3000/postWeather', {temp:data.main.temp, date:newDate, feelings:content});

    })

    .then(function () {

        updateUI('http://localhost:3000/getWeather')

    })
}
    
/* Function to GET Web API Data*/

const getWebAPI = async (url='') => {

    const request = await fetch(url);

    try {
    const data = await request.json();

    console.log(data);

    return data;

    }   catch(error) {
        console.log('error ', error);
    };
 
};

/* Function to POST data */

const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

/* Update UI */

const updateUI = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()

    let date = document.querySelector('#date');
    date.innerHTML = '<p>' + allData.date + '</p>';

    let tempDiv = document.querySelector('#temp');
    tempDiv.innerHTML = '<p>' + Math.round(allData.temp) + ' degrees' + '</p>';

    let contDiv = document.querySelector('#content');
    contDiv.innerHTML = '<p>' + allData.feelings + '</p>';
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}
