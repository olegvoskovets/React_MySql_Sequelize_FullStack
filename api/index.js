const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
const usersRourer = require("./routes/User");
const likesRourer = require("./routes/Likes");

app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRourer);
app.use("/like", likesRourer);

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});
//{ alter: true }
