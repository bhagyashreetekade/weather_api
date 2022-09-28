const API_KEY= `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form") //queryselector returns the first element that matches a CSS selector.
const weather = document.querySelector("#weather")
const search = document.querySelector("#search")

//Location
navigator.geolocation.getCurrentPosition(function(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat,lon);
    return getWeatherByLocation(lat,lon);
});

//getWeather function take the name of the city 
//We are fetching the URL thats why we use async (asynchronous)
const getWeather = async (city) =>{
    weather.innerHTML= `<h4 class="text-3xl text-white">Loading.......</h4>` //When api is slow loading is displayed
    const url =  ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response =await fetch(url);  //here we are fetching url it should be asyncronize
    console.log(response);
    const data = await response.json();  //response.json take the json data
    return showWeather(data);
}


//get weather when location is on
const getWeatherByLocation = async(lat,lon) =>{
    weather.innerHTML= `<h4 class="text-3xl text-white">Loading.......</h4>` //When api is slow loading is displayed
    const url =  ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response =await fetch(url);  //here we are fetching url it should be asyncronize
    console.log(response);
    const data = await response.json();  //response.json take the json data
    return showWeather(data);
}


//Show weather 
const showWeather = (data) =>{
    console.log(data);
    //When data entered is not correct
    if(data.cod == "404"){
        weather.innerHTML= `<h4 class="text-3xl text-white">City Not Found.......</h4>`
        return;
    }
    weather.innerHTML= `
    
    <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    </div>
    <div class="text-white space-y-2 font-bold ">
        <h1 class="text-4xl">${data.name}</h1>
        <h1 class="text-3xl">${data.main.temp} &#176;C</h1>
        <h4 class="text-2xl"> ${data.weather[0].main}</h4>
    </div>`
}

//Submitting the form
form.addEventListener(
    "submit",function(event){
        getWeather(search.value);         //get the city name that is entered (search) by the user
        event.preventDefault();          //form have default nature to reload the page when gets submitted..but using preventDefault stops the reload of the page

});






// const API=` https://api.openweathermap.org/data/2.5/weather?
// q=${city}&appid=${API_KEY}&units=metric` 

// const IMG_URL=` https://api.openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`