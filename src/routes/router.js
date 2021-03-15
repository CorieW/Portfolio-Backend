const router = require('express').Router()

router.use('/api/contact', require('./contact'))

module.exports = router