const request = require("request")

const forecast = (longitude , latitude , callback) => {

    const url = "http://api.weatherapi.com/v1/current.json?key=f54949e0abfa4eb28c441755241803&q=" + longitude + "," + latitude

    request( {url , json:true} , (error,response) =>{
        if(error){
            callback("error API" , undefined)
        }else if(response.body.error){
            callback(response.body.error.message , undefined)
        }else{
            callback(undefined , {
                forecast : response.body.current.condition.text,
                country : response.body.location.country,
                longitude : longitude,
                latitude : latitude
            })
        }
    })

}

module.exports = forecast