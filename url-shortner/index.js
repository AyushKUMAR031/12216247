const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const app = express();
const PORT = 8001;
const connectDB = require('./connect');
const { Log } = require('../loggingMiddleware/logger');


connectDB('mongodb://localhost:27017/url-shortner')

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls
    });
});

app.use('/url',urlRoute);

app.use('/', staticRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
            visitHistory: {
                timestamp: Date.now(),
                date: new Date(),
                userAgent: req.headers['user-agent'],
                ipAddress: req.ip,
            }
        },
    });

    if (!entry) {
        return res.status(404).send('shortner URL not found');
    }
      
    await Log("backend", "debug", "handler", `Redirecting shortId: ${shortId} to ${entry.redirectURL}`);
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    Log("backend", "debug", "route", `Server started on port ${PORT}`);
})