const request = require("request")

const express = require("express")
const app = express()

const port = process.env.PORT || 3000

const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

const forecast = require("./tools/forecast")
const geocode = require("./tools/geocode")

app.set('view engine' , 'hbs')

app.get("/weather" , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "you must provide an Address"
        })
    }
    geocode(req.query.address , (error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude , data.longitude , (error , dataForecast) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location : req.query.address,
                country : dataForecast.country,
                longitude : dataForecast.longitude,
                latitude : dataForecast.latitude,
                forecast : dataForecast.forecast
            })
        })
    })
})


// app.get("/" , (req,res)=>{
//     res.render('index' , {
//         title : "Weather App"
//     })
// })


app.listen(port , ()=>{
    console.log(`app is listening on port ${port}`)
})