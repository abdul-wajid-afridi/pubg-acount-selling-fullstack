const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const port = 5000;
// middlewares

app.use(cors());
// app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("", express.static("upload/images"));

app.use("/pubg/", require("./Routes/IdDetailsRoute"));
app.use("/pubg/", require("./Routes/CommentRoutes"));
app.use("/pubg/", require("./Routes/UserRoutes"));
app.use("/pubg/", require("./Routes/LikesHeartsRoute"));

// admin dashboard
app.use("/pubg/dashboard/", require("./Dashboard/Routes/IdDetailsRoute"));
app.use("/pubg/dashboard", require("./Dashboard/Routes/CommentRoutes"));
app.use("/pubg/dashboard", require("./Dashboard/Routes/UserRoutes"));

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`port runs on ${port}`));
});
