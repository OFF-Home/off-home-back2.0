var express = require('express');
var router = express.Router();
let upload = require('../services/uploads');

router.post('/userimage/:email',upload.uploadImageUser);

module.exports = router;