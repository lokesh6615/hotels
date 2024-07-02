const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const ownerRoutes = require("./routes/ownerRoutes");
const userRoutes = require("./routes/userRoutes");
const waiterRoutes = require("./routes/waiterRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/owners", ownerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/waiters", waiterRoutes);
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
