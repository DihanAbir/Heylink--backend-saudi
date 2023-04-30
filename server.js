const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
mongoose.connect('mongodb+srv://heylink:762485@cluster0.xwegazm.mongodb.net/heylink?retryWrites=true&w=majority').then(() => {
    console.log(`HeyLink surver is connected!!`.green.bold);
});

// server port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`.red.bold);
});
