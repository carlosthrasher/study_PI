const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express()

//config json response
app.use(bodyParser.json());

//solve CORS
app.use(cors({credential: true, origin: 'http://localhost:3000'}))


//routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

const scheduleRoutes = require('./routes/ScheduleRoutes');
app.use('/schedule', scheduleRoutes);

app.listen(5000)
