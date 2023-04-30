const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// thard party middleWare
app.use(cors());
app.use(express.json());

// route
const viewRoute = require("./Routes/Links/viewRoute");
const linksRoute = require("./Routes/Links/Common.route");
const userRoute = require("./Routes/UserInformation.route");
const proRoute = require("./Routes/pro.route");
const messageRoute = require("./Routes/message.route");
const messages = require("./Routes/messagesRoute");
const signupRoute = require("./Routes/signup.route");

app.use("/", viewRoute);
app.use("/app/v1/links", linksRoute);
app.use("/app/v1/user", userRoute);
app.use("/app/v1/pro", proRoute);
app.use("/app/v1/message", messageRoute);
app.use("/app/v1/all-messages", messages);
app.use("/app/v1/signup", signupRoute);

app.get("/", (req, res) => {
  res.send("HeyLink surver is connected!!");
});

module.exports = app;
