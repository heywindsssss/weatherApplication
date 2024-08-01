const request=require('postman-request')


const geocode=(address,callback)=>{
    const url='https://api.geoapify.com/v1/geocode/search?text='+encodeURIComponent(address)+'&apiKey=ab663a5122b5486eb55e1ef5e9cd28e3&limit=1'
    request({ url,json:true},(error,{body}={})=>{
       if(error){
           callback('unable to connect to location services',undefined)
       }
       else if (body.features.length===0) {
           callback('unable to find location. Try another search',undefined)
       }
       else {
           callback(undefined,{
               longitude:body.features[0].properties.lon,
               latitude:body.features[0].properties.lat,
               location:body.features[0].properties.formatted
           })
        }
    })
}


module.exports=geocode