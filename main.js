const show = document.querySelector('.shower')
const input = document.querySelector('.input')
const btn = document.querySelector('.img')
const locat = document.querySelector(".loca")
const locatText = document.querySelector('.location')
const wS = document.querySelector('.windSpeed')
const div = document.querySelector('.container')

let cityName;
let lat;
let long;
let officalCity;

locat.innerHTML = "Battambang"

async function demo(){
    const url = "https://api.open-meteo.com/v1/forecast?latitude=13.1027&longitude=103.1982&current=temperature_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m&timezone=auto"
    const response = await fetch(url) 
    try{
        if(!response.ok){throw new Error('another error lol')}
        const result = await response.json()
        console.log(result)
        console.log(result.current.temperature_2m)
        show.innerHTML = `${result.current.temperature_2m}
                          ${result.current_units.temperature_2m}`
        wS.innerHTML = `The windspeed is ${result.current.wind_speed_10m}
                                        ${result.current_units.wind_speed_10m}`
    }
    catch(error){
        console.error("error lol")
    }
}

demo()

async function search() {
     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`
     const searchRep = await fetch(url)
     try{
         if (!searchRep.ok) {throw new Error(console.log("ERROR!"))}
         const final = await searchRep.json()
         console.log(final)
         lat = final.results[0].latitude;
         long = final.results[0].longitude
         officalCity = final.results[0].name
        }
        
     
     catch(error){
         console.error(error)
     }
} 

async function weatherApp() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
    const response = await fetch(url)
    try{
        if (!response.ok) {throw new Error(console.log("Error"))}
        const data = await response.json()
        console.log(`Weather is: ${data.current_weather.temperature}`)
        console.log(data)
        show.innerHTML = `${data.current_weather.temperature}
                          ${data.current_weather_units.temperature}`
        locat.src = "public/location.svg"
        locatText.innerHTML = `${officalCity}`
        wS.innerHTML = `The windspeed is ${data.current_weather.windspeed}
                        ${data.current_weather_units.windspeed}`
    }

    catch(error){
        console.error("error"); 
    }

} 

    
btn.addEventListener('click', async ()=>{
    
    cityName = input.value;
    await search()    
    await weatherApp()
    input.value = "";
    
})







    
