const {data} =require('./data')
const express = require('express')
const cors = require('cors')
const { expressCspHeader, SELF } = require('express-csp-header')
const app = express()
const port = 3001

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'localhost', 'localhost:3000', 'localhost:3001'],
      'connect-src': [SELF, 'localhost', 'localhost:3000', 'localhost:3001']
    }
  })
)

var bodyParser = require('body-parser')

app.get('/', (req, res) => {
    res.send(JSON.stringify(data))
})

app.post('/', bodyParser.json(), (req, res) => {
  const { body } = req;
    if(body.do) {
      body.do.forEach(element => {
        console.log(element)
      });
    }
    const response = {};
    if(body.get) {
      body.get.forEach(query => {
        console.log('data', query,data[query])
        response[query] = data[query]
      })
    }
    res.send(JSON.stringify(response))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

