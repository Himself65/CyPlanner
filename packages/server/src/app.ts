import express from 'express'
import * as console from 'console'

const app = express()

app.get('/', (req, res) => {
  res.json('hello, world')
})

const port = +(process.env.PORT || 8000)
const host = process.env.HOST || '127.0.0.1'

app.listen(port, host, () => {
  console.log(`listen to http://${host}:${port}`)
})
