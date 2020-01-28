const router = require('express').Router();
const bc = require("bcryptjs");

// const Users = require('./user-model.js');

router.get("/", (req, res, next) => {
    if (req.headers.authorization) {
        bc.hash(req.headers.authorization, 8, (err, hash) => {
            
            if (err) {
                res.status(500).json({ oops: "it broke" });
            } else {
                res.status(200).json({ hash });
            }
        });
    } else {
        res.status(400).json({ error: "You shall not pass!" });
    }
});

module.exports = router;
