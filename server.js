const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MONGODB_URI = "mongodb://localhost:27017/hashAppDb";

mongoose.connect(MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB @ 27017");
});
const user = require("./route/user");
console.log(user);
app.use("/api/user", user);
app.use(bodyParser.json());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
