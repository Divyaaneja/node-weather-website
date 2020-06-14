
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
const request = require('request')



const formdata=document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')


formdata.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    messagethree.textContent = ''

    
    fetch('/weather?address='+encodeURIComponent(location) ).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.textContent = 'Invalid location'
                //console.log('')
            }else{
                messageone.textContent = data.location,
                messagetwo.textContent = data.description,
                messagethree.textContent = data.forecast

                // console.log(data.location)
                // console.log(data.description)
                // console.log(data.forecast)
            }
        })
    })



    //console.log(location)
})