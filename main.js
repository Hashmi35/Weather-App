const show = document.querySelector('.shower')
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
let cityName;
let lat;
let long;



async function search() {
     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`
     const searchRep = await fetch(url)
     try{
         if (!searchRep.ok) {throw new Error(console.log("ERROR!"))}
         const final = await searchRep.json()
         console.log(final)
         lat = final.results[0].latitude;
         long = final.results[0].longitude
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
        show.innerHTML = `The temperature in ${cityName} is ${data.current_weather.temperature} Celcius`
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







    
