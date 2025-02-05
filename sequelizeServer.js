const express = require("express");
const userRoutes = require("./routes/user.routes");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

// Sync Sequelize and start server
sequelize.sync().then(() => {
  console.log("Database connected & synced!");
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
