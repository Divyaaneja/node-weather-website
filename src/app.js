const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')




const app = express()
//define path for express config
const htmlpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//setup static directory to serve
app.use(express.static(htmlpath))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.get('', (req,res)=>{
    res.render('index',{
        text:'Weather',
        title:'Use this site to get your Weather',
        txt2: 'Enter your location here',
        bodyText:'Created By Divya'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        text: 'About page!',
        title:'This website has been designed to provide secure and Real-time info',
        bodyText:'Created by Divya'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        text:'Help page!',
        text2:'This page is currently unavailable',
        bodyText:'Created by Divya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Enter the address in query'
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location } = {} )=>{
        if( error ){
            return res.send({
                error:error
            })
        }
    
        forecast( latitude, longitude, (error,forecastdata)=>{
        if( error ){
            return res.send({
                error:error
            })
         }
            res.send({
                location:location,
                // des:forecastdata.des,
                // temp:forecastdata.temp,
                // feelslike:forecastdata.feelslike
                description:forecastdata.des,
                forecast:'It is currently '+forecastdata.temp+' degrees out but feels like '+forecastdata.feelslike + ' .Weather observation time is ' +forecastdata.time
            })
        })

    })

})



app.get('/help/*', (req,res)=>{
    res.render('404',{
        text:'you can go through these links for any content',
        msg:'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg:'My 404 page',
        bodyText:'go through these links'
    })
})



app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})


// app.get('/products', (req,res)=>{
//     if( !req.query.search){
//         return res.send({
//             error:'provide search query'
//         })
//     }
    
    
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })


// console.log(path.join(__dirname,'../public'))
// //app.com
// //app.com/help
// //app.com/about



// app.get('', (req,res)=>{
//     res.send("<h1>Hello Express!</h1>")

// })

// app.get('/help', ( req,res)=>{
//     res.send([{
//         name: 'Divya',
//         age: 19
//     }, {
//         name: 'Vanya',
//         age: 4
//     }])
// })

// app.get('/about', (req,res)=>{
//     res.send('<h1 style="color:blue;"> About page! </h1>')
// })

