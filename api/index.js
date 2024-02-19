const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const companyRoute = require("./routes/companies");
const demandRoute = require("./routes/demands");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend is here");
});

app.use("/api", companyRoute);
app.use("/api", demandRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
