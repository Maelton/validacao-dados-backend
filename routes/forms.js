var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('<h1>Cadastro realizado com sucesso!</h1>');
});

module.exports = router; 
