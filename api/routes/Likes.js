const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  //перевіряємо , може вже ставили like
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  //ставимо like
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ Liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ Liked: false });
  }
});

module.exports = router;
