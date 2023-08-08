let express = require('express');
let app = express();
let bodyParser = require('body-parser')
console.log("Hello world")

app.use(bodyParser.urlencoded({ extended: false }))

//  static files
path = __dirname + '/public'
app.use('/public', express.static(path));

//  Logger
app.use((req, res, next) => {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);

  //  next function
  next();
})

//  sendFile
app.get('/', (req, res) => {
  path = __dirname + '/views/index.html';
  res.sendFile(path);
})

//  .env variables
app.get('/json', (req, res) => {
  const response = 'Hello json';
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ "message": response.toUpperCase() });
  } else {
    res.json({ "message": response });
  }
})

//  Chained middleware
app.get('/now', (req, res, next) => {
  //chained middleware
  req.time = new Date().toString();
  next();
}, (req, res) => {
  //route handler
  res.json({ time: req.time })
})

//  Route Parameter (Route Param)
app.get('/:word/echo', (req, res) => {
  const { word } = req.params
  res.send({ "echo": word })
})

//  Query Params
app
  .route('/name')
  .get((req, res) => {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` })
  })
  .post((req, res) => {
    const { first, last } = req.body;
    console.log(first, last);
    res.json({ name: `${first} ${last}` })
  })



































module.exports = app;
