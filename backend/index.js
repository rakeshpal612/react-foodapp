const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const mongoDb = require("./db");

// cors enabling access

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://react-food-delivery-app.netlify.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(express.json());

mongoDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
