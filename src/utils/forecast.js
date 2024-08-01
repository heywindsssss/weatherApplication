const request=require('postman-request')


const forecast=(latitude,longitude,callback)=>{
    const url='https://api.weatherapi.com/v1/current.json?key=b648478ff2bd4921ae245537242607&q=' + latitude + ','+ longitude
    request ({url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to weather services',undefined)
        }
        else if (body.error) {
            callback('unable to find location. Try another search',undefined)
        }
        else{
             callback(undefined,body.current.condition.text+' It is currently '+body.current.temp_c+' degree celsius, But it feels like '+body.current.feelslike_c+' degree celsius ')
            }
    })
}

module.exports=forecast