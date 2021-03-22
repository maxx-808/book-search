const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
//mongoose connection
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost/googlebooks",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
  }
);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use("/api/search", require("./routes/searchRoutes"));
app.use("/api/db", require("./routes/dbRoutes"));

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server listening at http://localhost:${PORT}`);
});
