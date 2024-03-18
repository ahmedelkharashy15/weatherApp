let form = document.getElementById("form1")
let address = document.getElementById("inp")

form.addEventListener("submit" , (e)=>{
    e.preventDefault()
    weatherFunc()
    form.reset()
})


let city = document.getElementById("city")
let country = document.getElementById("country")
let longitude = document.getElementById("longitude")
let latitude = document.getElementById("latitude")
let forecast = document.getElementById("forecast")
let error = document.getElementById("error")


let weatherFunc = async ()=>{
    try{
        const val = address.value
        const res = await fetch("http://localhost:3000/weather?address="+val)
        const data = await res.json()
        if(data.error){
            error.innerText = data.error
            city.innerText = ""
            country.innerText = ""
            longitude.innerText = ""
            latitude.innerText = ""
            forecast.innerText = ""
        }else{
            setTimeout(function(){
                    city.innerText = data.location
                    country.innerText = data.country
            }, 500)

            setTimeout(function(){
                longitude.innerText = data.longitude
                latitude.innerText = data.latitude
            }, 1000)

            setTimeout(function(){
                forecast.innerText = data.forecast
            },1500)

            error.innerText = ""
        }
    }catch(e){
        console.log(e)
    }
}