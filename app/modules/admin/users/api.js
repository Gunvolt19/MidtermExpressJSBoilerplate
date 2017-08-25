var router = require('express').Router();
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
        if (err) return res.status(504).send({ error: err });
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, results, fields) => {
        if (err) return res.status(504).send({ error: err });
        res.status(200).json(results);
    });
});

// register
router.post('/', (req, res) => {
    db.query('INSERT INTO users (`username`, `password`) VALUES (?, ?)', [req.body.username, req.body.password], (err, results, fields) => {
        if (err) return res.status(400).send({ error: err.toString() });
        res.status(200).send({ message: 'Successfully created new account!' });
    });
});

module.exports = router;