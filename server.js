const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orgRoutes = require("./routes/org.routes");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/organizations", orgRoutes);


const startServer = async () => {
  try {
    await connectDB(); // wait for DB before starting server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on PORT:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

startServer();
