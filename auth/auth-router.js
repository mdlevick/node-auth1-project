const bc = require("bcryptjs");
const router = require("express").Router();

const Users = require("../user/user-model.js");

router.get("/user", (req, res, next) => {
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

router.post("/register", (req, res) => {
    let user = req.body;

    const hash = bc.hashSync(req.body.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bc.compareSync(password, user.password)) {
                res.status(200).json({ message: "Logged in" });
            } else {
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;