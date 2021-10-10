if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const routers = require('./routers')
const app = express()
// const PORT = process.env.PORT || 9000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)

// app.listen(PORT, () => {
//     console.log('GASKEUNN!!!');
// })

module.exports = app