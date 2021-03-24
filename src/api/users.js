var express = require('express');
var router = express.Router();
let user = require('../services/users');


/* POST per registrar usuaris */
router.post('/:username/create', user.regUsuari);
/* GET per obtenir info d'usuaris */

router.get('/:username/show', user.showUsuari);


module.exports = router;
