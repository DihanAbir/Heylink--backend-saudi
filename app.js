const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// thard party middleWare
app.use(cors());
app.use(express.json());

//----------------- route ----------------- //

// links routes
const linksRoute = require("./Routes/Links/LinksRoute");
const socialRoute = require("./Routes/Links/SocialRoute");
const locationsRoute = require("./Routes/Links/LocationsRoute");

const viewRoute = require("./Routes/viewRoute");
const userRoute = require("./Routes/UserInformation.route");
const proRoute = require("./Routes/pro.route");
const messageRoute = require("./Routes/message.route");
const messages = require("./Routes/messagesRoute");
const signupRoute = require("./Routes/signup.route");

// links routes
app.use("/app/v2/links", linksRoute);
app.use("/app/v2/social", socialRoute);
app.use("/app/v2/locations", locationsRoute);


app.use("/", viewRoute);
app.use("/app/v2/user", userRoute);
app.use("/app/v2/pro", proRoute);
app.use("/app/v2/message", messageRoute);
app.use("/app/v2/all-messages", messages);
app.use("/app/v2/signup", signupRoute);

//----------------- route ----------------- //

app.get("/", (req, res) => {
    res.send("Showmoreinfo surver is connected!!");
});

module.exports = app;
