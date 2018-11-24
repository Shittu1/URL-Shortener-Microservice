const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    path = require('path'),
    dotenv = require('dotenv');
var shortUrl = require('./models/shorturl');

const app = express();

dotenv.config();

const mongoDB = process.env.MONGODB_URL;
//Connect to database
mongoose.connect(mongoDB, { useNewUrlParser: true });

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
    if (!input_value) {
        res.json({ error: 'enter a URL' });
    } else if (reg.test(input_value)) {
        let short = Math.floor(Math.random() * 100000).toString();

        let data = new shortUrl({
            originalUrl: input_value,
            shorterUrl: short
        });

        data.save(err => {
            if (err) {
                return res.json('Error Saving to Database');
            }
        });

        res.json(data);

    } else {
        res.json({
            originalUrl: input_value,
            error: 'invalid URL'
        });
    }
});
//Creates the database entry
app.get('/api/shorturl/:newUrl', (req, res, next) => {
    let shorterUrl = req.params.newUrl;
    shortUrl.findOne({ 'shorterUrl': shorterUrl }, (err, data) => {
        if (err) return res.json('Error reading database');
        let reg = /(http(s?))\:\/\//gi;
        let fetchUrl = data.originalUrl;
        if (reg.test(fetchUrl)) {
            res.status(301).redirect(fetchUrl);
        } else {
            res.status(301).redirect('http://' + fetchUrl);
        }
    });
});
//Listen to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
