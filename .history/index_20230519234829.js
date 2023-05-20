const express = require('express')
const cors = require('cors')

const app = express()

//config json response
app.use(express.json())

//solve CORS
app.use(cors({credential: true, origin: 'http://localhost:300'}))

//public folder for images
app.use(express.static('public'))

//routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)
app.listen(5000)