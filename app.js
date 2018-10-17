//Get requirements and set instances to them
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose')
      path = require('path')
      shortURL = require('./models/shorturl');

const app = express();

//Connect to database
//mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shortUrls')

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join((__dirname, 'public'))));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/api/shorturl/new', (req, res) => {
  let input_value = req.body.url;
  const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  if(!input_value) {
    res.send({error: "enter a URL"});
  }else if (reg.test(input_value)){
    res.send({longUrl: input_value});
    console.log(req.body);
  }else {
    res.send({err: 'invalid URL'});
  }
});
//Creates the database entry
app.get('/new/:urlToShorten(*)', (req, res, next) => {
  var { urlToShorten } = req.params;
});




//Listen to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
