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

// Fetch and cache wilayah on startup
// (async () => {
//   if (!fs.existsSync("./data")) fs.mkdirSync("./data");

//   console.log("Fetching and caching wilayah data...");
//   const wilayah = await buildWilayahData();
//   fs.writeFileSync("./data/wilayahCache.json", JSON.stringify(wilayah, null, 2));
//   console.log("Wilayah data cached.");
// })();

if (!fs.existsSync("./data/wilayahCache.json")) {
    console.error("❌ Cache not found! Please fetch and save cache first.");
    process.exit(1);
  }
  
  console.log("✅ Using cached wilayah data.");
  

app.use("/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
