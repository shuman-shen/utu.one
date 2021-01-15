const express = require("express");
const cors = require("cors");
const routes = require("./routes/priceRoute");
const app = express();

app.use(cors());

require("./startup/db")(); // connect to mongodb

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
