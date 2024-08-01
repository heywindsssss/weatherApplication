const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('postman-request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()


//Define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to  serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Windhya Srivastava'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Windhya Srivastava'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is a help page',
        title:'Help',
        name:'Windhya Srivastava'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:"you must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData={})=>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })


    
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'help article not found',
        name:'Windhya Srivastava'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'page not found',
        name:'Windhya Srivastava'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})