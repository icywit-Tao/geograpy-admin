const Geograpy = require('../controller/geograpy');
var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


/* GET home page. */
router.post('/getCategory', Geograpy.getCategory);
router.post('/addSession',Geograpy.addSession);
router.post('/delSession',Geograpy.delSession);
router.post('/addResource',multipartyMiddleware,Geograpy.addResource);

module.exports = router;
