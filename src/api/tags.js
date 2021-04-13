var express = require('express');
var router = express.Router();
let tags = require('../services/tags');

router.get('/:username/show',tags.showTags);

router.post('/:username/insert',tags.insert_tags);

router.post('/:username/delete',tags.delete_tags);

module.exports = router;