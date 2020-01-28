const bc = require("bcryptjs");
const router = require("express").Router();

const Users = require("../user/user-model.js");



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
                req.session.user = user;
                res.status(200).json({ message: "Logged in" });
            } else {
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get("/logout", (req, res, next) => {
    if (req.session) {
      req.session.destroy(err => {
          if (err) {
              res.json({message: "You can never leave!"})
          } else {
              res.status(200).json({ message: "BEGONE!!!"})
          }
      })
    } else {
        res.status(200).json({ message: "gotta login first!!!"})
    }
});

module.exports = router;