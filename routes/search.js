// routes/search.js
const express = require("express");
const fs = require("fs");
const Fuse = require("fuse.js");
const router = express.Router();

let wilayahList = [];

try {
  wilayahList = JSON.parse(fs.readFileSync("./data/wilayahCache.json"));
} catch (err) {
  console.error("Gagal baca cache wilayah:", err.message);
}

// Setup Fuse
const fuse = new Fuse(wilayahList, {
  keys: ["full"],      // hanya cari berdasarkan field 'full'
  threshold: 0.6,      // semakin rendah → semakin strict (default 0.6)
  distance: 100,       // max distance dalam string
  minMatchCharLength: 2
});

// GET /search?q=jakrta
router.get("/", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  if (!query) return res.json([]);

  const results = fuse.search(query).slice(0, 10);

  // hanya ambil field `full` dari hasil
  res.json(results.map(result => result.item.full));
});

module.exports = router;
