const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Користовача створено");
  });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "Вам відмовлено у вході в сістему !!!" });
  // console.log("password: ", user.password);
  bcrypt.compare(password, user.password).then((match) => {
    // console.log("match= ", match);
    if (!match)
      return res.json({ error: "Неправильно введені пароль чи ім'я" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "sekretKay"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/token", validateToken, (req, res) => {
  res.json(req.user);
});
router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const profile = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(profile);
});

module.exports = router;
