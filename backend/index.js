const express = require("express");
// const http = require("http");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
const mongoDb = require("./db");

// cors enabling access
// var corsOptions = {
//   origin: "https://react-food-delivery-app.netlify.app/",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://react-food-delivery-app.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.options("*", cors(corsOptions));
app.use(express.json());

mongoDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
