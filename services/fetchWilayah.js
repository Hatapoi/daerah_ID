// services/fetchWilayah.js
const axios = require("axios");

const API_KEY = "e231f9043153e8c84c339404336148fa2b68918a27e9c563530de1ba8ad1d7a";
const BASE_URL = "https://api.binderbyte.com/wilayah";

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // optional for rate limit

async function fetchWilayah(endpoint, params = {}) {
  const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&${new URLSearchParams(params).toString()}`;
  const response = await axios.get(url);
  return response.data.value;
}

async function buildWilayahData() {
  const finalList = [];

  const provinsiList = await fetchWilayah("provinsi");

  for (const provinsi of provinsiList) {
    const kabupatenList = await fetchWilayah("kabupaten", { id_provinsi: provinsi.id });

    for (const kabupaten of kabupatenList) {
      const kecamatanList = await fetchWilayah("kecamatan", { id_kabupaten: kabupaten.id });

      for (const kecamatan of kecamatanList) {
        const kelurahanList = await fetchWilayah("kelurahan", { id_kecamatan: kecamatan.id });

        for (const kelurahan of kelurahanList) {
          finalList.push({
            provinsi: provinsi.name,
            kabupaten: kabupaten.name,
            kecamatan: kecamatan.name,
            kelurahan: kelurahan.name,
            full: `${provinsi.name}, ${kabupaten.name}, ${kecamatan.name}, ${kelurahan.name}`,
          });
        }
      }
    }
  }

  return finalList;
}

module.exports = { buildWilayahData };
