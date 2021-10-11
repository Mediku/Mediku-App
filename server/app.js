if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
// const router = require('./routes')
const app = express()
// const PORT = process.env.PORT || 9000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(router)

// app.listen(PORT, () => {
//     console.log('GASKEUNN!!!');
// })

module.exports = app