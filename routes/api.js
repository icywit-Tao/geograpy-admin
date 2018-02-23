const Geograpy = require('../controller/geograpy');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/getCategory', Geograpy.getCategory);
router.post('/addSession',Geograpy.addSession);
router.post('/delSession',Geograpy.delSession);

module.exports = router;
