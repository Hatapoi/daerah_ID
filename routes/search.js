// routes/search.js
const express = require("express");
const fs = require("fs");
const router = express.Router();

let wilayahList = [];

try {
  wilayahList = JSON.parse(fs.readFileSync("./data/wilayahCache.json"));
} catch (err) {
  console.error("Gagal baca cache wilayah:", err.message);
}

// GET /search?q=jakar
router.get("/", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  if (!query) return res.json([]);

  const results = wilayahList
    .filter(item => item.full.toLowerCase().includes(query))
    .slice(0, 10)

  res.json(results.map(r => r.full));
});

module.exports = router;
