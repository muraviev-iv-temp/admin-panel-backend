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

const removeIds = (source, ids) => {
  return source.filter(element => !ids.find(id => id == element.id))
}

app.post('/', bodyParser.json(), (req, res) => {
  const { body } = req;
    if(body.do) {
      body.do.forEach(element => {
        data[element.name] && element.delete && (
          data[element.name] = removeIds(data[element.name], element.delete)
        )
        console.log(element)
      });
    }
    const response = {};
    if(body.get) {
      body.get.forEach(query => {
        switch (typeof query) {
          case 'string':
            response[query] = data[query];
            break;
          case 'object':
            if (query.name === 'orders') {
              const scope = data[query.name];
              const targetPagesCount = scope.length > 0 && query.pageNum 
                && Math.ceil(scope.length / query.pageCapacity) 
              response[query.name] = {
                orders: scope.slice(start = (query.pageNum - 1) * query.pageCapacity, start + query.pageCapacity),
                pageNum: query.pageNum,
                pagesCount: targetPagesCount > 0 && targetPagesCount
              }
            }
            break;
          default: 
            throw new Exception('unexpected query type')
        }
      })
    }
    res.send(JSON.stringify(response))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

