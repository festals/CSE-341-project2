const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello World!")
});

router.use('/members', require('./members'));

router.use('/users', require('./users'));

module.exports = router;