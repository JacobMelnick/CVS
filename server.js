const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()

const PORT = 5500
// app.use(express.static(path.join(__dirname + './client')))
// app.use(express.static('client'))

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
var jsonParser = bodyParser.json()

// app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('hello')
    res.render('form')
    
})


app.post('/', jsonParser, (req, res) => {
    console.log('hello')
    console.log(JSON.stringify(req.body))
    // res.write(jsonParser(req.body))
    res.end(JSON.stringify(req.body, null, 2))
}) 

app.listen(PORT, () => {
    console.log(`app is listening on http://localhost:${PORT}`)
})