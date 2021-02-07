const express = require('express')
const cors = require('cors')

var bodyParser = require('body-parser')

const app = express()
const port = 5000

app.use(cors())


const homeRoutes = require('./routes/homeRoutes');


app.use(bodyParser.json())

app.use('/', homeRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})