// app.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { buildWilayahData } = require("./services/fetchWilayah");
const searchRoutes = require("./routes/search");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

if (!fs.existsSync("./data/wilayahCache.json")) {
    console.error("❌ Cache not found! Please fetch and save cache first.");
    process.exit(1);
  }
  
  console.log("✅ Using cached wilayah data.");
  

app.use("/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
