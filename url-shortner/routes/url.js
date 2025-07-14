const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url');
const { Log } = require('../../loggingMiddleware/logger');

const router = express.Router();

router.post('/',async (req, res) => {
  await Log("backend", "debug", "route", "POST /url called");
  await handleGenerateNewShortURL(req, res);
});

router.get('/analytics/:shortId', async (req, res) => {
  await Log("backend", "debug", "route", `GET /url/${req.params.shortId}/analytics called`);
  await handleGetAnalytics(req, res);
});

module.exports = router;