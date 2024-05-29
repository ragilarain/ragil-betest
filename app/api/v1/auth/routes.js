const express = require('express');
const router = express();
const { signin } = require('./controller');

router.post('/auth/signin', signin);

module.exports = router;