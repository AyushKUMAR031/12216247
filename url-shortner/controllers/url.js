const shortid = require('shortid');
const URL = require('../models/url');
const { Log } = require('../../loggingMiddleware/logger');


async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    
    if(!body.url){
        await Log("backend", "fatal", "controller", "URL not provided in request body");

        return res.status(400).json({
            error: 'URL is required'}
        );
    }
    
    const shortId = shortid(); //generating a short unique id
    
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render('home',{
        id: shortId,
    })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
        await Log("backend", "fatal", "controller", `Analytics requested for invalid shortId: ${shortId}`);
        return res.status(404).json({ error: "Short URL not found" });
    }

    await Log("backend", "debug", "controller", `Analytics fetched for shortId: ${shortId}`);
    
    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}