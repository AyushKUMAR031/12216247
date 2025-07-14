const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    //rendering tthe home page
    res.render('home');
});
module.exports = router;